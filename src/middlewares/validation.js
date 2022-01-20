/* eslint-disable consistent-return */
const { check, validationResult } = require("express-validator");

exports.signUpValidator = [
  check("email").isEmail(),
  check(
    "password",
    "Password should have at least one uppercase, one lowercase, one special character, one digit and minimum of 16"
  ).matches(/^.*(?=.{16,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
];
// new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
exports.signInValidator = [
  check("email").isEmail(),
  check(
    "password",
    "Password should have at least one uppercase , one lowercase, one special character, one digit and minimum of 16"
  ).matches(/^.*(?=.{16,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
];

exports.validatorResults = (req, res, next) => {
  const result = validationResult(req);
  try {
    if (result.isEmpty()) {
      next();
    }
  } catch (error) {
    const extractedErrors = [];
    result.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    res.status(422).json({
      errors: extractedErrors
    });
  }
};
