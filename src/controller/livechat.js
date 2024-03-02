const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const {
  createChatroomService,
  createMessageService,
  getConversationService,
} = require("../services/livechat");

exports.createChatRoom = catchError(async (req, res, next) => {
  const { userId, adminId } = req.body;

  // Need more validate

  //   console.log(req.body);
  if (userId === adminId) {
    createError("You're cannot chat with yourself");
  }

  const chatRoom = await createChatroomService(userId, adminId);

  res.status(200).json({ chatRoom });
});

exports.createMessage = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { receiverId, message, chatRoomId } = req.body;

    if (id === receiverId) {
      createError("You're cannot chat with yourself");
    }

    const isMessage = await createMessageService(
      id,
      receiverId,
      chatRoomId,
      message
    );

    res.status(201).json({ isMessage });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getConversation = async (req, res, next) => {
  try {
    const { chatRoomId } = req.body;

    const conversation = await getConversationService(chatRoomId);
    res.status(200).json({ conversation });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
