const Joi = require("joi");
const validate = require("./validator");

const createWatchSchema = Joi.object({
  brandId: Joi.number().required().messages({
    "any.required": "brandId is required",
  }),
  modelName: Joi.string().required().trim().messages({
    "any.required": "modelName is required",
  }),
  movement: Joi.string().required().valid("AUTOMATIC", "QUARTZ").messages({
    "any.required": "movement is required",
  }),
  gender: Joi.string().required().valid("MALE", "FEMALE", "UNISEX").messages({
    "any.required": "gender is required",
  }),
  powerReserve: Joi.string().required().trim().messages({
    "any.required": "powerReserve is required",
  }),
  caseMaterial: Joi.string().required().trim().messages({
    "any.required": "caseMaterial is required",
  }),
  caseDiameter: Joi.string().required().trim().messages({
    "any.required": "caseDiameter is required",
  }),
  crystal: Joi.string().required().trim().messages({
    "any.required": "crystal is required",
  }),
  dial: Joi.string().required().trim().messages({
    "any.required": "dial is required",
  }),
  braceletMaterial: Joi.string().required().trim().messages({
    "any.required": "braceletMaterial is required",
  }),
  braceletColor: Joi.string().required().trim().messages({
    "any.required": "braceletColor is required",
  }),
  description: Joi.string().required().trim().messages({
    "any.required": "description is required",
  }),
});

const updateWatchSchema = Joi.object({
  brandId: Joi.number().optional().messages({
    "any.required": "brandId is required",
  }),
  modelName: Joi.string().optional().trim().messages({
    "any.required": "modelName is required",
  }),
  movement: Joi.string().optional().valid("AUTOMATIC", "QUARTZ").messages({
    "any.required": "movement is required",
  }),
  gender: Joi.string().optional().valid("MALE", "FEMALE", "UNISEX").messages({
    "any.required": "gender is required",
  }),
  powerReserve: Joi.string().optional().trim().messages({
    "any.required": "powerReserve is required",
  }),
  caseMaterial: Joi.string().optional().trim().messages({
    "any.required": "caseMaterial is required",
  }),
  caseDiameter: Joi.string().optional().trim().messages({
    "any.required": "caseDiameter is required",
  }),
  crystal: Joi.string().optional().trim().messages({
    "any.required": "crystal is required",
  }),
  dial: Joi.string().optional().trim().messages({
    "any.required": "dial is required",
  }),
  braceletMaterial: Joi.string().optional().trim().messages({
    "any.required": "braceletMaterial is required",
  }),
  braceletColor: Joi.string().optional().trim().messages({
    "any.required": "braceletColor is required",
  }),
  description: Joi.string().optional().trim().messages({
    "any.required": "description is required",
  }),
});

exports.validateCreateWatch = validate(createWatchSchema);
exports.validateUpdateWatch = validate(updateWatchSchema);
