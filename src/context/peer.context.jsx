import { createContext } from "react"
import { PeerClass } from "../module/peer.module";

const PeerContext = createContext();
export const PeerProvider = ({ children }) => {
    const peerInstance = new PeerClass();
    return (
        <PeerContext.Provider value={{}}>
            {children}
        </PeerContext.Provider>
    )
};

const usePeerContext = () => {
    if (!PeerContext) {
        throw Error("PeerContext not used within provider");
    }
    return useContext(PeerContext);
}
export default usePeerContext;
