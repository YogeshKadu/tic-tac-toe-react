import Peer from "peerjs";
import toast from "react-hot-toast";

export class PeerClass {
    peer = null;
    peerId = null;

    connection = null;
    connectionId = null;
    connectionRequest = null;
    name = "";
    hasError = false;
    errorMessage = null;

    getPeerId = () => this.peerId;
    getConnectionId = () => this.connectionId;

    // connect to peer js server
    startPeerSession = (username) => new Promise((resolve, reject) => {
        this.hasError = false;
        this.errorMessage = null;
        this.peer = new Peer(username);
        this.peer?.on('open', id => {
            console.log('connection - ', id);
            this.peerId = id;
            resolve(id);
        }).on('disconnected', _ => {
            console.log('StartPeerSession disconnected');
            reject('Peer Disconnected !');
        }).on('peer-unavailable', _ => {
            reject("The peer you're trying to connect to does not exist.");
        }).on('error', error => {
            console.log('StartPeerSession Error - ', error);
            this.hasError = true;
            this.errorMessage = error?.message;
            reject(error?.message)
        }).on('connection', connection => {
            if (this.connection) {
                connection.close();
            }
            console.log('Receive connection - ', error);
            this.connectionRequest = connection;
        });
    });
    clearConnectionRequest = () => {
        this.connectionRequest = null;
    }

    // establish connection with other user
    connectPeer = (peerId) => new Promise((resolve, reject) => {
        this.hasError = false;
        this.errorMessage = null;
        if (!this.peer) {
            reject("Peer doesn't start yet")
            return;
        }
        try {
            this.connection = this.peer?.connect(peerId, { reliable: true })
            if (!this.connection) {
                reject("Connection can't be established")
            } else {
                this.connection?.on('open', function () {
                    console.log("Connect to: " + peerId)
                    resolve(peerId);
                    this.peer?.removeListener('error', handlePeerError);
                }).on('error', function (err) {
                    console.log(err)
                    this.peer?.removeListener('error', handlePeerError);
                }).on('close', () => {
                    console.log("connectoin closed");
                    this.connection = null;
                }).on('data', data => this.ReceiveData(data))

                // When the connection fails due to expiry, the error gets emmitted
                // to the peer instead of to the connection.
                // We need to handle this here to be able to fulfill the Promise.
                const handlePeerError = (error) => {
                    console.log('HandlePeerError Error - ', error);
                    this.hasError = true;
                    // this.errorMessage = error?.message
                    toast.error(error?.message);
                }
                peer.on('error', handlePeerError);
            }
        } catch (error) {
            console.log('ConnectPeer Error - ', error);
            this.hasError = true;
            reject(error?.message);
        }
    });

    // command structure.
    ReceiveData = (data) => {

    }
    SendData = (data) => {

    }
    // close connection with other user
    closePeerConnection = async () => {
        await this.connection?.close();
    }
    closePeer = async () => {
        await this.peer?.disconnect();
    }
}