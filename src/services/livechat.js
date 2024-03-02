const prisma = require("../config/prisma");

exports.createChatroomService = (userId, adminId) =>
  prisma.chatRoom.create({
    data: { userId, adminId },
  });

exports.checkUserOrAdmin = (id) =>
  prisma.user.findFirst({
    where: { id },
  });

exports.createMessageService = (senderId, receiverId, chatRoomId, message) =>
  prisma.chatMessage.create({
    data: {
      senderId,
      receiverId,
      message,
      chatRoomId,
    },
  });

exports.getConversationService = (chatRoomId) =>
  prisma.chatMessage.findMany({ where: { chatRoomId } });
