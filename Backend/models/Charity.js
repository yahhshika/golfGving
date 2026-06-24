const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    image:{
        type:String,
        default:"https://plus.unsplash.com/premium_photo-1723579295931-66cb4cfe6ba5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (img)=>img==""?"https://plus.unsplash.com/premium_photo-1723579295931-66cb4cfe6ba5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":img
    },
    totalDonation:{ //total money donated.
        type:Number,
        default: 0,
    }
})

const Charity = mongoose.model("Charity", charitySchema);
module.exports = Charity;