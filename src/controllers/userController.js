const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../models");

//  @ method POST
//  @ desc User registration
exports.createUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const currentUser = await User.
};
