const Joi = require("joi");

const subscriptionSchema = Joi.object({
    plan: Joi.string()
        .valid("monthly", "yearly")
        .required(),

    charityPercentage: Joi.number()
        .min(10)
        .max(30)
      
}).required();


module.exports = {subscriptionSchema};