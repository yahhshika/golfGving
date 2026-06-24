const Joi = require("joi");

const charitySchema = Joi.object({
    name: Joi.string()
        .trim()
        .required(),

    description: Joi.string()
        .trim()
        .allow("")
        .optional(),

    image: Joi.string()
        .uri()
        .allow("")
        .optional(),

    totalDonation: Joi.number()
        .min(0)
        .optional()
});


module.exports = {charitySchema};