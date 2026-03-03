const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(socket.id, " connected");

  io.emit("log", ` ${socket.id} joined`);
  
  socket.on("move", (data) => {
    socket.broadcast.emit("playerMove", data);

    io.emit("log", ` ${socket.id} moved`);
  });

  socket.on("disconnect", () => {
    io.emit("log", ` ${socket.id} left`);
    
    console.log("Player disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});