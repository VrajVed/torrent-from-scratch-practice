import dgram from "dgram";
import crypto from "crypto";
import net from "net";

class UdpTracker {
    constructor(announceUrl, infoHash, peerId) {
        this.announceUrl = new URL(announceUrl);
        this.host = this.announceUrl.hostname;
        this.port = this.announceUrl.port;
        this.infoHash = Buffer.from(infoHash, 'hex');
        this.peerId = Buffer.from(peerId);
        this.socket = dgram.createSocket('udp4');
    }

    async getPeers(downloaded = 0, uploaded = 0, left = 0) {
        return new Promise((resolve, reject) => {
            const transactionId = crypto.randomInt(0, 0xFFFFFFFF);
            let connectionId = null;

            // Set a timeout
            const timeout = setTimeout(() => {
                this.socket.close();
                reject(new Error("Tracker request timed out"));
            }, 10000);

            this.socket.on('message', (response) => {
                const action = response.readUInt32BE(0);
                const recievedTransactionId = response.readUInt32BE(4);

                if (recievedTransactionId !== transactionId) {
                    return; // Ignore mismatched transaction IDs
                }

                if  (action === 0) { // Connect response
                    connectionId = response.slice(8,16);
                    
                }
            })

        })
    }
}