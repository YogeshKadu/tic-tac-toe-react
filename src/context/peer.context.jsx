import { isEmpty } from "lodash";
import Peer from "peerjs";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


const messageType = {
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  CHOICE: "CHOICE",
  RETRY: "RETRY",
}
const tileObject = {
  id: null,
  peerId: null, // peerID
  label: null,  // X | O
  disabled: false,
  selected: false,
}

const prefillTile = new Array(9).fill(0).map((_, index) => ({ ...tileObject, id: index + 1 }))

const defaultGameObject = {
  x: '',          //peerid
  o: '',          //peerid
  tiles: [...prefillTile],
  isGameOver: false,
  winnerID: null,
  winningCombo: [],
  turn: 'x',
  choiceObject: null, //{choice:'X|O',peerID, tileId},
  messageType: null
}

const invertTurns = { 'x': 'o', 'o': 'x' };

const PeerContext = createContext();
export const PeerProvider = ({ children }) => {
  //#region variables
  const navigate = useNavigate();

  const [peer, setPeer] = useState(null);
  const [connection, setConnection] = useState(null);
  const [connectionID, setConnectionID] = useState("");
  const [connectionRequest, setConnectionRequest] = useState(null);
  const [connectionRequestID, setConnectionRequestID] = useState(null);
  const connectionRequestRef = useRef(null);

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWaiting, setWaiting] = useState(false);

  const [tiles, setTiles] = useState([...prefillTile]);
  const [gameObject, setGameObject] = useState({ ...JSON.parse(JSON.stringify(defaultGameObject)) });

  //#endregion
  //#region PRIVATE
  useEffect(() => {
    if (isEmpty(username)) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [username]);

  const HandleError = (error, fallbackMessage) => {
    toast.error(error?.message ?? fallbackMessage);
  };
  const HandleConnection = (_connection) => {
    _connection
      .on("open", () => {
        console.log("Connection open");
        if (connection) {
          // TODO: Reject New connection
        }
        console.log("HandleConnection - ", _connection);
        setConnectionRequestID(_connection.peer);
        setConnectionRequest(_connection);
        connectionRequestRef.current = _connection;
      })
      .on("error", (error) => {
        console.log("error - ", error);

        throw new Error(error);
      })
      .on("close", () => {
        toast.success("Connection closed");
        if (connection && _connection.peer == connection.peer) {
          setConnection(null)
        } else if (connectionRequest && _connection.peer == connectionRequest.peer) {
          setConnectionRequest(null);
          connectionRequestRef.current = null;

        } else {
          connectionRequestRef.current = null;
          setConnectionRequest(null)
          setConnection(null)
        }
        navigate("/");
        ResetGame();
      })
      .on("data", HandleMessage);
    // setConnectionRequest(_connection);
  };

  const HandleMessage = (message) => {
    console.log("HandleMessage", message);

    switch (message?.messageType) {
      case messageType.ACCEPTED: {
        console.log("Request Accepted - ", connectionRequestRef);
        setConnection(connectionRequestRef.current)
        setConnectionRequest(null)
        setWaiting(false);
        navigate("/board");
        setGameObject(message);
        // TODO : User
      }
        break;

      case messageType.REJECTED: {
        connectionRequest?.close();
        setConnectionRequest(null)
        setWaiting(false);
      }
        break;

      // Any Other - CHOICE, RETRY
      default: {
        setGameObject(message);
      }
        break;
    }
  };
  //#endregion

  //#region PUBLIC
  const login = async (username) => {
    setLoading(true);
    const peer = new Peer(username, {
      host: "localhost",
      port: 9001,
      path: "/"
    });
    peer
      .on("open", (id) => {
        setUsername(id);
        setLoading(false);
        setPeer(peer);
      })
      .on("close", () => {
        toast.success("Peer connection closed!");
        setConnection(null);  //TODO: close corrct connection.
        setUsername("");
      })
      .on("connection", HandleConnection)
      .on("disconnected", (_) => {
        console.log("Peer Disconnected");
        toast.success("Peer connection disconnected!");
        setConnection(null);  //TODO: close corrct connection.
        setUsername("");
        setConnectionRequest(null);
        connectionRequestRef.current = null;
      })
      .on("error", (error) => {
        HandleError(error, "Facing error on peer connection !");
        connectionRequestRef.current = null;
        setConnectionRequest(null);
        setWaiting(false);
        setLoading(false);
      });
  };

  const logout = async () => {
    await peer.disconnect();
  };

  const AcceptRequest = () => {
    const imX = Math.random() < 0.5;
    // const imX = true;
    const message = {
      ...gameObject,
      messageType: messageType.ACCEPTED,
      x: imX ? username : connectionRequest?.peer,
      o: imX ? connectionRequest?.peer : username,
    }
    console.log("AcceptRequest - ", connectionRequest);

    connectionRequest?.send(message);
    setGameObject(message);
    setConnection(connectionRequestRef.current);
    setConnectionRequest(null)
    navigate("/board");
  }
  const RejectRequest = () => {
    const message = {
      messageType: messageType.REJECTED,
    };
    console.log(connectionRequest);
    connectionRequest?.send(message);
    setConnectionRequest(null)
  }

  const ResetGame = () => {
    const imX = Math.random() < 0.5;
    const newGameOject = {
      ...JSON.parse(JSON.stringify(defaultGameObject)), messageType: messageType.RETRY,
      x: imX ? username : connectionRequestRef.current?.peer,
      o: imX ? connectionRequestRef.current?.peer : username,
    };
    setGameObject(newGameOject);
    connection.send(newGameOject);

  }
  const Selection = (tileID) => {
    const myLabel = gameObject.x == username ? 'x' : 'o';
    const choice = {
      label: myLabel,
      peerId: username,
      disabled: false,
      id: tileID,
      selected: true
    }
    const updatedTiles = gameObject.tiles.map((item) => item.id == tileID ? ({ ...item, ...choice }) : item);

    const gameStatusObject = checkWinCondition(updatedTiles);

    const message = {
      ...gameObject,
      ...gameStatusObject,
      tiles: updatedTiles,
      turn: invertTurns[myLabel],
      choiceObject: choice,
      messageType: messageType.CHOICE
    }
    console.log(connection);
    setGameObject(message);
    connection.send(message);
  }

  const connectPeer = async (peerId) => {
    if (!peer) {
      toast.error("Please login");
      return;
    }
    try {
      setWaiting(true);
      const _connection = await peer.connect(peerId);
      HandleConnection(_connection);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const CloseConnection = () => {
    connectionRequestRef.current?.close();
    connectionRequestRef.current = null;
    setConnection(null);
  }

  const checkWinCondition = (tiles) => {
    const winningCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [0, 4, 6],
    ]
    for (let combination of winningCombination) {
      console.log("combination - ", combination);
      const [a, b, c] = combination;
      if (tiles[a].label && tiles[a].label === tiles[b].label && tiles[a].label === tiles[c].label) {
        return { isGameOver: true, winnerID: username, winningCombo: combination };
      }
      if (tiles.every(tile => tile.selected)) {
        return { isGameOver: true, winnerID: null, winningCombo: [] };
      }
    }
    return { isGameOver: false, winnerID: null, winningCombo: [] };
  }

  //#endregion

  return (
    <PeerContext.Provider
      value={{
        tiles, gameObject,
        loading,
        isWaiting,
        username,
        connection,
        connectionRequest,
        connectionRequestID,

        login,
        logout,
        connectPeer,
        AcceptRequest,
        RejectRequest,
        Selection,
        ResetGame,
        CloseConnection
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};

const usePeerContext = () => {
  if (!PeerContext) {
    throw Error("PeerContext not used within provider");
  }
  return useContext(PeerContext);
};
export default usePeerContext;
