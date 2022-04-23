//////////////////////
///Importing Dependencies 
//////////////////////
require("dotenv").config(); // get our .env variables
const express = require("express");// Web framework
const methodOverride = require("method-override");//Override request method
const morgan = require("morgan");//Logging requests
const TodoRouter = require("./controllers/TodoController")

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
app.use("/todo",TodoRouter)

////////////////////////
// Server Listener
///////////////////////

const PORT = process.env.PORT
app.listen(PORT,() => console.log(`Listening on port ${PORT}`))