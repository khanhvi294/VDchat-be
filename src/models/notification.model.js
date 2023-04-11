import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    isRead: { type: Boolean },
  },
  { timestamps: true }
);

const Notification = model("Notification", notificationSchema);

export default Notification;
