if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const connectDb = require("../dbConnect");
connectDb().then(()=>{
    console.log("db connected")
}).catch(err=>{
    console.log("err connecting to db");
})

const Company = require("../models/Company");
async function addPrizePool(){
    const company = await Company.findOne({});
    company.totalPrizePool += 9000;
    await company.save();
}
addPrizePool().then(()=>{
    console.log("Prize pool addition done");
}).catch(err=>{
    console.log(err);
})
