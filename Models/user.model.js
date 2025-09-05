const { error } = require('console');
const {createHmac,randomBytes} = require('crypto')
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true,unique:true },
  salt: { type: String },
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

userSchema.statics.matchPassword= async function(email,password){
const user = await this.findOne({email})

if(!user) throw new Error('User not found') 

  const salt=user.salt
  const hashedPassword=user.password

  const userProvidedhash=createHmac('sha256',salt).update(password).digest('hex')

  if(hashedPassword!=userProvidedhash) throw new Error('Incurrect password') 

  return {...user,password:undefined,salt:undefined}
}

const UserModel = mongoose.model("userSchema", userSchema);

module.exports=UserModel
