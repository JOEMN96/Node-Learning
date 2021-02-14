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

app.post('/user',(req,res)=>{
  const user = new User(req.body)
  user.save()
  .then(()=>  res.status(201).send(user))
  .catch(err =>  {
    res.staus(400)
    res.sendt(err)}
    )
})

// Task post Route

app.post('/task',(req,res)=>{
    const task = new Task(req.body)
    task.save()
      .then( () => res.status(201).send(task))
      .catch((err) => {
        res.status(400)
        res.send(err)
      })
}) 

// GET users 

app.get('/users',(req,res)=>{
  User.find({}).then(data => res.send(data))
    .catch(err => res.status(500).send(err)) 
})

// GET Unique user
app.get('/users/:id',(req,res)=>{
    let _id = req.params.id;  
    User.findById(_id).then((user) => {
      if(!user) {
        console.log("no user");
        return res.status(404).send()
      } 
      res.send(user)
    }).catch(() => {
      res.status(404).send()
    })
})

// GET All Tasks
app.get('/tasks',(req,res) =>{
  Task.find({})
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

// GET Specific Task

app.get('/task/:id',(req,res) => {
  let id = req.params.id;
  Task.findById(id)
    .then(data => res.send(data))
    .catch((_) => res.status(403).send("Unable to Find The Task"))
})



app.listen(port, () => { 
  console.log(chalk.bgBlueBright(`Example app listening at http://localhost:${port}`))
})
