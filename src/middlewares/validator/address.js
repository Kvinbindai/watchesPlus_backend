const validate = require("./validator");
const Joi = require('joi')

const addAddressSchema = Joi.object({
    province : Joi.string().required().trim().messages({
        "any.required": "province is required",
    }),
    district : Joi.string().required().trim().messages({
        "any.required": "district is required",
    }),
    subDistrict : Joi.string().required().trim().messages({
        "any.required": "subDistrict is required",
    }),
    zipCode : Joi.string().required().trim().messages({
        "any.required": "zipCode is required",
    }),
    inventoryId :Joi.number().required().messages({
        "any.required": "inventoryId is required",
    }),
    referenceNumber :Joi.string().required().messages({
        "any.required": "referenceNumber is required",
    }),
    detail :  Joi.string().required().trim().messages({
        "any.required": "detail is required",
    }),
})


exports.validateAddAddress = validate(addAddressSchema)