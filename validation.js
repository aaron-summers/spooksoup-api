const Joi = require("@hapi/joi");

//user validation
const signupValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .required(),
    email: Joi.string()
      .email()
      .min(6)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(2)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  });
  return schema.validate(data);
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;