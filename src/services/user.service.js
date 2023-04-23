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

const userService = { getUserInfo, updateUserInfo, blockUser, unblockUser };

export default userService;
