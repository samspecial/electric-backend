const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { user, otp } = require("../models");
const { sendEmail } = require("../helpers/emailSender");
const { createTrial } = require("../helpers/emailSender");
const { generateCode, decryptCode } = require("../helpers/generatePassphrase");
require("dotenv").config();

const { ACTIVATION_TOKEN, ACCESS_TOKEN_SECRET, JWT_TIMEOUT, CLIENT_URL } = process.env;

const createActivationToken = (payload) => {
  return jwt.sign(payload, ACTIVATION_TOKEN, { expiresIn: JWT_TIMEOUT });
};

const createToken = (payload) => jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: JWT_TIMEOUT });
//  @ method POST
//  @ desc User registration
exports.createUser = async (req, res) => {
  try {
    const { fullname, phoneNumber, email, password, role } = req.body;

    const currentUser = await user.findOne({ where: { email } });
    if (currentUser) return res.status(401).json({ error: "User already exist" });
    const hashPassword = await bcrypt.hash(password, 12);
    const userObj = {
      fullname,
      phoneNumber,
      email,
      password: hashPassword,
      role: role.toLowerCase()
    };
    if (userObj.role !== "customer") {
      const newUser = await user.create(userObj);
      // newUser.save();
      return res.status(201).json({
        status: "success",
        message: "user created",
        data: {
          user: newUser
        }
      });
    } else {
      // const activationToken = createActivationToken(userObj);
      const message = crypto.randomInt(100000, 999999).toString();
      const verificationCode = await bcrypt.hash(message, 12);

      //const url = `${CLIENT_URL}api/auth/activate/${activationToken}`;
      await otp.create({ code: verificationCode, status: "ACTIVE" });

      const msg = {
        to: email, // Change to your recipient
        from: "psalmueloye@gmail.com", // Change to your verified sender
        subject: "Electric Rescue Account Confirmation",
        html: `<h3>Hello ${fullname.split(" ")[0]}</h3>
        <p>We are excited to have you here.</p>
        <p>Kindly follow the link below to activate your account</p>
        <p>This expires in 2 hour time. Here is your ${message} code to get started. </p>`
      };

      sendEmail(msg);

      return res.status(200).json({
        status: "success",
        message: "Please confirm your email",
        data: { ...userObj, token: verificationCode }
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error || "Server error" });
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const { token, fullname, phoneNumber, email, password, role, otpString } = req.body;
    // const decodeUser = jwt.verify(token, ACTIVATION_TOKEN);

    const fetchCode = await otp.findOne({ where: { code: token } });
    if (!fetchCode) return res.status(403).json({ error: "Unathourized" });
    const isCodeMatch = await bcrypt.compare(otpString, fetchCode.code);
    if (!isCodeMatch) return res.status(400).json({ error: "Mismatch verification code" });

    const createdTime = new Date().getTime(fetchCode.createdAt);
    const currentTime = new Date().getTime();
    const isExpired = Math.abs((createdTime - currentTime) / 1000);
    const isTime = 2 * 1000 * 60 * 60;
    if (isExpired > +isTime) {
      await otp.destroy({ where: { code: token } });
      return res.status(400).json({ error: "Token already expired" });
    }

    fetchCode.status = "Expired";
    fetchCode.save();
    const userObj = {
      fullname,
      phoneNumber,
      email,
      password,
      role
    };
    const newUser = await user.create(userObj);
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
    if (!currentUser || !(await bcrypt.compare(password, currentUser.password))) {
      return res.status(401).json({ status: "error", message: "Incorrect email or password" });
    }

    const payload = {
      id: currentUser.uuid,
      role: currentUser.role
    };

    req.session.user = payload;

    return res.status(200).json({ status: "success", user: payload });
  } catch (error) {
    res.status(500).json({ error: "status", message: "Something went wrong" });
  }
};

// exports.logout = async (req, res) => {

// }
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
