const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:["random","algorithm"],
        required:true

    },
    numbers:{
        type:[Number],
        required:true
    },
    jackPotAmount:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        enum:["simulation", "published","discarded"],
        default:"simulation",
        required:true
    },
    match3Count:{
        type:Number,
    },
    match4Count:{
        type:Number,
    },
    match5Count:{
        type:Number,
    },
    tempwinners:[
        {

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
        }
    ],
},{
    timestamps:true
});

const Draw = mongoose.model("Draw", drawSchema);
module.exports = Draw;