if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const connectDb = require("../dbConnect");
connectDb();
const User = require("../models/User");
const getSeedUsers = require("./seedUserData");
const seedUsers = getSeedUsers();
async function userInit(){
    await User.deleteMany({role:"user"});
    await User.insertMany(seedUsers);
}
userInit().then(()=>{
    console.log("Added new Users")
}).catch(err=>{
    console.log("error in seedUser.js")
    console.log(err);

})
