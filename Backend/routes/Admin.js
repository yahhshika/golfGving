const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Draw = require("../models/Draw");
const Winner = require("../models/Winner");
const Company = require("../models/Company");
const Charity = require("../models/Charity");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {isAdmin, validateAdminLoginSchema} = require("../middlewares/admin/admin");
const jsonwebtoken = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");
const bcrypt = require("bcrypt");
const asyncWrap = require("../utils/asyncWrap");
const {charitySchemaValidation} = require("../middlewares/admin/charity/charity");

function getWeightedRandom(freq){
    const entries = Object.entries(freq);

    const totalWeight = entries.reduce(
        (sum,[_,weight]) => sum + weight,
        0
    );

    let random = Math.random() * totalWeight;

    for(const [score, weight] of entries){
        random -= weight;

        if(random <= 0){
            return Number(score);
        }
    }
}

router.get("/",isAuthenticated, isAdmin,asyncWrap(async(req,res,next)=>{
    const {userId} = req.data;
    const admin = await User.findById(userId);
    res.send({admin});
}))
router.post("/login",validateAdminLoginSchema, asyncWrap(async(req,res,next)=>{
    const {email, password} = req.body;
    const existingAdmin = await User.findOne({email, role:"admin"});
    if(!existingAdmin){
        return next(new ExpressError("User not found", 404));
    }
    const hashPass = existingAdmin.password;
    const isMatch = bcrypt.compareSync(password, hashPass);
    if(!isMatch){
        return next(new ExpressError("invalid credentials", 400));
    }
    const data = {
        userId: existingAdmin._id
    }
    const token = jsonwebtoken.sign(data, process.env.JWT_SECRET);
    const finalAdminData = existingAdmin.toObject();
    delete finalAdminData.password;
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.send({message:"login successful", user:finalAdminData, token});
}));

router.post("/draw/random",isAuthenticated, isAdmin, asyncWrap(async(req,res,next)=>{
    const company = await Company.findOne({});
    const jackPotAmount = company.totalPrizePool;
    if(jackPotAmount===0){
        return next(new ExpressError("no subscribers, thus draw failed",409));
    }
    if(company.lastUnPublishedDraw){
        const unpublishedDraw = await Draw.findById(company.lastUnPublishedDraw);
        unpublishedDraw.status = "discarded";
        await unpublishedDraw.save();
    }
    const draw = new Set();
    while(draw.size<5){
        draw.add(Math.floor(Math.random()*45) + 1);
    }
    const drawArr = [...draw];
    const drawDocument = new Draw({
        type:"random",
        numbers:drawArr,
        jackPotAmount, 
        status:"simulation"
    });
    // await drawDocument.save();
    let match5 = 0;
    let match4 = 0;
    let match3 = 0;
    const users = await User.find({role:"subscriber"});
    const winners = [];
    for(let user of users){
        if(user.scores.length <3){
            continue;
        }
        const uniqueScores = new Set(
            user.scores.map(s => s.score)
        );
        let matches = 0;
        for(let score of uniqueScores){
            if(draw.has(score)){
                matches++;
            }
        }
        if(matches === 3){
            match3++;
            const winnerData = {
                userId: user._id,
                drawId: drawDocument._id, 
                matchType:"3-match",
            }
            winners.push(winnerData);
            continue;
        }
        if(matches === 4){
            match4++;
            const winnerData = {
                userId: user._id,
                drawId: drawDocument._id, 
                matchType:"4-match",
            }
            winners.push(winnerData);
            continue;
        }
        if(matches === 5){
            match5++;
            const winnerData = {
                userId: user._id,
                drawId: drawDocument._id, 
                matchType:"5-match",
            }
            winners.push(winnerData);
            continue;
        }
    }
    let poolShare5Match = (0.4*jackPotAmount);
    poolShare5Match = (match5 !== 0)? poolShare5Match/match5 : poolShare5Match;
    let poolShare4Match = (0.35*jackPotAmount);
    poolShare4Match = (match4 !== 0)? poolShare4Match/match4 : poolShare4Match;
    let poolShare3Match = (0.25*jackPotAmount);
    poolShare3Match = (match3 !== 0)? poolShare3Match/match3 : poolShare3Match;

    for(let winner of winners){
        if(winner.matchType === "5-match"){
            winner.prizeAmount = poolShare5Match;
        }else if(winner.matchType === "4-match"){
            winner.prizeAmount = poolShare4Match;
        }else{
            winner.prizeAmount = poolShare3Match;
        }
    }

    if(winners.length > 0){
        // const addedwinners = await Winner.insertMany(winners);
        drawDocument.tempwinners = winners;
    }
    // drawDocument.status = "published";
    drawDocument.match3Count = match3;
    drawDocument.match4Count = match4;
    drawDocument.match5Count = match5;
    await drawDocument.save();
    company.lastUnPublishedDraw = drawDocument._id;
    await company.save();
    console.log("winners:");
    console.log(winners);
    console.log("drawArr");
    console.log(drawArr);
    const rollOverAmount = (match5===0)?0.4*jackPotAmount:0;    
    res.send({message:"draw creation successful",winners,match3,match4,match5,poolShare3Match,poolShare4Match,poolShare5Match, rollOverAmount,draw:drawArr});
}));


router.post("/draw/algorithm",isAuthenticated, isAdmin, asyncWrap(async(req,res,next)=>{
    const company = await Company.findOne({});
    const jackPotAmount = company.totalPrizePool;
    if(jackPotAmount===0){
        return next(new ExpressError("no subscribers, thus draw failed",409));
    }
    if(company.lastUnPublishedDraw){
        const unpublishedDraw = await Draw.findById(company.lastUnPublishedDraw);
        unpublishedDraw.status = "discarded";
        await unpublishedDraw.save();
    }
    const users = await User.find({role:"subscriber"});
    const freq = {};

    for(const user of users){
        for(const scoreData of user.scores){
            freq[scoreData.score] = (freq[scoreData.score] || 0) + 1;
        }
    }
    const draw = new Set();
    // weighted random selection based on frequency of scores
    while(draw.size < 5 && Object.keys(freq).length > 0){
        const score = getWeightedRandom(freq);
        draw.add(score);
        delete freq[score];
    };

    // completion of draw randomly if freq dint have atleast 5 unique numbers.
    while(draw.size < 5){
        draw.add(
            Math.floor(Math.random()*45)+1
        );
    };
    const drawArr = [...draw];
    const drawDocument = new Draw({
        type:"algorithm",
        numbers:drawArr,
        jackPotAmount, 
        status:"simulation"
    });
    // await drawDocument.save();
    let match5 = 0;
    let match4 = 0;
    let match3 = 0;
    const winners = [];
    for(let user of users){
        if(user.scores.length <3){
            continue;
        }
        const uniqueScores = new Set(
            user.scores.map(s => s.score)
        );
        let matches = 0;
        for(let score of uniqueScores){
            if(draw.has(score)){
                matches++;
            }
        }
        if(matches === 3){
            match3++;
            const winnerData = {
                userId: user._id,
                drawId: drawDocument._id, 
                matchType:"3-match",
            }
            winners.push(winnerData);
            continue;
        }
        if(matches === 4){
            match4++;
            const winnerData = {
                userId: user._id,
                drawId: drawDocument._id, 
                matchType:"4-match",
            }
            winners.push(winnerData);
            continue;
        }
        if(matches === 5){
            match5++;
            const winnerData = {
                userId: user._id,
                drawId: drawDocument._id, 
                matchType:"5-match",
            }
            winners.push(winnerData);
            continue;
        }
    }
    let poolShare5Match = (0.4*jackPotAmount);
    poolShare5Match = (match5 !== 0)? poolShare5Match/match5 : poolShare5Match;
    let poolShare4Match = (0.35*jackPotAmount);
    poolShare4Match = (match4 !== 0)? poolShare4Match/match4 : poolShare4Match;
    let poolShare3Match = (0.25*jackPotAmount);
    poolShare3Match = (match3 !== 0)? poolShare3Match/match3 : poolShare3Match;

    for(let winner of winners){
        if(winner.matchType === "5-match"){
            winner.prizeAmount = poolShare5Match;
        }else if(winner.matchType === "4-match"){
            winner.prizeAmount = poolShare4Match;
        }else{
            winner.prizeAmount = poolShare3Match;
        }
    }

    if(winners.length > 0){
        // const addedwinners = await Winner.insertMany(winners);
        drawDocument.tempwinners = winners;
    }
    // drawDocument.status = "published";
    drawDocument.match3Count = match3;
    drawDocument.match4Count = match4;
    drawDocument.match5Count = match5;
    await drawDocument.save();
    company.lastUnPublishedDraw = drawDocument._id;
    await company.save();
    console.log("winners:");
    console.log(winners);
    console.log("drawArr");
    console.log(drawArr);
    const rollOverAmount = (match5===0)?0.4*jackPotAmount:0;

    res.send({message:"draw creation successful",winners,match3,match4,match5,poolShare3Match,poolShare4Match,poolShare5Match, rollOverAmount, draw:drawArr});
}));

router.patch("/draw/publish",isAuthenticated, isAdmin,asyncWrap(async(req,res,next)=>{
    const company = await Company.findOne({});
    if(!company.lastUnPublishedDraw){
        return next(
            new ExpressError(
                "No unpublished draw found",
                404
            )
        );
    }
    const lastDraw = await Draw.findById(company.lastUnPublishedDraw);
    if(!lastDraw){
        return next(new ExpressError("No draw found!", 404));
    }
    if(lastDraw.status === "published"){
        return next(
            new ExpressError(
                "Draw already published",
                409
            )
        );
    }
    lastDraw.status = "published";
    if(lastDraw.tempwinners?.length > 0){
        await Winner.insertMany(lastDraw.tempwinners);
        lastDraw.tempwinners = [];
    }
    await lastDraw.save();
    const rollOverAmount = (lastDraw.match5Count === 0)?lastDraw.jackPotAmount*0.4 : 0;
    company.totalPrizePool = rollOverAmount;
    company.lastDrawDate = lastDraw.createdAt;
    company.lastPublishedDraw = lastDraw._id;
    company.lastUnPublishedDraw = null;
    await company.save();
    res.send({message: "published succcessfuly"});
}))

router.post("/charity",isAuthenticated, isAdmin,charitySchemaValidation,asyncWrap(async(req,res,next)=>{
    const charityCreds = req.body;
    const newCharity = new Charity(charityCreds);
    await newCharity.save();
    res.send({message:"Charity Added"});
    
}));
router.delete("/charity/:charityName", isAuthenticated, isAdmin,asyncWrap(async(req,res,next)=>{
    const {charityName} = req.params;
    await Charity.findOneAndDelete({name:charityName});
    res.send({message:"charity removal successful"});
}))
module.exports = router;