const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    plan:{
        type:String,
        enum:["monthly", "yearly"],
        required:true,
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    startDate:{
        type:Date,
        default:Date.now
    },
    expiryDate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:["active", "cancelled", "lapsed"],
        default:"active",
        required:true
    },
    charityPercentage:{
        type:Number,
        default:10,
        min:10,
        max:30
    }
},{
    timestamps:true
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;