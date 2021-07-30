const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { user } = require("../models");

require("dotenv").config();

const { SECRET, JWT_TIMEOUT } = process.env;
//  @ method POST
//  @ desc User registration
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    console.log(req.body);
    const currentUser = await user.findOne({ where: { email } });
    if (currentUser) return res.status(401).json({ error: "User already exist" });
    const hashPassword = await bcrypt.hash(password, 12);
    const userObj = {
      firstname,
      lastname,
      email,
      password: hashPassword
    };
    console.log(userObj);
    const newUser = await user.create(userObj);
    console.log("UUID: ", newUser.uuid);
    const payload = {
      uuid: newUser.uuid,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    };
    const token = jwt.sign(payload, SECRET, { expiresIn: JWT_TIMEOUT });
    newUser.save();
    return res.status(200).json({ token, message: "Account creation successful" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
