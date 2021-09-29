const express = require("express");
const router = express.Router();
const { createUser, signin, confirmEmail } = require("../controllers/authController");
const { validatorResults, signUpValidator, signInValidator } = require("../middlewares/validation");

router.post("/signup", signUpValidator, validatorResults, createUser);
router.get("/activate/:token", confirmEmail);
router.post("/signin", signInValidator, validatorResults, signin);

module.exports = router;
