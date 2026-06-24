const ExpressError = require("../../../utils/ExpressError");
const {charitySchema} = require("../../../utils/joiCharitySchema");

module.exports.charitySchemaValidation = (req,res,next)=>{
    const charityCreds = req.body;
    const result = charitySchema.validate(charityCreds);
    if(result.error){
        const errMsg = result.error.details.map(e=>e.message).join(", ");
        throw new ExpressError(errMsg, 400);
    }
    next();
}