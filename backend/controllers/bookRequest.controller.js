const asyncHandler = require("express-async-handler");
const bookRequestModel = require("../models/bookrequest.model");

// Create an order
const createnewBookRequest = asyncHandler(async (req, res) => {
  const {userId, fullname , phone , address , title , authorname , condition , status , selectedbookname , selectedbookauthor } = req.body;

  const response = await bookRequestModel.create({
    userId : userId,
    fullname :fullname,
    phone :phone ,
    address : address,
    title: title,
    authorname : authorname,
    condition : condition,
    status : status,
    selectedbookname : selectedbookname,
    selectedbookauthor : selectedbookauthor
  });

  if (response) {
    res.status(201).json({
      message: "Book request send",
      order: response
    });
  } else {
    res.status(403).json("Book could not be created!");
  }
});

// Update order details
const updateRequestDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await bookRequestModel.findById(id);

  if (checkInstance) {
    const response = await bookRequestModel.findByIdAndUpdate(id, { ...req.body }, { new: true }); // Use { new: true } to return the updated document
    if (response) {
      res.status(200).json({
        message: "request updated",
        order: response
      });
    } else {
      res.status(403).json("request status cannot be updated");
    }
  } else {
    res.status(404).json("request does not exist in the database");
  }
});

// Delete an order
const deleteRequest = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const checkInstance = await bookRequestModel.findById(id);

  if (checkInstance) {
    const response = await bookRequestModel.findByIdAndDelete(id);
    if (response) {
      res.status(200).json({
        message: "Request deleted"
      });
    } else {
      res.status(403).json("Book cannot be deleted");
    }
  } else {
    res.status(404).json("Book does not exist in the database");
  }
});

const displayRequestDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const response = await bookRequestModel.findById(id);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "request error" });
  }
});

const getAllRequests = asyncHandler(async (req, res) => {
    const request = await bookRequestModel.find();
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json("No orders found");
    }
  });


// fetch all requests - content curator
const getAllExchangeRequests = asyncHandler(async (req, res) => {
    const request = await bookRequestModel.find();
    if (request) {
      res.status(200).json(request);
    } else {
      res.status(404).json("No orders found");
    }
});


// update request status - content curator
const updateStatus = asyncHandler(async(req,res)=>{
    const id = req.params.id 
    
    // check whether the order is existing for update process
    const checkInstance = await bookRequestModel.findById(id)

    if(checkInstance){
        const newStatus = { status: req.body.reqStatus };
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
    createnewBookRequest,
    updateRequestDetails,
    deleteRequest,
    displayRequestDetails,
    getAllRequests,
    getAllExchangeRequests,
    updateStatus
};
