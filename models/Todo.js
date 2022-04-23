///////////////////////
//Dependencies
//////////////////////
const mongoose = require("./connection")// import the already connected object
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


 module.exports = Todo