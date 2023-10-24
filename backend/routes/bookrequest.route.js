const express = require('express')
const router = express.Router()
const { createnewBookRequest,updateRequestDetails,deleteRequest,displayRequestDetails,getAllRequests } = require ("../controllers/bookRequest.controller")

router.post('/create' , createnewBookRequest)
router.put('/update/:id', updateRequestDetails )
router.get('/display/:id' ,  displayRequestDetails)
router.delete('/delete/:id' ,  deleteRequest)
router.get('/read', getAllRequests)

module.exports = router