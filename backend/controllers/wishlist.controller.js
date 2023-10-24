const asyncHandler = require("express-async-handler");
const wishlistModel = require("../models/wishlist.model");

// Create an order
const addBook = asyncHandler(async (req, res) => {
  const { userID, BookName , authorName } = req.body;

  const response = await wishlistModel.create({
    userID : userID,
    BookName :BookName,
    authorName :authorName ,
    
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
const updateBooklist = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await wishlistModel.findById(id);

  if (checkInstance) {
    const response = await wishlistModel.findByIdAndUpdate(id, { ...req.body }, { new: true }); // Use { new: true } to return the updated document
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
const deleteBookitem = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await wishlistModel.findById(id);

  if (checkInstance) {
    const response = await wishlistModel.findByIdAndDelete(id);
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

const displayBookItem = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const response = await wishlistModel.findById(id);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

const getAllBookslist = asyncHandler(async (req, res) => {
    const books = await wishlistModel.find();
    if (books) {
      res.status(200).json(books);
    } else {
      res.status(404).json("No orders found");
    }
  });

  const readWishUsingReceiverId = asyncHandler(async (req, res) => {
    const id = req.params.userID;
    const response = await wishlistModel
      .find({ userID: id })
      .sort({ createdAt: -1 });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json("something went wrong!");
    }
  });

module.exports = {
    addBook,
    updateBooklist,
    deleteBookitem,
    displayBookItem,
    getAllBookslist,
    readWishUsingReceiverId
};
