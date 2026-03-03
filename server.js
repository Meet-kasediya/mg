const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("move", (data) => {
    socket.broadcast.emit("playerMove", data);
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});