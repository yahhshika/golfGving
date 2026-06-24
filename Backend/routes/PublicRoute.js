const express = require("express");
const router = express.Router();
const Winner = require("../models/Winner");
const Company = require("../models/Company");
const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/ExpressError");
const Charity = require("../models/Charity");

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



module.exports = router;