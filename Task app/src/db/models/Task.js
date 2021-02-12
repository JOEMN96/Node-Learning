const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    desc:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const Task = mongoose.model('tasks',TaskSchema)

module.exports = Task