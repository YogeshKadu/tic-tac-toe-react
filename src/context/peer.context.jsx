import { isEmpty } from "lodash";
import Peer from "peerjs";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";


const messageType = {
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  CHOICE: "CHOICE",
}
const tileObject = {
  id: null,
  peerId: null, // peerID
  label: null,  // X | O
  disabled: false,
}

const prefillTile = new Array(9).fill(0).map((_, index) => ({ ...tileObject, id: index + 1 }))

const defaultGameObject = {
  x: '',          //peerid
  o: '',          //peerid
  tiles: [...prefillTile],
  isGameOver: false,
  winnerID: null,
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

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWaiting, setWaiting] = useState(false);

  const [tiles, setTiles] = useState([...prefillTile]);
  const [gameObject, setGameObject] = useState({ ...defaultGameObject });

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
        setConnectionRequestID(_connection.peer);
        setConnectionRequest(_connection);
      })
      .on("error", (error) => {
        throw new Error(error);
      })
      .on("close", () => {
        toast.success("Connection closed");
        if (connection && _connection.peer == connection.peer) {
          setConnection(null)
        } else if (connectionRequest && _connection.peer == connectionRequest.peer) {
          setConnectionRequest(null);
        } else {
          setConnectionRequest(null)
          setConnection(null)
        }
      })
      .on("data", HandleMessage);
    // setConnectionRequest(_connection);
  };

  const HandleMessage = (message) => {
    console.log("HandleMessage", message);

    switch (message?.messageType) {
      case messageType.ACCEPTED: {
        console.log("Request Accepted - ", connectionRequest);
        setConnection(connectionRequest)
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

      case messageType.CHOICE: {
        setGameObject(message);
      }
        break;
    }
  };
  //#endregion

  //#region PUBLIC
  const login = async (username) => {
    setLoading(true);
    const peer = new Peer(username);
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
      })
      .on("error", (error) => {
        HandleError(error, "Facing error on peer connection !");
        setLoading(false);
      });
  };

  const logout = async () => {
    await peer.disconnect();
  };

  const AcceptRequest = () => {
    // const imX = Math.random() < 0.5;
    const imX = true;
    const message = {
      ...gameObject,
      messageType: messageType.ACCEPTED,
      x: imX ? username : connectionRequest?.peer,
      o: imX ? connectionRequest?.peer : username,
    }
    console.log("AcceptRequest - ", connectionRequest);

    connectionRequest?.send(message);
    setGameObject(message);
    setConnection(connectionRequest)
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
  const Selection = (tileID) => {
    const myLabel = gameObject.x == username ? 'x' : 'o';
    const choice = {
      label: myLabel,
      peerId: username,
      disabled: false,
      id: tileID
    }
    const updatedTiles = gameObject.tiles.map((item) => item.id == tileID ? ({ ...item, ...choice }) : item);
    const message = {
      ...gameObject,
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
        Selection
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
