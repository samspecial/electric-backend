/* eslint-disable consistent-return */
const { check, validationResult } = require("express-validator");

exports.signUpValidator = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check(
    "password",
    "Password should have at least one uppercase , one lowercase, one special character, one digit and minimum of 16"
  ).matches(/^.*(?=.{16,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
];
exports.signInValidator = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check(
    "password",
    "Password should have at least one uppercase , one lowercase, one special character, one digit and minimum of 16"
  ).matches(/^.*(?=.{16,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
];

exports.validatorResults = (req, res, next) => {
  const result = validationResult(req);
  console.log(result);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({ error: firstError });
  }
  next();
};
