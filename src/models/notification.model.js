import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User" },
    isRead: { type: Boolean },
  },
  { timestamps: true }
);

const NotificationModel = model("Notification", notificationSchema);

export default NotificationModel;
