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
  from: null, // peerID
  label: null,  // X | O
  disable: false,
}

const prefillTile = new Array(9).map((_,index) => ({...tileObject, id: index}))

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setWaiting] = useState(false);

  const [disable, setDisable] = useState(true);
  const [tile, setTile] = useState([...prefillTile]);

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
        if(connection) {
          // TODO: Reject New connection
        }        
        setConnectionRequestID(_connection.peer);
        // setConnectionRequest(_connection);
        if(isWaiting){
          toast.success("Request Sent")
        }else{
          // toast.success("New Game request")
        }
      })
      .on("error", (error) => {
        throw new Error(error);
      })
      .on("close", () => {
        toast.success("Connection closed");
        if(connection && _connection.peer == connection.peer){
          setConnection(null);
        } else if(connectionRequest && _connection.peer == connectionRequest.peer) {
          setConnectionRequest(null);
        }
      })
      .on("data", HandleMessage);
      setConnectionRequest(_connection);
  };
  const HandleMessage = (data) => {
    console.log("HandleMessage", data);
    
    switch(data?.messageType) {
      case messageType.ACCEPTED: {
        setConnection(connectionRequest);
        setConnectionRequest(null);
        setDisable(false);
        setWaiting(false);
        navigate("/board");
        setTile([...prefillTile]);
        // TODO : User
      }
      break;

      case messageType.REJECTED: {
        connectionRequest?.close();
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
        setConnection(null);
        setUsername("");
      })
      .on("connection", HandleConnection)
      .on("disconnected", (_) => {
        console.log("Peer Disconnected");
        toast.success("Peer connection disconnected!");
        setConnection(null);
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
    const message = {
      messageType: messageType.ACCEPTED,
    }
    connectionRequest.send(message);
    setConnection(connectionRequest);
    setConnectionRequest(null);
    setTile([...prefillTile]);
    navigate("/board");
  }
  const RejectRequest = () => {
    const message = {
      messageType: messageType.REJECTED,
    };
    connectionRequest.send(message);
    setConnectionRequest(null);
  }

  const connectPeer = (peerId) => {
    if (!peer) {
      toast.error("Please login");
      return;
    }
    try {
      setWaiting(true);
      const _connection = peer.connect(peerId);
      HandleConnection(_connection);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const SendMessage = (_connection) => {};

  //#endregion

  return (
    <PeerContext.Provider
      value={{
        tile,
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
        SendMessage
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
