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
    console.log("error ", error);
    return res.status(404).json({ error });
  }
};

const outGroupChat = async (req, res) => {
  try {
    let result = await conversationService.outGroupChat(
      req.user.id,
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
    const { page, limit } = req.query;
    console.log("sfd", req.query);
    let result = await conversationService.getConversations(
      req.user.id,
      page,
      limit
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};

const updateGroupChat = async (req, res) => {
  try {
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
