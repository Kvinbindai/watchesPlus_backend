const express = require("express");
const {
  createMessage,
  createChatRoom,
  getConversation,
  getUserById,
  getChatroom,
} = require("../controller/livechat");

const router = express.Router();

router.post("/chat-room", createChatRoom);
router.get("/get-user", getUserById);
router.post("/get-room", getChatroom);
router.post("/message", createMessage);
router.get("/get-conversation", getConversation);

module.exports = router;
