const express = require('express')
const router = express.Router()
const { addBook, updateBooklist, deleteBookitem, displayBookItem, getAllBookslist , readWishUsingReceiverId } = require ("../controllers/wishlist.controller")

router.post('/create' , addBook)
router.put('/update/:id', updateBooklist )
router.get('/display/:id' ,  displayBookItem)
router.delete('/delete/:id' ,  deleteBookitem)
router.get('/read', getAllBookslist)
router.get('/read/:userID', readWishUsingReceiverId)

module.exports = router