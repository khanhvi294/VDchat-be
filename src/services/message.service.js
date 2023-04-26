import MessageModel from "../models/message.model";
import ConversationModel from "../models/conversation.model";
import UserModel from "../models/user.model";

const getMessages = async (conversationId) => {
  console.log("conversatioID ", conversationId);
  let messages = await MessageModel.find({
    conversationId,
  })
    .sort({ createdAt: -1 })
    .populate("senderId", "username avatar");

  return messages ? messages.reverse() : [];
};

const createMessage = async (data) => {
  let newMessage = new MessageModel({
    content: "content content content content content content",
    senderId: "64398312e38609d9408720b2",
    // senderId: "6441483c8a33ac5e28b95b25",
    type: "string",
    conversationId: "64443a5b739e5608426ccc33",
  });
  newMessage = await newMessage.save();
  return newMessage;
};

const deleteMessage = async (data) => {
  const resultConversation = await ConversationModel.findById(
    data.conversationId,
    "participants"
  );
  const participantsArr = resultConversation.participants;
  const participantsArrLength = participantsArr.length;
  const resultMessage = await MessageModel.findById(
    data.messageId,
    "userIdsHide"
  );
  const userIdsHideArr = resultMessage.userIdsHide;
  const userIdsHideArrLength = userIdsHideArr.length;
  if (participantsArrLength - 1 === userIdsHideArrLength) {
    return await MessageModel.findByIdAndDelete(data.messageId);
  } else {
    return await MessageModel.findByIdAndUpdate(
      { _id: data.messageId },
      { $push: { userIdsHide: data.userId } },
      {
        returnDocument: "after",
      }
    );
  }
};

const messageService = {
  createMessage,
  deleteMessage,
  getMessages,
};

export default messageService;
