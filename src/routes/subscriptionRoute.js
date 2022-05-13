const express = require("express");
const router = express.Router();
const {
  createBenefit,
  createPlan,
  getPlans,
  createSubscription,
  getSubscriptions,
  getAllSubscriptions,
  deleteBenefit,
  updateBenefit,
  getBenefits,
  chargeCard,
  deletePlan
} = require("../controllers/subscriptionController");
const { authAdminCheck, authCheck } = require("../middlewares/authMiddleware");

//Benefit

router.post("/benefit", authAdminCheck, createBenefit);
router.delete("/benefit/:id", authAdminCheck, deleteBenefit);
router.put("/benefit/:id", authAdminCheck, updateBenefit);

router.get("/benefits", authAdminCheck, getBenefits);

router.post("/plan", authAdminCheck, createPlan);

//subscription
router.post("/subscription", authCheck, createSubscription);
router.get("/allsubscriptions", authAdminCheck, getAllSubscriptions);
router.get("/subscriptions", authCheck, getSubscriptions);

//plans
router.get("/plans", getPlans);
router.delete("/plan/:id", authAdminCheck, deletePlan);

//Charge card

module.exports = router;
