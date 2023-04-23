import UserModel from "../models/user.model";

const getUserInfo = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await UserModel.findById(userId, { providers: 0, role: 0 });
      resolve(user);
    } catch (error) {
      reject({
        success: false,
        error: error,
      });
    }
  });
};

const updateUserInfo = async (userId, data) => {
  try {
    let userUpdate = await UserModel.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    return userUpdate;
  } catch (error) {
    return error;
  }
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
