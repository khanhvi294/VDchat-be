import ConversationModel, {
  StatusConversation,
} from "../models/conversation.model";

const createConversation = async (userId, data) => {
  let newConversation = new ConversationModel({
    creatorId: userId,
    participaints: [...data.participaints, userId],
  });
  if (data.isGroup) {
    newConversation.avatar = data.avatar;
    newConversation.name = data.name;
  }

  return await newConversation.save();
};

const outGroupChat = async (userId, groupId) => {
  return await ConversationModel.updateOne(
    { _id: groupId },
    { participants: { $pull: userId } }
  );
};
const getConversations = async (userId) => {
  return await ConversationModel.find({
    participaints: { $in: [userId] },
  });
};
const conversationService = {
  createConversation,
  outGroupChat,
  getConversations,
};

export default conversationService;
