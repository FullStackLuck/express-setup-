//////////////////////
///Importing Dependencies 
//////////////////////
require("dotenv").config(); // get our .env variables
const express = require("express");// Web framework
const mongoose = require("mongoose");// Object Document Manager (Work with DB)
const methodOverride = require("method-override");//Override request method
const morgan = require("morgan");//Logging requests

// Setup Database Connection///

//Loading the DB Url
const DATABASE_URL = process.env.DATABASE_URL

//establish connection
mongoose.connect(DATABASE_URL);

//Save connection
const cxn = mongoose.connection

//Setup Mongoose messages
.on("open", ()=>console.log("The Mongo Connection is Open"))
.on("close", ()=>console.log("The Mongo Connection is Closed"))
.on("error", (err)=> console.log(err));

/////////////////////
// Schema and Models
////////////////////


//////////////////////////
//Create Express Application
//////////////////////////
const app = express();


////////////////////////
///Middleware (app.use(middleware function))
///////////////////////
app.use(methodOverride("_method")) //override request methods form submission
app.use(morgan("dev")) ///log every request
app.use(express.urlencoded({extended: true}))// pars htm; form bodies into req.body
app.use("/static", express.static("static")) // serve files statically


//////////////////////////
///Routes 
/////////////////////////

app.get("/",(req,res)=>{
    res.send("Hello World")
})

////////////////////////
// Server Listener
///////////////////////

const PORT = process.env.PORT
app.listen(PORT,() => console.log(`Listening on port ${PORT}`))