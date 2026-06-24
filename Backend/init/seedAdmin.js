if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const bcrypt = require("bcrypt");
const User = require("../models/User");
const connectDb = require("../dbConnect");
connectDb();
async function seedAdmin(){
    await User.deleteMany({role: "admin"});
    const password = "yashika";
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(password,salt);
    const admin = new User({name:"Yashika", email:"yashika@golfgiving.com", password: hashedPass,role:"admin"});
    await admin.save();
    console.log("admin added");
}

seedAdmin().catch(err=>{console.log("error in initializing the admin")});