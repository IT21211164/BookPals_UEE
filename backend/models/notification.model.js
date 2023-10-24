const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    senderName: {
      type: String,
      requried: true
    },

    senderRole: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    receiverId: {
      type: String,
      required: true
    },

    receiverRole: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", notificationSchema);
