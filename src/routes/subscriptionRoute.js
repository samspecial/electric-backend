const express = require("express");
const router = express.Router();
const { createBenefit, createPlan, getPlans } = require("../controllers/subscriptionController");

router.post("/benefit", createBenefit);
router.post("/plan", createPlan);
router.get("/plans", getPlans);

module.exports = router;
