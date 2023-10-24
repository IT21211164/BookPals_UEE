const express = require("express");
const router = express.Router();
const { createBook, getAllBooks , displayBookDetails} = require("../controllers/book.controller");

router.post("/create-book", createBook);
router.get("/display-books", getAllBooks);
router.get('/display-book/:id' ,  displayBookDetails)

module.exports = router;
