if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const connectDB = require("../dbConnect");
const Company = require("../models/Company");
connectDB();

async function initCompany(){
    await Company.deleteMany({});
    await Company.insertOne({
        companyProfit:0,totalRevenue:0,totalDonations:0,totalPrizePool:0
    });
}
initCompany().then(()=>{
    console.log("Company init successful");
}).catch(err=>{
    console.log("error in Company init data");
})