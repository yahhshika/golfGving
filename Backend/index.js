if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
const cors = require("cors");
const cookieParser = require("cookie-parser");
const main = require("./dbConnect");
const express = require("express");
const app = express();
const UserRouter = require("./routes/User");
const AdminRouter = require("./routes/Admin");
const WinnerRouter = require("./routes/PublicRoute");
const ExpressError = require("./utils/ExpressError");
const PORT = 8080;
require("./cron/subscriptionCron");
main().then(()=>{
    console.log("connected to db successfully");
}).catch(err=>{
    console.log("error in connecting to db in index.js");
})
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(express.json());
app.use(cookieParser());
app.use("/api/user/",UserRouter);
app.use("/api/admin/",AdminRouter);
app.use("/api/public/",WinnerRouter);
app.use((req,res,next)=>{
    throw new ExpressError("Page not found", 401);
})
app.use((err,req,res,next)=>{
    const {status=500, message="Something went wrong!"} = err;
    res.status(status).send({message});
})
app.listen(8080, ()=>{
    console.log("app is listening");
})