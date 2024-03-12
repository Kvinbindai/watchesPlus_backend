const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const server = http.createServer(app);

// const server = require("./app");
const { Server } = require("socket.io");
const prisma = require("./config/prisma");
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
    console.log(socket.handshake.auth, "auth");
    onlineUser[authUser] = socket.id;
    // console.log(authUser, "authUser");
    next();
  });

  io.on("connection", (socket) => {
    console.log("Client is connected");
    console.log(onlineUser, "onlineUser");
    // socket.on("message", (msg) => {
    //   io.emit("received", msg);
    // });

    socket.on("message", async (data) => {
      const { receiverId, msg, chatRoomId } = data;
      console.log(data, "---------------");
      console.log(onlineUser);
      const res = await prisma.chatMessage.create({
        data: {
          senderId: socket.handshake.auth.senderId,
          receiverId: +receiverId,
          message: msg,
          chatRoomId: +chatRoomId,
        },
        include: {
          sender: true,
          receiver: true,
        },
      });
      console.log(res, "res");
      io.to([
        onlineUser[socket.handshake.auth.senderId],
        onlineUser[receiverId],
      ]).emit("message1", { receiverId: receiverId, ...res });
    });

    socket.on("disconnect", () => {
      console.log("Client is disconnected");
    });
  });

  //   const PORT = process.env.PORT || 8080;
  const PORT = process.env.CHAT_PORT;
  // console.log(PORT);
  server.listen(PORT, () => {
    console.log(`Socket io server is running on port ${PORT}`);
  });
};
