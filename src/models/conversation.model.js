import { Schema, model } from "mongoose";

const conversationSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
    avatar: { type: String },
    name: { type: String },
    isGroup: { type: Boolean },
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const ConversationModel = model("Conversation", conversationSchema);

export default ConversationModel;
