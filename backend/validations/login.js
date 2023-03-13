const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateLoginInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to login a user

const validateLoginInput = [
  (req, res, next) => {
    if (!req.body.email && !req.body.username) {
      const err = new Error('Email or username is required');
      err.statusCode = 400;
      return next(err);
    }
    return next();
  },
  // check('email')
  //   .exists({ checkFalsy: true })
  //   .isEmail()
  //   .withMessage('Email is invalid'),
  // check('username')
  //   .exists({ checkFalsy: true })
  //   .matches(/^[a-zA-Z0-9]*$/)
  //   .isLength({ min: 6, max: 30 })
  //   .withMessage('username is invalid'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6, max: 30 })
    .withMessage('Password must be between 6 and 30 characters'),
  handleValidationErrors
];

module.exports = validateLoginInput;
