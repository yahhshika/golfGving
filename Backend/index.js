if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const main = require("./dbConnect");
const express = require("express");
const app = express();
const UserRouter = require("./routes/User");
const AdminRouter = require("./routes/Admin");
const ExpressError = require("./utils/ExpressError");
const PORT = 8080;

main().then(()=>{
    console.log("connected to db successfully");
}).catch(err=>{
    console.log("error in connecting to db in index.js");
})
app.use(express.json());

app.use("/api/user/",UserRouter);
app.use("/api/admin/",AdminRouter);
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