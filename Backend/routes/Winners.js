const express = require("express");
const router = express.Router();
const Winner = require("../models/Winner");
const Company = require("../models/Company");
const asyncWrap = require("../utils/asyncWrap");


router.get("/latestWinners",asyncWrap(async(req,res,next)=>{
    const company = await Company.findOne({});
    const latestPublishedDrawId = company.lastPublishedDraw;
    const winners = await Winner.find({drawId:latestPublishedDrawId});
    res.send({winners});
}));
module.exports = router;