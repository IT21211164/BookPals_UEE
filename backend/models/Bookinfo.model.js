const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    BookName: {
      type: String,
      required: true
    },

    authorName: {
      type: String,
      required: true
    },

    BookDescription: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book1", BookSchema);