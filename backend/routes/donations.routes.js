const express = require("express");
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationDetailsById,
  updateDonationStatus
} = require("../controllers/donation.controller");

router.post("/create-donation", createDonation);
router.get("/display-donations", getAllDonations);
router.get("/display-donation-by-id/:id", getDonationDetailsById);
router.put("/update-donation-status/:id", updateDonationStatus);

module.exports = router;
