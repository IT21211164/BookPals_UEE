const bookRequestModel = require("../models/bookrequest.model");
const asyncHandler = require('express-async-handler')

const getAllExchangeRequests = asyncHandler(async (req, res) => {
    const request = await bookRequestModel.find();
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json("No orders found");
    }
});

// update order status
const updateStatus = asyncHandler(async(req,res)=>{
    const id = req.params.id 
    
    // check whether the order is existing for update process
    const checkInstance = await bookRequestModel.findById(id)

    if(checkInstance){
        const newStatus = { status: req.body.status };
        const response = await bookRequestModel.findByIdAndUpdate(id , newStatus, { new: true })
        if(response){
            res.status(200).json(response)
        }
        else{
            res.status(403).json('order can not be updated')
        }
    }
    else{
        res.status(404).json('order does not exist in the database')
    }

})

module.exports = {
    updateStatus,
    getAllExchangeRequests
};
