const Joi = require("joi");

const userSignUpSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .max(128)
        .required(),

    charityId: Joi.string()
        .hex()
        .length(24)
        .optional()
}).required();

const userLoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()
}).required();

module.exports = {userLoginSchema, userSignUpSchema};