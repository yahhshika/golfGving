const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    companyProfit:{
        type:Number,
        default:0
    },

    totalRevenue:{
        type:Number,
        default:0
    },

    totalDonations:{
        type:Number,
        default:0
    },

    totalPrizePool:{
        type:Number,
        default:0
    },
    lastUnPublishedDraw:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Draw"
    },
    lastPublishedDraw:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Draw"
    }
},{
    timestamps:true
});

const Company = mongoose.model("Company", companySchema);
module.exports = Company;