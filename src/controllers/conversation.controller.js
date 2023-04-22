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

const outGroupChat = async (req, res) => {
  try {
    let result = await conversationService.outGroupChat(
      // req.user.id,
      "6440f6db2a10e05c54af2dd8",
      req.params.groupId
    );

    // neu co realtime thi realtime o day
    return res.status(200).json(result);
  } catch (error) {
    console.log("error ", error);
    return res.status(404).json({ error, success: false });
  }
};

const conversationController = {
  createConversation,
  outGroupChat,
};

export default conversationController;
