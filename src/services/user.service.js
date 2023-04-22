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

const userService = { getUserInfo, updateUserInfo };

export default userService;
