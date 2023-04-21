import MessageModel from "../models/message.model";

const createMessage = async (data) => {
  let newMessage = new MessageModel({
    content: "Khánh vi xinh đẹp",
    senderId: "6437068fd268734f3da05e86",
    type: "string",
    conversationId: "112234",
  });
  newMessage = await newMessage.save();
  return newMessage;
};

const messageService = {
  createMessage,
};

export default messageService;
