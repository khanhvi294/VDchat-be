import ConversationModel from "../models/conversation.model";
import { getResultPaginate } from "./pagination.service";

const LIMIT_SIZE = 5;

const createConversation = async (userId, data) => {
  let newConversation = new ConversationModel({
    creatorId: userId,
    participants: [userId, ...data.participants],
  });

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
const getConversations = async (userId, page = 0, limit = LIMIT_SIZE) => {
  return await getResultPaginate({
    Model: ConversationModel,
    query: { participants: { $in: [userId] } },
    sort: { updatedAt: -1 },
    page,
    limit,
  });
  // return await ConversationModel.find(
  //   { participants: { $in: [userId] } },
  //   {
  //     sort: { updatedAt: -1 },
  //   }
  // );
};
const updateGroupChat = async (groupId, data) => {
  return await ConversationModel.findByIdAndUpdate(groupId, data, {
    returnDocument: "after",
  });
};

const addMemberToGroupChat = async (userId, data) => {
  const result = await ConversationModel.findById(data.groupId, "creatorId");
  const creatorId = result.creatorId.toString();
  if (userId !== creatorId) {
    return;
  }
  return await ConversationModel.findByIdAndUpdate(
    { _id: data.groupId },
    { $push: { participants: data.participantId } },
    {
      returnDocument: "after",
    }
  );
};

const removeMemberFromGroupChat = async (data) => {
  return await ConversationModel.findByIdAndUpdate(
    data.groupId,
    { $pull: { participants: data.participantId } },
    { returnDocument: "after" }
  );
};

const conversationService = {
  createConversation,
  outGroupChat,
  getConversations,
  updateGroupChat,
  addMemberToGroupChat,
  removeMemberFromGroupChat,
};

export default conversationService;
