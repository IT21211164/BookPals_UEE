const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username required"]
    },

    password: {
      type: String,
      required: [true, "password required"]
    },

    email: {
      type: String,
      required: [true, "email required"],
      unique: true
    },

    bookCategory: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
