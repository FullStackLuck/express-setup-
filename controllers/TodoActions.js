//////////////////////////
// Dependencies
/////////////////////////
const Todo =require("../models/Todo")

/////////////////////
//Actions
////////////////////
const actions = {}

actions.index = async(req,res)=>{
    //go get todos
    const todos = await Todo.find({}).catch((err) => res.send(err))
    //render index.ejs
    res.render("index.ejs",{todos})
}

actions.seed = async(req, res) =>{
    async (req, res)=>{
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
    }
}
actions.create = async(req,res)=>{
    //creat the todo
    await Todo.create(req.body).catch((err)=>res.send(err))
    //redirect back to main page
    res.redirect("/todo")
}

actions.updated =async (req,res)=>{
    // get the id from params
    const id = req.params.id
    // get the todo to be updated
    const todo = await Todo.findById(id)
    // update todos completed property
    todo.completed = true
    await todo.save()// save changes
     res.redirect("/todo") //back to main page 
}


/////////////////////////////////
//exports the actions object
////////////////////////////////

module.exports = actions