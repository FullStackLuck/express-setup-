/////////////////////
// Dependencies
////////////////////


const express = require("express");
const router = express.Router()
const Todo = require("../models/Todo")
const TodoActions = require("./TodoActions")

//////////////////////////
///Routes 
/////////////////////////

router.get("/", TodoActions.index)

router.get("/seed", TodoActions.seed) 

router.post("/", TodoActions.create) 

router.put("/:id", TodoActions.updated) 
////////////////////
//Exports the Router
////////////////////

module.exports = router;