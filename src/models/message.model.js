import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    conversationId: { type: String, required: true },
    content: { type: String },
    type: { type: String, required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    userIdsHide: [{ type: Schema.Types.ObjectId }],
    readedByParticipants: [{ type: Schema.Types.ObjectId }],
  },
  { timestamps: true }
);

const Message = model("Message", messageSchema);

export default Message;
