const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
  {
    donorId: {
      type: String,
      required: true
    },

    donorName: {
      type: String,
      required: true
    },

    donorPhone: {
      type: String,
      required: true
    },

    donorAddress: {
      type: String,
      required: true
    },

    donationItemCategory: {
      type: String,
      required: true
    },

    donatingItem: {
      type: String,
      required: false
    },

    donationStatus: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("donation", donationSchema);
