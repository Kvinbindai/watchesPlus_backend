const express = require("express");
const {
  createMessage,
  createChatRoom,
  getConversation,
  getUserById,
  getChatroom,

  getAllChatroomUser,
  getChatRoomAdmin,
  getAllConversation,
} = require("../controller/livechat");

const router = express.Router();

router.post("/chat-room", createChatRoom);
router.post("/get-user", getUserById);
router.post("/get-room", getChatroom);
router.post("/message", createMessage);
router.post("/get-conversation", getConversation);
router.post("/get-chatroom-admin", getChatRoomAdmin);
router.get("/get-all-chatroom", getAllChatroomUser);
router.get("/get-all-conversation", getAllConversation);

module.exports = router;
