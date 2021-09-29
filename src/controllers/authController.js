const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { user } = require("../models");
const { sendEmail } = require("../helpers/emailSender");
require("dotenv").config();

const { ACTIVATION_TOKEN_SECRET, ACCESS_TOKEN_SECRET, JWT_TIMEOUT, CLIENT_URL } = process.env;

const createToken = (payload) => {
  return jwt.sign(payload, ACTIVATION_TOKEN_SECRET, { expiresIn: JWT_TIMEOUT });
};
//  @ method POST
//  @ desc User registration
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const currentUser = await user.findOne({ where: { email } });
    if (currentUser) return res.status(401).json({ error: "User already exist" });
    const hashPassword = await bcrypt.hash(password, 12);
    const userObj = {
      firstname,
      lastname,
      email,
      password: hashPassword
    };

    const activationToken = createToken(userObj);

    const url = `${CLIENT_URL}/api/auth/activate/${activationToken}`;
    const msg = {
      to: email, // Change to your recipient
      from: "psalmueloye@gmail.com", // Change to your verified sender
      subject: "Account activation required",
      html: `<h3>Hello ${firstname}</h3>
      <p>We are excited to have you here.</p>
      <p>Kindly follow the link below to activate your account</p>
      <p>This expires in 1 hour time. Click <a href=${url}>here</a> now.</p>`
    };

    sendEmail(msg);
    return res.status(200).json({ status: "success", message: "Please confirm your email" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decodeUser = jwt.verify(token, ACTIVATION_TOKEN_SECRET);
    if (!decodeUser) return res.status(403).json({ error: "unauthorized access token" });
    const newUser = await user.create(decodeUser);
    newUser.save();
    return res.status(201).json({
      status: "success",
      message: "user created",
      data: {
        user: newUser
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

//  @ method POST
//  @ desc User authentication using GOOGLE
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const currentUser = await user.findOne({ where: { email } });
    if (!currentUser || !(await bcrypt.compare(password, currentUser.password)))
      return res.status(401).json({ error: "Incorrect email or password" });
    const payload = {
      id: currentUser.uuid,
      email: currentUser.email,
      role: currentUser.role
    };
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: JWT_TIMEOUT });
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

// const JWT = require("jsonwebtoken");
// const User = require("../models/User.model");
// const Token = require("../models/Token.model");
// const sendEmail = require("../utils/email/sendEmail");
// const crypto = require("crypto");
// const bcrypt = require("bcrypt");

// const JWTSecret = process.env.JWT_SECRET;
// const bcryptSalt = process.env.BCRYPT_SALT;
// const clientURL = process.env.CLIENT_URL;

// const requestPasswordReset = async (req, res) => {
//   const { email } = req.body;
//   const findUserWithEmail = await user.findOne({ email });
//   if (!findUserWithEmail) res.status(401).json({ error: "Email does not exist" });

//   let token = await Token.findOne({ userId: user._id });
//   if (token) await token.deleteOne();

//   let resetToken = crypto.randomBytes(32).toString("hex");
//   const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

//   await new Token({
//     userId: user._id,
//     token: hash,
//     createdAt: Date.now()
//   }).save();

//   const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

//   sendEmail(
//     user.email,
//     "Password Reset Request",
//     {
//       name: user.name,
//       link: link
//     },
//     "./template/requestResetPassword.handlebars"
//   );
//   return link;
// };

// const resetPassword = async (userId, token, password) => {
//   let passwordResetToken = await Token.findOne({ userId });

//   if (!passwordResetToken) {
//     throw new Error("Invalid or expired password reset token");
//   }

//   const isValid = await bcrypt.compare(token, passwordResetToken.token);

//   if (!isValid) {
//     throw new Error("Invalid or expired password reset token");
//   }

//   const hash = await bcrypt.hash(password, Number(bcryptSalt));

//   await User.updateOne({ _id: userId }, { $set: { password: hash } }, { new: true });

//   const user = await User.findById({ _id: userId });

//   sendEmail(
//     user.email,
//     "Password Reset Successfully",
//     {
//       name: user.name
//     },
//     "./template/resetPassword.handlebars"
//   );

//   await passwordResetToken.deleteOne();

//   return true;
// };

// module.exports = {
//   signup,
//   requestPasswordReset,
//   resetPassword
// };
