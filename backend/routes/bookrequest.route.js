const express = require('express')
const router = express.Router()
const { createnewBookRequest,updateRequestDetails,deleteRequest,displayRequestDetails,getAllRequests, getAllExchangeRequests,updateStatus } = require ("../controllers/bookRequest.controller")

router.post('/create' , createnewBookRequest)
router.put('/update/:id', updateRequestDetails )
router.get('/display/:id' ,  displayRequestDetails)
router.delete('/delete/:id' ,  deleteRequest)
router.get('/read', getAllRequests)

//content curator
router.get('/fetchAllRequests', getAllExchangeRequests)
router.put('/updateStatus/:id', updateStatus)
router.get('/fetchRequestDetails/:id' ,  displayRequestDetails)

module.exports = router