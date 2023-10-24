const express = require("express");
const router = express.Router();
const {
  createNotification,
  readNotificationsUsingReceiverId,
  readNotificationsUsingReceiverRole
} = require("../controllers/notification.controller");

router.post("/create-notification", createNotification);
router.get(
  "/display-notifications-by-role",
  readNotificationsUsingReceiverRole
);
router.get(
  "/display-notifications-by-id/:id",
  readNotificationsUsingReceiverId
);

module.exports = router;
