const jsonwebtoken = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");


module.exports = (req,res,next)=>{
    const token = req.cookies?.token || req.headers?.token;
    if(!token){
        throw new ExpressError("Kindly login/signup", 400);
    }
    try{
        const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.data = data;
        next();
    }catch(error){
        next(error);
    }
}