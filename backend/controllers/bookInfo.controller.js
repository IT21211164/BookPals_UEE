const asyncHandler = require("express-async-handler");
const bookModel = require("../models/Bookinfo.model");

// Create an order
const createnewBook = asyncHandler(async (req, res) => {
  const { userID , BookName , authorName , BookDescription } = req.body;

  const response = await bookModel.create({
    userID :userID,
    BookName :BookName,
    authorName :authorName ,
    BookDescription : BookDescription
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
const updateBookDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await bookModel.findById(id);

  if (checkInstance) {
    const response = await bookModel.findByIdAndUpdate(id, { ...req.body }, { new: true }); // Use { new: true } to return the updated document
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
const deleteBook = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await bookModel.findById(id);

  if (checkInstance) {
    const response = await bookModel.findByIdAndDelete(id);
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

const displayBookDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const response = await bookModel.findById(id);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getAllBooks = asyncHandler(async (req, res) => {
    const books = await bookModel.find();
    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404).json("No orders found");
    }
  });

module.exports = {
    createnewBook,
    updateBookDetails,
    deleteBook,
    displayBookDetails,
    getAllBooks
};
