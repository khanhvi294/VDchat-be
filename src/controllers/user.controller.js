import userService from "../services/user.service";

const getUserInfo = async (req, res) => {
  try {
    let result = await userService.getUserInfo(req.user.id);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    console.log("Error ", error);
    return res.status(404).json({ error });
  }
};

const userControler = { getUserInfo };

export default userControler;
