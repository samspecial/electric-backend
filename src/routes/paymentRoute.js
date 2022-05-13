const express = require("express");
const router = express.Router();
const { chargeCard, otpAuth } = require("../controllers/paymentController");

//Charge card

router.post("/charge", chargeCard);
router.post("/confrim/:otp", otpAuth);
module.exports = router;
