const express = require("express");
const {
  createMessage,
  createChatRoom,
  getConversation,
} = require("../controller/livechat");

const router = express.Router();

router.post("/chat-room", createChatRoom);
router.post("/message", createMessage);
router.get("/get-conversation", getConversation);

module.exports = router;
