const express = require("express");
const router = express.Router();
const Winner = require("../models/Winner");
const Company = require("../models/Company");
const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/ExpressError");
const Charity = require("../models/Charity");
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");


router.get("/winners",asyncWrap(async(req,res,next)=>{
    const company = await Company.findOne({});
    const latestPublishedDrawId = company.lastPublishedDraw;
    if(!latestPublishedDrawId){
        return next(new ExpressError("No winners found, wait for a draw to be conducted.", 404));
    }
    const winners = await Winner.find({drawId:latestPublishedDrawId});
    res.send({winners});
}));
router.get("/charities",asyncWrap(async(req,res,next)=>{
    const charities = await Charity.find({});
    res.send({charities});
}));

router.get("/user",isAuthenticated,asyncWrap(async(req,res,next)=>{
    const {userId} = req.data;
    const user = await User.findById(userId);
    if(!user){
        return next(new ExpressError("no user found", 404));
    }
    res.send({user});
}))



module.exports = router;