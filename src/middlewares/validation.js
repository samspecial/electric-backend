/* eslint-disable consistent-return */
const { check, validationResult } = require("express-validator");

exports.signUpValidator = [
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("firstName", "Firstname field can not be less than 4 characters").isLength({ min: 4 }),
  check("lastName", "Lastname field can not be less than 4 characters").isLength({ min: 4 }),
  check(
    "password",
    "Password should have at least one uppercase , one lowercase, one special character, one digit and minimum of 8"
  ).matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/)
];

exports.validatorResults = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({ error: firstError });
  }
  next();
};
