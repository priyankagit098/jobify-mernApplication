import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { timeStamp } from "console";


const UserSchema = new mongoose.Schema({
    name:{
      type: String,
      required: [true, "Please enter your name!"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email:{
      type: String,
      required: [true, "Please enter your email!"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email"
      },
      unique: true,
      

    }, 
    password:{
      type: String,
      required: [true, "Please enter your password"],
      minLength: [4, "Password should be greater than 6 characters"],
      select: false,
    },
    lastName: {
      type: String,
      default: 'lastName',
    },
    location: {
      type: String,
      trim: "true",
      default: 'my city',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    avatar: String,
    

    
},
{
  timeStamp: true,
} 
    
  );
// we do some functionality 
// this is a hook that gets called before we save the document, but not for every method
// it going to trigger it.

  UserSchema.pre("save", async function() {
  
    // return which values ex names, email are updating
    if(!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt)
      // this points back to UserSchema
  })

// // from this function return jsonwebtoken
  UserSchema.methods.createJWT= function() {
    return jwt.sign({userId: this._id}, process.env.TOKEN_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })
  }






const User = mongoose.model("User", UserSchema);  

export default User;
