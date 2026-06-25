const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema({
    type:{
        type:String,
        enum:["random","algorithm"],
        required:true

    },
    draw:{
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
    match3:{
        type:Number,
        min:0,
        default:0
    },
    match4:{
        type:Number,
        min:0,
        default:0
    },
    match5:{
        type:Number,
        min:0,
        default:0
    },
    winners:[
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
            },
            name:{
                type:String,
                required:true
            }
        }
    ],
    poolShare3Match:{
        type:Number,
        min:0,
        default:0
    },
    poolShare4Match:{
        type:Number,
        min:0,
        default:0
    },
    poolShare5Match:{
        type:Number,
        min:0,
        default:0
    },
    rollOverAmount:{
        type:Number,
        min:0,
        default:0
    }


},{
    timestamps:true
});

const Draw = mongoose.model("Draw", drawSchema);
module.exports = Draw;