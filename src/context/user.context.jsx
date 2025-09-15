import { isEmpty } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PeerClass } from "../module/peer.module";
import toast from "react-hot-toast";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [peerInstance, _] = useState(new PeerClass());
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const login = async (username) => {
        setLoading(true);
        peerInstance.startPeerSession(username)
            .then(id => setUsername(id))
            .catch(error => toast.error(error))
            .finally(() => setLoading(false));
    }
    const logout = async () => {
        await peerInstance.closePeer().then(() => {
            setUsername("");
        }).catch(error => toast.error(error));

    }

    const sendGameRequest = async (peerId) => {
        await peerInstance.closePeer().then(() => { })
            .catch(error => toast.error(error))
    }

    useEffect(() => {
        if (isEmpty(username)) {
            navigate("/login");
        } else {
            navigate("/")
        }
    }, [username]);

    useEffect(() => {
        if (peerInstance?.connectionRequest) {
            if (isPlaying) {
                peerInstance.clearConnectionRequest();
            }
        }
    }, [peerInstance?.connectionRequest])

    return (
        <UserContext.Provider value={{
            loading,
            username,
            login,
            logout,
            sendGameRequest,
        }}>
            {children}
        </UserContext.Provider>
    );
};


const useProfileContext = () => {
    if (!UserContext) {
        throw Error("UserContext not used within provider");
    }
    return useContext(UserContext);
}
export default useProfileContext;
