const express = require("express");
const router = express.Router();
const { createBook, getAllBooks , displayBookDetails , readBookBycategory} = require("../controllers/book.controller");

router.post("/create-book", createBook);
router.get("/display-books", getAllBooks);
router.get('/display-book/:id' ,  displayBookDetails);
router.get('/display-books/:bookCategory' ,  readBookBycategory);

module.exports = router;
