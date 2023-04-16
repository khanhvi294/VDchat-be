import NotificationModel from "../models/notification.model";

const createNotification = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newNotification = new NotificationModel({
        senderId: data.senderId,
        isRead: false,
        receiverId: data.receiverId,
        type: "Friend",
      });

      newNotification = await newNotification.save();
      return resolve({
        success: true,
        data: newNotification
      })
    } catch (error) {
      reject({ success: false, error: error });
    }
  });
};

const notificationService = {
  createNotification,
};

export default notificationService;
