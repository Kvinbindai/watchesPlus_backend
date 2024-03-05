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
    const userId = socket.handshake.auth.id;
    onlineUser[userId] = socket.id;
    next();
  });

  io.on("connection", (socket) => {
    console.log("Client is connected");
    socket.on("message", (msg) => {
      io.emit("received", msg);
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
