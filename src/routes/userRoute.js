const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { validatorResults, signUpValidator } = require("../middlewares/validation");

router.post("/signup", validatorResults, signUpValidator, createUser);

module.exports = router;
