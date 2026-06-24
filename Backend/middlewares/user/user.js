const {userLoginSchema, userSignUpSchema} = require("../../utils/joiUserSchema");
const ExpressError = require("../../utils/ExpressError");
const scoreSchema = require("../../utils/joiScoreSchema");
const Subscription = require("../../models/Subscription");
const User = require("../../models/User");

module.exports.signUpSchemaValidation = (req,res,next)=>{
    const userCreds = req.body;
    const result = userSignUpSchema.validate(userCreds);
    if(result.error){
        let errMsg = result.error.details.map(e=>e.message).join(", ");
        throw new ExpressError(errMsg,400);
        return;
    }
    next();
}

module.exports.loginSchemaValidation = (req,res,next)=>{
    const userCreds = req.body;
    const result = userLoginSchema.validate(userCreds);
    if(result.error){
        let errMsg = result.error.details.map(e=>e.message).join(", ");
        throw new ExpressError(errMsg,400);
        return;
    }
    next();
}

module.exports.scoreSchemaValidation = (req,res,next)=>{
    const scoreData = req.body;
    const result = scoreSchema.validate(scoreData);
    if(result.error){
        const errMsg = result.error.details.map(e=>e.message).join(", ");
        throw new ExpressError(errMsg,400);
        return;
    }
    next();
}

module.exports.isSubscriber = async(req,res,next)=>{
    try{

        const {userId} = req.data;
        const user = await User.findById(userId);
        if(!user){
            return next(new ExpressError("user not found!", 404));
        }
        if(user.role!=="subscriber"){
            return next(new ExpressError("you need to subcribe first to gain access", 403));
        }
        next();
    }catch(err){
        next(err);
    }
}
