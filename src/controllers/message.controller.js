import conversationService from "../services/conversation.service";
import messageService from "../services/message.service";

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
    let result = await messageService.createMessage(req.user.id, req.body);
    conversationService.updateGroupChat(result.conversationId, {
      lastMessage: result._id,
    });
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
