const Joi = require("joi");
const validate = require("./validator");

const addItemSchema = Joi.object({
    watchId : Joi.number().required().messages({
        "any.required": "watch is required",
    }),
    watchImage : Joi.string().optional()
})
const updateItemSchema = Joi.object({
    status : Joi.string().required().valid('AVAILABLE','FAILED','SELLING',"SOLD").messages({
        "any.required": "watch is required",
    })
})


exports.validateAddItem = validate(addItemSchema);
exports.validateStatus = validate(updateItemSchema);