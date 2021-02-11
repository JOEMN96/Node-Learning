const {Schema} = require('mongoose');
const validator = require("validator")
const Mongoose = require("mongoose")

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

const User = Mongoose.model('user',userSchema) 

module.exports = User