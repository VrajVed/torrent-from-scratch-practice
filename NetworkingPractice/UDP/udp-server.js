import dgram from "dgram";

const server = dgram.createSocket("udp4"); //udp4 means sending ipv4 messages

// rinfo is the info on who sent the message
server.on('message', (msg, rinfo) => {
    console.log(`Server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    server.send("Hello from server !", rinfo.port, rinfo.address);
});

server.on('listening', () => {
    const address = server.address();
    console.log(`UDP server is listening on ${address.address}:${address.port}`);
});

server.bind(8081);