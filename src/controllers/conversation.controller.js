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
const getConversations = async (req, res) => {
  try {
    let page = req.query.page;
    let limit = req.query.limit;
    let result = await conversationService.getConversations(req.user.id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const updateGroupChat = async (req, res) => {
  try {
    console.log(req.params.groupId);
    let result = await conversationService.updateGroupChat(
      req.params.groupId,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const addMemberToGroupChat = async (req, res) => {
  try {
    let result = await conversationService.addMemberToGroupChat(
      req.user.id,
      req.body
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const removeMemberFromGroupChat = async (req, res) => {
  try {
    let result = await conversationService.removeMemberFromGroupChat(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error });
  }
};
const conversationController = {
  createConversation,
  outGroupChat,
  getConversations,
  updateGroupChat,
  addMemberToGroupChat,
  removeMemberFromGroupChat,
};

export default conversationController;
