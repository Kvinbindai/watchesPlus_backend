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
  prisma.chatMessage.findMany({
    where: { chatRoomId },
    include: { receiver: true, sender: true },
  });

exports.getUserByIdService = (id) =>
  prisma.user.findFirst({
    where: id,
  });

exports.getChatRoomService = (userId) =>
  prisma.chatRoom.findFirst({
    where: { userId },
    include: { sender: true, receiver: true },
  });
