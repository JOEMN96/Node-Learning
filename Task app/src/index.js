// Imports
const express = require('express')
const chalk = require('chalk')
require("./db/mongoose")
const User = require('./db/models/user')

// Express App Settings
const app = express()
const port = process.env.PORT || 3000
app.use(express.json())


// User Creation
app.post('/user',(req,res)=>{
  const user = new User(req.body)
  user.save()
  .then(()=> res.send(user))
    .catch(err =>  {
    res.status(400)
    res.send(err)}
    )
})

app.listen(port, () => {
  console.log(chalk.bgBlueBright(`Example app listening at http://localhost:${port}`))
})