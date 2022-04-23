////////////////////////
//Dependencies
///////////////////////

require("dotenv").config
const mongoose = require("mongoose");


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


//Export the connection

module.exports = mongoose