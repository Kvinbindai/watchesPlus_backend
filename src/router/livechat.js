const express = require("express");
const {
  createMessage,
  createChatRoom,
  getConversation,
  getUserById,
  getChatroom,

  getAllChatroomUser,
} = require("../controller/livechat");

const router = express.Router();

router.post("/chat-room", createChatRoom);
router.get("/get-user", getUserById);
router.post("/get-room", getChatroom);
router.post("/message", createMessage);
router.post("/get-conversation", getConversation);

router.get("/get-all-chatroom", getAllChatroomUser);

module.exports = router;
