const express = require("express");
const AdController = require("../controllers/exchangead_controller");

const router = express.Router();

router.post('/createAd', AdController.createAd);
router.get('/displayAds', AdController.displayAds);
router.put('/updateAd/:id', AdController.updateAd);
router.delete('/deleteAd/:id', AdController.deleteAd);

module.exports = router;