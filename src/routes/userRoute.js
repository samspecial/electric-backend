const express = require("express");
const router = express.Router();
const { getUsers, getUser } = require("../controllers/userController");

router.get("/users", getUsers);
router.get("/user/:id", getUser);

module.exports = router;
