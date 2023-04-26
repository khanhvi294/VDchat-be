import messageService from "../services/message.service";
import { io } from "../socket";

const getMessages = async (req, res) => {
  try {
    let result = await messageService.getMessages(req.params.conversationId);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const createMessage = async (req, res) => {
  try {
    // let result = await messageService.createMessage(req.body);
    let result = "ok";
    // console.log("socet ", io);
    io.in("64443a5b739e5608426ccc33").emit("new-message", "hahah ok chua");
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const deleteMessage = async (req, res) => {
  try {
    let result = await messageService.deleteMessage(req.body);
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const messageController = { createMessage, deleteMessage, getMessages };

export default messageController;
