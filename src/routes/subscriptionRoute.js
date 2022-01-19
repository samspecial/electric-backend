const express = require("express");
const router = express.Router();
const { createBenefit } = require("../controllers/subscriptionController");

router.post("/benefit", createBenefit);

module.exports = router;
