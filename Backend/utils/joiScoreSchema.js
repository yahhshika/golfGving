const Joi = require("joi");

const scoreSchema = Joi.object({
    score: Joi.number().min(1).max(45).required()
}).required();

module.exports = scoreSchema;