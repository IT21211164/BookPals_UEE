const mongoose = require("mongoose");

const BookRequestSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },

    fullname: {
      type: String,
      required: true
    },

    phone: {
      type: Number,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    title: {
        type: String,
        required: true
      },
  
    authorname: {
        type: String,
        required: true
      },
  
    condition: {
        type: String,
        required: true
      },

      status: {
        type: String,
        required: true
      },

      selectedbookname: {
        type: String,
        required: true
      },

      selectedbookauthor: {
        type: String,
        required: true
      },
      
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookRequest", BookRequestSchema);