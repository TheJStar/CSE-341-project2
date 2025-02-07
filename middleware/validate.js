const { body, param, validationResult } = require("express-validator");

const validator = require('../helper/validate');

// validatorjs

const saveContact = (req, res, next) => {
    const validationRule = {
      firstName: 'required|string',
      lastName: 'required|string',
      email: 'required|email',
      favoriteColor: 'required|string',
      birthday: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
};

const saveEmployee = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'string',
    department: 'required|string',
    position: 'required|string',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// Express-Validator

// firstName: req.body.firstName,
// lastName: req.body.lastName,
// email: req.body.email,
// favoriteColor: req.body.favoriteColor,
// birthday: req.body.birthday
const userValidator = () => {
    return [
        body("firstName"),
        body("lastName"),
        body("email").isEmail().withMessage("This is not an email"),
        body("favoriteColor"),
        body("birthday"),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        return next()
    }
    const errorList = []
    console.log(errors);
    
    errors.array().map(err => {errorList.push({ [err.path]: err.msg})})

    return res.status(422).json({
        errors: errorList,
    })
}

module.exports = {
    saveContact,
    saveEmployee,
    // Express-validator
    userValidator,
    validate,
};