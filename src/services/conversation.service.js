import ConversationModel, {
  StatusConversation,
} from "../models/conversation.model";

const createConversation = async (userId, data) => {
  console.log("user ", userId, data);
  let newConversation = new ConversationModel({
    creatorId: userId,
    participants: [userId, ...data.participants],
  });

  console.log("new ", newConversation);

  if (data.isGroup) {
    newConversation.avatar = data.avatar;
    newConversation.name = data.name;
  } else {
    newConversation.isGroup = false;
  }

  return await newConversation.save();
};

const outGroupChat = async (userId, groupId) => {
  let conversation = await ConversationModel.findByIdAndUpdate(
    groupId,
    {
      $pull: { participants: userId },
      // $set: {
      //   name: {
      //     $cond: {
      //       if: { $gt: [{ $size: "$participants" }, 2] },
      //       then: "lon hon ",
      //       else: "nho hon ma",
      //     },
      //   },
      // },
    },
    { returnDocument: "after" }
  );

  if (!conversation) {
    throw new Error(`Could not find conversation`);
  }

  if (
    conversation.creatorId == userId &&
    conversation.participants?.length >= 1
  ) {
    conversation.creatorId = conversation.participants[0];
  }

  await conversation.save();
  return conversation;
};

const conversationService = {
  createConversation,
  outGroupChat,
};

export default conversationService;
