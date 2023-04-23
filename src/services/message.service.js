import MessageModel from "../models/message.model";
import ConversationModel from "../models/conversation.model";

const createMessage = async (data) => {
  let newMessage = new MessageModel({
    content: "Khánh vi xinh đẹp",
    senderId: "6437068fd268734f3da05e86",
    type: "string",
    conversationId: "112234",
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
};

export default messageService;
