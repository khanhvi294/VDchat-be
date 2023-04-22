import NotificationModel from "../models/notification.model";

const createNotification = async (data) => {
  let newNotification = new NotificationModel({
    senderId: data.senderId,
    isRead: false,
    receiverId: data.receiverId,
    type: "Friend",
  });

  newNotification = await newNotification.save();
  return {
    success: true,
    data: newNotification,
  };
};

const notificationService = {
  createNotification,
};

export default notificationService;
