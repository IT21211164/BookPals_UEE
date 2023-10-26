const adModel = require('../models/exchangeAd')
const asyncHandler = require('express-async-handler')

const createAd = asyncHandler( async(req,res) => {

    const {title ,category, condition ,selectedImage, des, termsandconditions} = req.body

    const response = await adModel.create({
        book_title: title,
        category: category,
        condition: condition,
        image: selectedImage,
        description: des,
        terms_and_conditions: termsandconditions
    })

    if(response){
        res.status(201).json({
            id: response._id,
        })
    }
    else{
        res.status(403).json('ad could not be created!')
    }
})


// read all
const displayAds = asyncHandler(async(req,res)=>{

    const response = await adModel.find();
    if(response){
        res.status(200).json(response)
    }
    else{
        res.status(401).json('something is wrong orders can not fetch')
    }
})



// update 
const updateAd = asyncHandler(async(req,res)=>{
    const id = req.params.id 
    
    // check whether the order is existing for update process
    const checkInstance = await adModel.findById(id)

    if(checkInstance){
        const response = await adModel.findByIdAndUpdate(id, {...req.body})
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

// delete
const deleteAd = asyncHandler(async(req,res)=>{
    const id = req.params.id 
    const response = await adModel.findByIdAndDelete(id)
    if(response){
        res.status(202).json(response)
    }
    else{
        res.status(400).json({error: 'record deleted'})
    }
})


module.exports = {
    createAd,
    displayAds,
    updateAd,
    deleteAd
}