import dgram from "dgram";

const client = dgram.createSocket('udp4');

client.send("hello from client", 8081, "localhost", (err) => {
    if (err) console.error(err); // small bug here
    client.close(); // closing early
});
// so this cannot run 
client.on("message", (msg, rinfo) => {
    console.log(`Client got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});