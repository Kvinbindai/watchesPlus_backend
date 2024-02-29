const Joi = require("joi");
const validate = require("./validator");

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    "string.empty": "firstname is required",
    "any.required": "firstname is required",
  }),
  lastName: Joi.string().required().trim().messages({
    "string.empty": "lastname is required",
    "any.required": "lastname is required",
  }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-z0-9]{6,}$/)
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters nad contain only alphabet and number",
      "any.required": "password is required",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "confirm password is required",
      "any.only": "password and confirm password must be match",
      "any.required": "confirm password is required",
    })
    .strip(),
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "email is required",
    "any.required": "Invalid email address",
  }),
  role: Joi.string().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "email or mobile is required",
    "any.required": "email or mobile is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "password is required",
    "any.required": "password is required",
  }),
});

const passwordSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "email or mobile is required",
    "any.required": "email or mobile is required",
  }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-z0-9]{6,}$/)
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters nad contain only alphabet and number",
      "any.required": "password is required",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "confirm password is required",
      "any.only": "password and confirm password must be match",
      "any.required": "confirm password is required",
    })
    .strip(),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
exports.validateChangePassword = validate(passwordSchema);
