const ExpressError = require("../../utils/ExpressError");
const {subscriptionSchema} = require("../../utils/joiSubscriptionSchema");

module.exports.subscriptionSchemaValidate = (req,res,next)=>{
    const subscription = req.body;
    const result = subscriptionSchema.validate(subscription);
    if(result.error){
        const errMsg = result.error.details.map(e=>e.message).join(", ");
        throw new ExpressError(errMsg, 400);
    }
    next();
}