if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const connectDb = require("../dbConnect");
connectDb();
const Draw = require("../models/Draw");
const clearDraws = async()=>{
    await Draw.deleteMany({});
}
clearDraws().then(()=>{
    console.log("cleared Draws")
}).catch(()=>{
    console.log("err in clearing drawing");
})