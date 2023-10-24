const bookModel = require("../models/book.model");
const asyncHandler = require("express-async-handler");

// store a book
const createBook = asyncHandler(async (req, res) => {
  const {
    bookImage,
    bookName,
    bookAuthor,
    bookCategory,
    bookRating,
    bookSynopsis,
    bookDescription
  } = req.body;

  const response = await bookModel.create({
    bookImage,
    bookName,
    bookAuthor,
    bookCategory,
    bookRating,
    bookSynopsis,
    bookDescription
  });

  if (response) {
    res.status(201).json({
      bookId: response._id,
      bookName: response.bookName,
      bookAuthor: response.bookAuthor
    });
  } else {
    res.status(403).json("book could not be created!");
  }
});

//fetch all books
const getAllBooks = asyncHandler(async (req, res) => {
  const response = await bookModel.find({}).sort({ createdAt: -1 });
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(401).json("something went wrong!");
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

module.exports = {
  createBook,
  getAllBooks,
  displayBookDetails
};
