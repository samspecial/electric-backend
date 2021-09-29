const express = require("express");
const router = express.Router();
const { protected } = require("../controllers/protectedController");
const { authCheck } = require("../middlewares/authMiddleware");

router.get("/protected", authCheck, protected);

module.exports = router;
