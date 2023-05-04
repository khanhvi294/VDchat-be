import ConversationModel from "../models/conversation.model";
import UserModel from "../models/user.model";

const getUserInfo = async (userId) => {
  return await UserModel.findById(userId, { providers: 0, role: 0 });
};

const updateUserInfo = async (userId, data) => {
  return await UserModel.findByIdAndUpdate(userId, data, {
    returnDocument: "after",
  });
};

const blockUser = async (userId, blockUserId) => {
  return await UserModel.findByIdAndUpdate(
    userId,
    {
      $push: { blockIds: blockUserId },
    },
    { returnDocument: "after" }
  );
};

const unblockUser = async (userId, blockUserId) => {
  return await UserModel.findByIdAndUpdate(
    userId,
    {
      $pull: { blockIds: blockUserId },
    },
    { returnDocument: "after" }
  );
};
const findUsersAndConversations = async (data, userId) => {
  const conversations = await ConversationModel.find({
    name: { $regex: data, $options: "i" },
    participants: { $in: [userId] },
  });

  const participantIds = conversations.reduce((acc, conversation) => {
    return [...acc, ...conversation.participants];
  }, []);

  const filteredParticipantIds = participantIds.filter(
    (id) => String(id) !== String(userId)
  );

  const usersWithConversation = await UserModel.find({
    username: { $regex: data, $options: "i" },
    _id: { $in: filteredParticipantIds },
  });

  const usersWithoutConversation = await UserModel.find({
    username: { $regex: data, $options: "i" },
    _id: { $nin: filteredParticipantIds, $ne: userId },
  });

  return { usersWithConversation, usersWithoutConversation, conversations };
};

//   try {
//     const usersWithConversation = await UserModel.aggregate([
//       {
//         $match: {
//           username: { $regex: data, $options: "i" },
//           _id: { $ne: userId },
//         },
//       },
//       {
//         $lookup: {
//           from: "conversations",
//           localField: "conversations",
//           foreignField: "_id",
//           as: "conversations",
//         },
//       },
//       {
//         $match: {
//           "conversations.participants": userId,
//         },
//       },
//     ]);

//     const usersWithConversationIds = usersWithConversation.map(
//       (user) => user._id
//     );

//     const usersWithoutConversation = await UserModel.find({
//       username: { $regex: data, $options: "i" },
//       _id: { $ne: userId },
//       _id: { $nin: usersWithConversationIds },
//     });

//     const conversations = await ConversationModel.find({
//       name: { $regex: data, $options: "i" },
//       participants: { $in: [userId] },
//     });

//     return { usersWithConversation, usersWithoutConversation, conversations };
//   } catch (error) {
//     console.log(error);
//   }
// };

const userService = {
  getUserInfo,
  updateUserInfo,
  blockUser,
  unblockUser,
  findUsersAndConversations,
};

export default userService;
