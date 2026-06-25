const express = require("express");
const router = express.Router();
const Winner = require("../models/Winner");
const Company = require("../models/Company");
const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/ExpressError");
const Charity = require("../models/Charity");
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");
const Draw = require("../models/Draw");

router.get("/winners",asyncWrap(async(req,res,next)=>{
    const company = await Company.findOne({});
    const latestPublishedDrawId = company.lastPublishedDraw;
    if(!latestPublishedDrawId){
        return next(new ExpressError("No winners found, wait for a draw to be conducted.", 404));
    }
    const winners = await Winner.find({drawId:latestPublishedDrawId}).populate({
        path: "userId",
        select: "-password",
    });
    res.send({winners});
}));
router.get("/charities",asyncWrap(async(req,res,next)=>{
    const charities = await Charity.find({});
    res.send({charities});
}));

router.get("/draw",asyncWrap(async(req,res,next)=>{
    const company = await Company.findOne({});
    const latestDrawId = company.lastUnPublishedDraw || company.lastPublishedDraw;
  
    if(!latestDrawId){
        return next(new ExpressError("No Published Draw Found", 404));
    };
    const draw = await Draw.findById(latestDrawId);
    res.send({draw});

}))

router.get("/user",isAuthenticated,asyncWrap(async(req,res,next)=>{
    const {userId} = req.data;
    const user = await User.findById(userId);
    if(!user){
        return next(new ExpressError("no user found", 404));
    }
    res.send({user});
}))

router.get("/logout",(req,res,next)=>{
    try{
        res.clearCookie("token");
        res.send({message:"Logout Successful!"});

    }catch(err){
        next(err);
    }
})



module.exports = router;