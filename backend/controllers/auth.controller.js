const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

// user registration function
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, category } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const response = await userModel.create({
    username: name,
    password: hashedPassword,
    email: email,
    bookCategory: category,
    role: "user"
  });

  if (response) {
    res.status(201).json({
      id: response._id,
      username: response.username,
      role: response.role,
      category: response.bookCategory
    });
  } else {
    res.status(403).json("user could not be created!");
  }
});

// Administrator account creation
// user registration function
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const response = await userModel.create({
    username: name,
    password: hashedPassword,
    email: email,
    bookCategory: "Science Fiction",
    role: "content-curator"
  });

  if (response) {
    res.status(201).json({
      id: response._id,
      username: response.username,
      role: response.role,
      category: response.bookCategory
    });
  } else {
    res.status(403).json("admin could not be created!");
  }
});

// user login function
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const response = await userModel.findOne({ email: email });

  if (response) {
    const match = await bcrypt.compare(password, response.password);

    if (match) {
      res.status(200).json({
        id: response._id,
        username: response.username,
        role: response.role,
        category: response.bookCategory
      });
    } else {
      res.status(403).json("password or email mismatch!");
    }
  } else {
    res.status(404).json({ error: "user not found!" });
  }
});

module.exports = { registerUser, registerAdmin, userLogin };
