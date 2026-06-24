const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    drawId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Draw",
        required:true
    },
    matchType:{
        type:String,
        enum:["5-match","4-match","3-match"],
        required:true
    },
    prizeAmount:{
        type:Number,
        required:true
    }
}, {
    timestamps:true
});

const Winner = mongoose.model("Winner", winnerSchema);
module.exports = Winner;