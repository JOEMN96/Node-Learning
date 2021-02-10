const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/task-app', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


const UserSchema = new Schema({
    name:String,
    age:Number
})


const User = mongoose.model('User',UserSchema)

let us1 = new User({
    name:'jo MOne',
    age:21
})

us1.save().then(()=>console.log(us1))