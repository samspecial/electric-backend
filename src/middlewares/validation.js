/* eslint-disable consistent-return */
const { body, validationResult } = require("express-validator");

exports.signUpValidator = [
  body("fullname", "Fullname must be 5+ character long").isLength({ min: 5 }),
  body("phoneNumber", "Phone number required").notEmpty().isLength({ min: 11 }).withMessage("Phone number not valid"),
  body("email", "Email required").isEmail().normalizeEmail(),
  body(
    "password",
    "Password should have at least one uppercase, one lowercase, one special character, one digit and minimum of 16"
  ).matches(/^.*(?=.{16,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
];
// new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
exports.signInValidator = [
  body("email").isEmail().normalizeEmail(),
  body(
    "password",
    "Password should have at least one uppercase , one lowercase, one special character, one digit and minimum of 16"
  ).matches(/^.*(?=.{16,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
];

exports.validatorResults = (req, res, next) => {
  const result = validationResult(req);

  try {
    if (result.isEmpty()) {
      next();
    } else {
      const extractedErrors = [];
      result.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

      return res.status(422).json({
        error: Object.values(...extractedErrors).toString()
      });
    }
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};
