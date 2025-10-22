import { isEmpty } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PeerClass } from "../module/peer.v1.module";
import toast from "react-hot-toast";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [peerInstance, _] = useState(new PeerClass());
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setWaiting] = useState(false);
  const [connectionRequest, setConnectionRequest] = useState(false);

  const login = async (username) => {
    setLoading(true);
    peerInstance
      .startPeerSession(username)
      .then((id) => {
        setUsername(id);
        setIsPlaying(true);
        // Set up connection request listener
        peerInstance.peer.on("connection", (connection) => {
            peerInstance.peer.connection = connection;
          // Force a re-render when connection request changes
          setConnectionRequest(!!peerInstance.connectionRequest);
        });
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  };
  const logout = async () => {
    await peerInstance
      .closePeer()
      .then(() => {
        setUsername("");
      })
      .catch((error) => toast.error(error));
  };

  const sendGameRequest = (peerId) =>
    peerInstance
      .connectPeer(peerId)
      .then(() => {
        setWaiting(true);
      })
      .catch((error) => toast.error(error));

  const cancelGame = () => {
    peerInstance.closePeerConnection();
  };

  useEffect(() => {
    if (isEmpty(username)) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [username]);

  // Handle connection request changes
  useEffect(() => {
    // Update connection request state based on peer instance and playing state
    if (isPlaying && connectionRequest) {
      peerInstance.clearConnectionRequest();
      setConnectionRequest(false);
    }
  }, [isPlaying, isWaiting]);

  return (
    <UserContext.Provider
      value={{
        loading,
        username,
        peerInstance,
        connectionRequest,
        login,
        logout,
        sendGameRequest,
        cancelGame
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useProfileContext = () => {
  if (!UserContext) {
    throw Error("UserContext not used within provider");
  }
  return useContext(UserContext);
};
export default useProfileContext;
