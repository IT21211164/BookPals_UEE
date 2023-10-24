const notificationModel = require("../models/notification.model");
const asyncHandler = require("express-async-handler");

// create a notification
const createNotification = asyncHandler(async (req, res) => {
  const { senderName, senderRole, message, receiverId, receiverRole } =
    req.body;

  const response = await notificationModel.create({
    senderName,
    senderRole,
    message,
    receiverId,
    receiverRole
  });

  if (response) {
    res.status(201).json({
      notificationId: response._id,
      sender: response.senderRole,
      receiver: response.receiverRole
    });
  } else {
    res.status(403).json("notification could not be created!");
  }
});

// fetch notifications based on receiver Id
const readNotificationsUsingReceiverId = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const response = await notificationModel
    .find({ receiverId: id })
    .sort({ createdAt: -1 });
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(401).json("something went wrong!");
  }
});

//fetch notifications based on user role
const readNotificationsUsingReceiverRole = asyncHandler(async (req, res) => {
  const response = await notificationModel
    .find({ receiverRole: "procurement-head" })
    .sort({ createdAt: -1 });
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(401).json("something went wrong!");
  }
});

module.exports = {
  createNotification,
  readNotificationsUsingReceiverId,
  readNotificationsUsingReceiverRole
};
