const mongoose = require("mongoose");

const BookreqlistSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true
    },

    BookName: {
      type: String,
      required: true
    },

    authorName: {
      type: String,
      required: true
    },

    status: {
        type: String,
        required: true
      }

  },
  { timestamps: true }
);

module.exports = mongoose.model("reqlist", BookreqlistSchema);