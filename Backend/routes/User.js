const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {signUpSchemaValidation, loginSchemaValidation,scoreSchemaValidation, isSubscriber} = require("../middlewares/user/user");
const User = require("../models/User");
const ExpressError = require("../utils/ExpressError");
const asyncWrap = require("../utils/asyncWrap");
const Charity = require("../models/Charity");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {subscriptionSchemaValidate} = require("../middlewares/subscription/subscription");
const Subscription = require("../models/Subscription");
const Company = require("../models/Company");
const { isAdmin } = require("../middlewares/admin/admin");


router.get("/",isAuthenticated,asyncWrap(async(req,res,next)=>{
    const {userId} = req.data;
    const user = await User.findById(userId).select("-password");
    if(!user){
        return next(new ExpressError("User not found!", 404));
    }
    const activeSubs = await Subscription.findOne({userId, status:"active"});
    res.send({user, subscription:activeSubs});
}));

router.post("/signup",signUpSchemaValidation,asyncWrap(async(req,res,next)=>{
    const user = req.body;
    const {email} = user;
    const existingUser = await User.findOne({email});
    if(existingUser){
        return next(new ExpressError("User already exist", 400));
       
    }
    const {password} = user;
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password, salt);

    user.role = "user";
    user.password = hashedPass;
    let newUser = new User(user);
    newUser = await newUser.save();
    const data = {
        userId :newUser._id
    }
    const token = jsonwebtoken.sign(data, process.env.JWT_SECRET);

    const finalUser = newUser.toObject();
    delete finalUser.password;
    res.send({message:"User Signup Successful!", user: finalUser, token:token});

}));

router.post("/login",loginSchemaValidation,asyncWrap(async (req,res,next)=>{
    const user = req.body;
    const {password, email} = user;
    const existingUser = await User.findOne({email});
    if(!existingUser){
        return next(new ExpressError("Invalid Credentials", 400));
    }
    const hashedPass = existingUser.password;
    const isMatch = bcrypt.compareSync(password,hashedPass);
    if(!isMatch){
        return next(new ExpressError("Invalid Credentials", 400));
    }
    const data = {
        userId : existingUser._id
    };
    const token  = jsonwebtoken.sign(data, process.env.JWT_SECRET);
    const finalUser = existingUser.toObject();
    delete finalUser.password;
    res.send({message:"User Login Successful!", user:finalUser, token});
}));


router.put("/charity/:charityName",isAuthenticated,isSubscriber,asyncWrap(async (req,res,next)=>{
    let {charityName} = req.params;
    const {userId} = req.data;
    const subscription = await Subscription.findOne({userId});
    if(subscription && subscription.donationMade){
        return next(new ExpressError("Already donated, new charity addition not allowed.",400));
    }
    const charity = await Charity.findOne({name:charityName});
    if(!charity){
        return next(new ExpressError("Charity not found",404));
    }
    await User.findByIdAndUpdate(userId,{charityId:charity._id},{new:true, runValidators:true});
    const amount = subscription.amount;
    const charityPercentage = subscription.charityPercentage;
    const donationAmt = (charityPercentage/100)*amount;
    charity.totalDonation += donationAmt;
    await charity.save();
    subscription.donationMade = true;
    await subscription.save();
    res.send({message:"Charity Added"});
}));

// {userId, plan, amount, startDate, expiryDate, status, charityPercentage};
//new subscription
router.post("/subscription",isAuthenticated,subscriptionSchemaValidate,asyncWrap(async(req,res,next)=>{
    const {userId} = req.data;
    
    const existingSub = await Subscription.findOne({userId, status:"active"});
    if(existingSub){
        return next(new ExpressError("Already have an existing subscription",400));
    }
    const user = await User.findById(userId);
    if(!user){
        return next(new ExpressError("User not found", 404));
    }
    
  
    let {plan, charityPercentage} = req.body;
    let expiryDate = new Date();
    if(plan === "monthly"){
        expiryDate.setMonth(expiryDate.getMonth()+1);
    }else{
        expiryDate.setFullYear(expiryDate.getFullYear()+1);
    }
    charityPercentage= (charityPercentage)?charityPercentage:10;
    const amount= (plan==="monthly")?1000:10000;
    const subscriptionData = {
        userId,
        plan, 
        amount,
        expiryDate,
        status:"active",
        charityPercentage
        
    }
    const newSubscription = new Subscription(subscriptionData);
    const finalSubs = await newSubscription.save();
    user.role = "subscriber";
    await user.save();
    // updating company : 
    // division formula. 
    const diff = charityPercentage - 10;
    const reduction = diff/2;
    const poolPrizePct = 30- reduction;
    const companyPct = 60 - reduction;

    const poolPrizeVal = Number(((poolPrizePct/100)*amount).toFixed(1));
    const companyAmt = Number(((companyPct/100)*amount).toFixed(1));
    const charityAmt = Number(((charityPercentage/100)*amount).toFixed(1));
    const company = await Company.findOne({});
    // {companyProfit, totalRevenue, totalDonations, totalPrizePool}
    company.companyProfit += companyAmt;
    company.totalRevenue += amount;
    company.totalDonations += charityAmt;
    company.totalPrizePool += poolPrizeVal; 
    await company.save();
    res.send({subscription: finalSubs});
}));

//fetch all the subscriptions made till now, that is cancelled, lapsed, active ones. 
router.get("/subscription", isAuthenticated, asyncWrap(async(req,res,next)=>{
    const {userId }= req.data;
    const allSubscription = await Subscription.find({userId});
    if(allSubscription.length===0){
        res.send("No subscriptions");
    }
    res.send({subscriptions: allSubscription});
}));

router.delete("/subscription",isAuthenticated,isSubscriber,asyncWrap(async(req,res,next)=>{
    const {userId} = req.data;
    const user = await User.findById(userId);
    if(!user){
        return next(new ExpressError("user not found, kindly login.",400));
    }
    const subscription = await Subscription.findOne({userId, status:"active"});
    if(!subscription){
        return next(new ExpressError("Subscription not found.", 404));
    }
    subscription.status = "cancelled";
    await subscription.save();
    user.role = "user";
    await user.save();
    res.send({message: "Subscription cancelled!"});
 
}));




router.put("/score",isAuthenticated,isSubscriber,scoreSchemaValidation,asyncWrap(async(req,res,next)=>{
    const {score} = req.body;
    const {userId} = req.data;
    const user = await User.findById(userId);
    if(!user){
        return next(new ExpressError("Kindly login/signup", 404));
    }
    const today = new Date().toDateString();
    if(user.scores && user.scores.length>0 && new Date(user.scores[user.scores.length-1].date).toDateString() === today){
        return next(new ExpressError("Today's score was already added!", 400));
    }
    const scoreData = {
        score, 
        date: new Date()
    };
    user.scores.push(scoreData);

    if(user.scores.length>5){
        user.scores = user.scores.slice(-5);
    }
    await user.save();
    res.send({message:"Score added!", scores:user.scores});

}));

router.put("/score/:scoreId", isAuthenticated, isSubscriber,scoreSchemaValidation, asyncWrap(async(req,res,next)=>{
    const {score} = req.body;
    const {userId} = req.data;
    
    const {scoreId} = req.params;
    const user = await User.findById(userId);
    if(!user){
        return next(new ExpressError("User not found!", 404));
    }
    let targetScore = user.scores.id(scoreId);
    if(!targetScore){
        return next(new ExpressError("Score not found!",400));
    }
    targetScore.score = score;
    await user.save();
    res.send({message:"Score Edit Successful", scores:user.scores});
}));


module.exports = router;