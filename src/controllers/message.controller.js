import conversationService from "../services/conversation.service";
import messageService from "../services/message.service";
import { io } from "../socket";

const getMessages = async (req, res) => {
  try {
    let result = await messageService.getMessages(
      req.user.id,
      req.params.conversationId
    );
    return res.status(200).json({ data: result, success: true });
  } catch (error) {
    console.log("error ", error);
    return res.status(404).json({ error, message: error.message });
  }
};

const createMessage = async (req, res) => {
  console.log("gdfd g", req.files, req.file, req.body);
  const { conversationId, content } = req.body;
  try {
    io.in(conversationId).emit("new-message", content);
    io.emit("message-received", req.body);
    // let result = await messageService.createMessage(req.user.id, req.files);
    // conversationService.updateGroupChat(result.conversationId, {
    //   lastMessage: result._id,
    // });
    // let result = await messageService.createMessage(req.user.id, req.body);
    // conversationService.updateGroupChat(result.conversationId, {
    //   lastMessage: result._id,
    // });
    return res.status(200).json({ data: null, success: true });
  } catch (error) {
    console.log("error ", error);
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
