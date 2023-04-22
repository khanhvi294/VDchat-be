import conversationService from "../services/conversation.service";

const createConversation = async (req, res) => {
  try {
    let result = await conversationService.createConversation(
      req.user.id,
      req.body
    );

    // neu co realtime thi realtime o day
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const createGroupChat = async (req, res) => {
  try {
    let result = await conversationService.createConversation(
      req.user.id,
      req.body.groupId
    );

    // neu co realtime thi realtime o day
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const outGroupChat = async (req, res) => {
  try {
    let result = await conversationService.outGroupChat(req.user.id, req.body);

    // neu co realtime thi realtime o day
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const conversationController = {
  createConversation,
  createGroupChat,
  outGroupChat,
};

export default conversationController;
