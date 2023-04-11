import { Schema, model } from "mongoose";

export const StatusConversation = {
  REJECTED: "REJECTED",
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
};

const conversationSchema = new Schema()(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    participaints: [{ type: Schema.Types.ObjectId }],
    avatar: { type: String },
    name: { type: String },
    isGroup: { type: Boolean },
    status: { type: String },
  },
  { timestamps: true }
);

const Conversation = model("Conversation", conversationSchema);

export default Conversation;
