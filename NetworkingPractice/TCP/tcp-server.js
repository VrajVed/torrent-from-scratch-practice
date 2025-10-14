import net from "net";

// creating a server
// A socket is like a phone line
const server = net.createServer((socket) => {
    console.log("Client Connected");

    socket.on('data', data => { 
        console.log(`Recieved ${data}`); // Hello from client is recieved here
        socket.write("Hello from server !"); // Hello from server is sent to client
    });
    // I had a doubt in this callback function but it says, if 'data' is recieved you get that data  and then print it
    // Similarly in below function if it says 'end' then run an anonymous callback which says client disconnected 
    socket.on('end', () => {
        console.log("Client Disconnected");
    });
});

server.listen(8080, () => {
    console.log("Listening on port 8080");
});
