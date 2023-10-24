const express = require('express')
const router = express.Router()
const { createnewBook , updateBookDetails , displayBookDetails , deleteBook , getAllBooks } = require ("../controllers/bookInfo.controller")

router.post('/create' , createnewBook)
router.put('/update/:id', updateBookDetails )
router.get('/display/:id' ,  displayBookDetails)
router.delete('/delete/:id' ,  deleteBook)
router.get('/read', getAllBooks)

module.exports = router