import userService from "../services/user.service";

const getUserInfo = async (req, res) => {
  try {
    let result = await userService.getUserInfo(req.user.id);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    let result = await userService.updateUserInfo(req.user.id, req.body);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const blockUser = async (req, res) => {
  try {
    let result = await userService.blockUser(req.user.id, req.params.userId);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const unblockUser = async (req, res) => {
  try {
    let result = await userService.unblockUser(req.user.id, req.params.userId);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};
const findUsersAndConversations = async (req, res) => {
  console.log(typeof req.params.name);
  console.log("xtl");
  try {
    let result = await userService.findUsersAndConversations(
      req.params.name,
      req.user.id
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log("errrr", error);
    return res.status(404).json({ error });
  }
};

const userController = {
  getUserInfo,
  updateUserInfo,
  blockUser,
  unblockUser,
  findUsersAndConversations,
};

export default userController;
