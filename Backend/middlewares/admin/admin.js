const User = require("../../models/User");
const ExpressError = require("../../utils/ExpressError");
const {adminSchema} = require("../../utils/joiAdminSchema");
module.exports.isAdmin = async(req,res,next)=>{
    try{
        const {userId} = req.data;
        const user = await User.findById(userId);
        if(!user){
            return next(new ExpressError("User not found",404));
        }
        if(user.role !== "admin"){
            return next(new ExpressError("Only admins are allowed", 403));
        }
        next();
    }catch(err){
        next(err);
    }
}

module.exports.validateAdminLoginSchema = (req,res,next)=>{
    const adminCreds = req.body;
    const result = adminSchema.validate(adminCreds);
    if(result.error){
        const errMsg = result.error.details.map(e=>e.message).join(", ");
        throw new ExpressError(errMsg, 400);
    }
    next();
}