if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const Charity = require("../models/Charity");
const connectDb = require("../dbConnect");
connectDb();
const charities = [
    {
        name: "Helping Hands Foundation",
        description: "Supports underprivileged children with education, nutrition, and healthcare."
    },
    {
        name: "Food For All",
        description: "Provides meals and food assistance to families facing hunger."
    },
    {
        name: "Hope for Education",
        description: "Funds school supplies, scholarships, and educational programs."
    },
    {
        name: "Care & Cure Trust",
        description: "Helps low-income patients access essential medical treatments."
    },
    {
        name: "Green Earth Initiative",
        description: "Works on environmental conservation, tree plantation, and sustainability projects."
    },
    {
        name: "Animal Rescue Network",
        description: "Rescues, shelters, and rehabilitates abandoned and injured animals."
    },
    {
        name: "Water For Life",
        description: "Provides clean drinking water and sanitation facilities to rural communities."
    },
    {
        name: "Bright Futures Foundation",
        description: "Empowers young people through skill development and career guidance."
    },
    {
        name: "Women Empowerment Trust",
        description: "Supports women through education, entrepreneurship, and employment opportunities."
    },
    {
        name: "Disaster Relief Fund",
        description: "Provides emergency aid and rehabilitation support during natural disasters."
    }
];

async function initCharity(){
    await Charity.deleteMany({});
    await Charity.insertMany(charities);
} 
initCharity().then(()=>{
    console.log("Charities initialized");
}).catch(err=>{
    console.log("error in initializing Charities");
});
