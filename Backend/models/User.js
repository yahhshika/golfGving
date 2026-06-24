const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user", "admin","subscriber"],
        default:"user"
    },
    charityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Charity",
    },
    scores:[
        {
            score:{
                type:Number,
                min: 1,
                max: 45,
                required:true
            },
            date:{
                type:Date,
                default:Date.now,
                required:true
            }
        }
    ]
},{
    timestamps:true
});

const User = mongoose.model('User', UserSchema);
module.exports = User;