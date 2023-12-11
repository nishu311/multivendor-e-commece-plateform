const express =require("express");
const ErrorHandler = require("./middleware/error");

const app=express();
const cookieParser = require("cookie-parser");
const bodyParser=require("body-parser");
const cors =require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true}));
// config
if(process.env.NODE_ENV !=="PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    });
}
// import routes
// this is for error handling 
app.use(ErrorHandler);
const user = require("./controller/user.js");
const shop = require("./controller/shop.js");

app.use("/api/v2/user",user);
app.use("/api/v2/shop", shop);


module.exports=app;