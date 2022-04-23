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

// Schema, the definition of out data type 
// model, the object for working with our data type
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
},
 {timestamps: true})

//////////////Model////////////////
 const Todo = mongoose.model("Todo", todoSchema)

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

app.get("/", async(req,res)=>{
    //go get todos
    const todos = await Todo.find({}).catch((err) => res.send(err))
    //render index.ejs
    res.render("index.ejs",{todos})
})


app.get("/todo/seed", async (req, res)=>{
    // Seed routes resets the data base (delete all existing todos)
   await Todo.remove({}).catch((err) => res.send(err))
   // add sample todo
   const todos = await Todo.create([
       {text: "eat breakfast", completed: false},
       {text: "eat lunch", completed: false},
       {text: "eat dinner", completed: false}
   ]).catch((err) => res.send(err))
   ///send the todos as json
   res.json(todos)
})

////////////////////////
// Server Listener
///////////////////////

const PORT = process.env.PORT
app.listen(PORT,() => console.log(`Listening on port ${PORT}`))