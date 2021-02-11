const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require("validator")

mongoose.connect('mongodb://localhost/task-app', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Schema's

const TaskSchema = new Schema({
    task:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        required:true,
     
    }
})

const userSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate(val){
            if(!validator.isEmail(val)) {
              throw new Error("email is invalid")  
            }
        }
    },
    age:{
        type:Number,
        default:0,
        // validate(val) {
        //     if(val < 1 ) {
        //         throw new Error('Enter valid Age')
        //     }
        // }
    },
    password:{
        type:String,
        trim:true,
        validate(val) {
            if(!validator.isStrongPassword(val,[{ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }])) {
                throw new Error('USe Strong PW')
            }
        }
    }
})

// Initiating Datas

const Task = mongoose.model("Tasks",TaskSchema);
const User = mongoose.model("Users",userSchema)

// Creating Instance of schemas

new User({
    name:"pal",
    email:"p@HJAKDALKDmail.com",
    password:"Check$0080"
}).save().then(()=> console.log("OOG")).catch(err => console.log(err))


