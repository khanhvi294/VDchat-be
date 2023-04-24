import notificationService from "../services/notification.service";

const createNotification = async (req, res) => {
  try {
    let result = await notificationService.createNotification(req.body);
    // neu co realtime thi realtime o day
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const getNotifications = (req, res) => {
  try {
    // io.
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(404).json({ error });
  }
};

const notificationController = {
  createNotification,
  getNotifications,
};

export default notificationController;
