const express = require("express"); // Access
const socket = require("socket.io");

const app = express(); //Initialized and server ready

app.use(express.static("public"));  //after connecting to the server this will load the index.html file on frontend from the public folder

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log("Listening to port" + port);
})

let io = socket(server);

io.on("connection", (socket) => {    //when connection is established
    console.log("Made socket connection");
    // Received data
    socket.on("beginPath", (data) => {   //recieved data from the frontend , beginpath is a unique identifier to identify the action performed
        // data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);  // will emit the data to all the computers connected to server, including the one i am runnning server on
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
})