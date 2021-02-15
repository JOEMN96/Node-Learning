// Imports
const express = require('express')
const chalk = require('chalk')
require("./db/mongoose")
const User = require('./db/models/user')
const Task = require("./db/models/Task")


// Express App Settings
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())


// User Creation

app.post('/user',async (req,res)=>{

  const user = new User(req.body)

  try {
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400)
    res.send(err)
  }
})

// GET users 

app.get('/users',async(req,res)=>{

  try {
    let data =  await User.find({})
    res.send(data)  
  } catch (error) {
    res.status(500).send(error)
  }

})

// GET Unique user
app.get('/users/:id',async (req,res)=>{
    let _id = req.params.id;  

    try {
      const user = await  User.findById(_id);
      if(!user) {
        return res.status(404).send()
      } 
      res.send(user)
    } catch (error) {
      res.status(404).send("No user Found")
    }
})

// UPDATE A Unique User ---> PATCH (UPDATE In CRUD)

app.patch('/users/:id',async (req,res) => {

  let needsUpadate = Object.keys(req.body);
  let validUpdates = ['name',"password","email","age"]

  let canUpdate = needsUpadate.every(update => validUpdates.includes(update))

  if(!canUpdate) {
    return res.status(404).send('unable to find Key')
  }
  
    try {
        let updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!updatedUser) {
          return res.status(404).send()
        }
        res.send(updatedUser)
    } catch (e) {
      res.status(400).send("server Error")
    }
})

// Task post Route

app.post('/task',async (req,res)=>{
  const task = new Task(req.body)

    try {
      await task.save()
      res.status(201).send(task)
    } catch (error) {
      res.status(400)
      res.send(error)
    }
}) 

// GET All Tasks
app.get('/tasks',async(req,res) =>{
  
    try {
      const data = await Task.find({})
      res.send(data)
    } catch (err) {
      res.status(500).send(err)
    }

})

// GET Specific Task

app.get('/task/:id',async (req,res) => {
  
  let id =  req.params.id;
  try {
    let data =  await Task.findById(id)
    if(!data) {
      return res.status(404).send("No recods Found !")
    }
    res.send(data)
  } catch (err) {
    res.status(403).send("Unable to Find The Task")
  }
})



app.listen(port, () => { 
  console.log(chalk.bgBlueBright(`Example app listening at http://localhost:${port}`))
})
