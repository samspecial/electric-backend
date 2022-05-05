const { user } = require("../models");
require("dotenv").config();

//  @ method GET
//  @ desc User details retrieval
exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll();
    return res.status(200).json({ status: "success", data: users });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//  @ method GET
//  @ desc User details retrieval
exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const loggedInUser = await user.findOne({ where: { uuid: id } });
    return res.status(200).json({ status: "success", data: loggedInUser });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//  @ method POST
//  @ desc User authentication using GOOGLE
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await user.findOne({ where: { email } });
    if (!currentUser || !(await bcrypt.compare(password, currentUser.password))) {
      return res.status(401).json({ status: "error", message: "Incorrect email or password" });
    }
    const payload = {
      id: currentUser.uuid,
      role: currentUser.role,
      fullname: currentUser.fullname,
      email: currentUser.email
    };

    req.session.user = payload;

    return res.status(200).json({ status: "success", user: payload });
  } catch (error) {
    res.status(500).json({ error: "status", message: "Something went wrong" });
  }
};

// exports.logout = async (req, res) => {
