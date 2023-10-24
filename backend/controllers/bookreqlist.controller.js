const asyncHandler = require("express-async-handler");
const requestModel = require("../models/bookreqlist.model");

// Create an order
const createnewBookRequest = asyncHandler(async (req, res) => {
  const {userID , BookName , authorName , status } = req.body;

  const response = await requestModel.create({
    userID: userID,
    BookName :BookName,
    authorName :authorName ,
    status : status
  });

  if (response) {
    res.status(201).json({
      message: "Book created",
      order: response
    });
  } else {
    res.status(403).json("Book could not be created!");
  }
});

// Update order details
const updateBookRequestDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await requestModel.findById(id);

  if (checkInstance) {
    const response = await requestModel.findByIdAndUpdate(id, { ...req.body }, { new: true }); // Use { new: true } to return the updated document
    if (response) {
      res.status(200).json({
        message: "book updated",
        order: response
      });
    } else {
      res.status(403).json("book status cannot be updated");
    }
  } else {
    res.status(404).json("book does not exist in the database");
  }
});

// Delete an order
const deleteBookRequest = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await requestModel.findById(id);

  if (checkInstance) {
    const response = await requestModel.findByIdAndDelete(id);
    if (response) {
      res.status(200).json({
        message: "Book deleted"
      });
    } else {
      res.status(403).json("Book cannot be deleted");
    }
  } else {
    res.status(404).json("Book does not exist in the database");
  }
});

const displayBookRequestDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const response = await requestModel.findById(id);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getAllBookrequests = asyncHandler(async (req, res) => {
    const books = await requestModel.find();
    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404).json("No orders found");
    }
  });

  const readReqUsingReceiverId = asyncHandler(async (req, res) => {
    const id = req.params.userID;
    const response = await requestModel
      .find({ userID: id })
      .sort({ createdAt: -1 });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json("something went wrong!");
    }
  });

module.exports = {
    createnewBookRequest,
    updateBookRequestDetails,
    deleteBookRequest,
    displayBookRequestDetails,
    getAllBookrequests,
    readReqUsingReceiverId
};
