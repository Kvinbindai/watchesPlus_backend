const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const server = http.createServer(app);

// const server = require("./app");
const { Server } = require("socket.io");
// const dotenv = require("dotenv").config();

module.exports = function socketServer() {
  app.use(express.json());
  app.use(cors());

  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  app.get("", (req, res) => {
    res.json({ msg: "test socket" });
  });

  const onlineUser = {};

  io.use((socket, next) => {
    const authUser = socket.handshake.auth.senderId;
    onlineUser[authUser] = socket.id;
    console.log(authUser, "authUser");
    next();
  });

  io.on("connection", (socket) => {
    console.log("Client is connected");
    // socket.on("message", (msg) => {
    //   io.emit("received", msg);
    // });

    socket.on("message", (data) => {
      const { receiverId, msg } = data;
      console.log(data, "---------------");
      console.log(onlineUser);
      io.to([
        onlineUser[socket.handshake.auth.senderId],
        onlineUser[receiverId],
      ]).emit("message", { receiverId: receiverId, msg });
    });

    socket.on("disconnect", () => {
      console.log("Client is disconnected");
    });
  });

  //   const PORT = process.env.PORT || 8080;
  const PORT = 8888;
  // console.log(PORT);
  server.listen(PORT, () => {
    console.log(`Socket io server is running on port ${PORT}`);
  });
};
