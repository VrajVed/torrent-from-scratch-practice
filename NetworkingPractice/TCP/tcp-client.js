import net from "net";

const client = net.createConnection({port: 8080}, () => {
    console.log("Connected to server!");
    client.write("Hello from client !"); // .write() is used for a data stream and this hello from client is sent to server
});

client.on('data', (data) => {
    console.log(`Recieved ${data}`); // Hello from server is recieved from here
    client.end(); // I stop sending my packages and end the session
});

// This function will notify the server that the client has disconnected.
client.on('end', () => {
    console.log('Disconnected from server'); 
});