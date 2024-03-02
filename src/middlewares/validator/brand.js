const Joi = require("joi");
const validate = require("./validator");

const addBrandSchema = Joi.object({
    name : Joi.string().required().trim().messages({
        "string.empty": "name is required",
        "any.required": "name is required",
    })
})
const editBrandSchema = Joi.object({
    name : Joi.string().optional().trim()
})

exports.validateAddBrand = validate(addBrandSchema);
exports.validateEditBrand = validate(editBrandSchema);
