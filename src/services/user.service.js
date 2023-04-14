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

const userService = { getUserInfo };

export default userService;
