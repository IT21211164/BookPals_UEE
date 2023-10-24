const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    bookImage: {
      type: String,
      required: true
    },

    bookName: {
      type: String,
      required: true
    },

    bookAuthor: {
      type: String,
      required: true
    },

    bookCategory: {
      type: String,
      required: true
    },

    bookRating: {
      type: Number,
      required: true
    },

    bookSynopsis: {
      type: String,
      required: false
    },

    bookDescription: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("book", bookSchema);
