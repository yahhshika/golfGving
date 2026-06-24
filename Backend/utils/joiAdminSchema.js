const Joi = require("joi");

const adminSchema = Joi.object({
    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .max(128)
        .required(),
    
}).required();

module.exports = {adminSchema};