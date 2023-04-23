import messageService from "../services/message.service";

const createMessage = async (req, res) => {
  try {
    let result = await messageService.createMessage(req.body);
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

const messageController = { createMessage, deleteMessage };

export default messageController;
