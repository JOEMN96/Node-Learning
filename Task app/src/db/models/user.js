const { Schema } = require("mongoose");
const validator = require("validator");
const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("email is invalid");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    trim: true,
    validate(val) {
      if (
        !validator.isStrongPassword(val, [
          {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
            returnScore: false,
            pointsPerUnique: 1,
            pointsPerRepeat: 0.5,
            pointsForContainingLower: 10,
            pointsForContainingUpper: 10,
            pointsForContainingNumber: 10,
            pointsForContainingSymbol: 10,
          },
        ])
      ) {
        throw new Error("USe Strong PW");
      }
    },
  },
});

userSchema.statics.findByCredentials = async (email, pass) => {
  const user = User.findOne({ email });
  if (!user) {
    throw new Error(`unable To find User with ${email}`);
  }

  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) {
    throw new Error("Password not Correct");
  }

  return user;
};

// Hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = Mongoose.model("user", userSchema);

module.exports = User;
