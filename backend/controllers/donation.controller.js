const donationModel = require("../models/donation.model");
const asyncHandler = require("express-async-handler");

// create a donation
const createDonation = asyncHandler(async (req, res) => {
  const {
    donorId,
    donorName,
    donorPhone,
    donorAddress,
    donationItemCategory,
    donatingItem
  } = req.body;

  const response = await donationModel.create({
    donorId,
    donorName,
    donorPhone,
    donorAddress,
    donationItemCategory,
    donatingItem,
    donationStatus: "Pending"
  });

  if (response) {
    res.status(201).json({
      donationId: response._id,
      donorId: response.donorId,
      donorName: response.donorName
    });
  } else {
    res.status(403).json("donation could not be created!");
  }
});

//fetch all donations
const getAllDonations = asyncHandler(async (req, res) => {
  const response = await donationModel.find({}).sort({ createdAt: -1 });
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(401).json("something went wrong!");
  }
});

// fetch specific donation details
const getDonationDetailsById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const response = await donationModel.findById(id);
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(401).json("something went wrong!");
  }
});

// update donation status
const updateDonationStatus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  // check whether the donation is existing for proceed the update status
  const checkInstance = await donationModel.findById(id);

  if (checkInstance) {
    const response = await donationModel.findByIdAndUpdate(id, { ...req.body });
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(403).json("donation status can not be updated");
    }
  } else {
    res.status(404).json("donation not exist in the database");
  }
});

module.exports = {
  createDonation,
  getAllDonations,
  getDonationDetailsById,
  updateDonationStatus
};
