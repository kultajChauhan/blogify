const {createHmac,randomBytes} = require('crypto')
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true,unique:true },
  salt: { type: String, required: true },
  password: { type: String, required: true },
  profileImageUrl:{type:String,default:'../public/images/default.avif'},
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
    required: true,
  },
});

userSchema.pre('save',function(next){
    const user = this

    if(!this.isModified("password")) return next()

    const salt = randomBytes(16).toString()
    const hashedPassword=createHmac('sha256',salt).update(user.password).digest('hex')

    this.salt=salt
    this.password=hashedPassword

    next()
})

const userModel = mongoose.model(userSchema, userSchema);
