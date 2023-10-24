const express = require('express')
const router = express.Router()
const { createnewBookRequest, updateBookRequestDetails, deleteBookRequest, displayBookRequestDetails, getAllBookrequests , readReqUsingReceiverId } = require ("../controllers/bookreqlist.controller")

router.post('/create' , createnewBookRequest)
router.put('/update/:id', updateBookRequestDetails )
router.get('/display/:id' ,  displayBookRequestDetails)
router.delete('/delete/:id' ,  deleteBookRequest)
router.get('/read', getAllBookrequests)
router.get('/read/:userID', readReqUsingReceiverId)

module.exports = router