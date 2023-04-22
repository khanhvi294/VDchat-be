import userService from "../services/user.service";

const getUserInfo = async (req, res) => {
  try {
    let result = await userService.getUserInfo(req.userData.id);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    console.log("Error ", error);
    return res.status(404).json({ error });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    let result = await userService.updateUserInfo(req.body);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const userControler = { getUserInfo, updateUserInfo };

export default userControler;
