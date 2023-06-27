import User from "../models/user.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
import { StatusCodes } from "http-status-codes";

import {BadRequestError, NotFoundError} from "../errors/index.js"


import attachCookies from "../utils/attachCookies.js";




const register= async(req, res, next) => {
  const { name, email, password} = req.body;
   if (!name || !email || !password) {
    // invoking instance  
    throw new BadRequestError("Please provide all values");
   }

   try {
    const user = await User.findOne({email})
    if (user) {

      // throw new BadRequestError("Email Already In use");
         res.status(404).json({success: false,msg: "Already User exists"})
    }
    
    

    // hash password
    const salt= await bcrypt.genSalt(10); 
    const hashPassword= await bcrypt.hash(req.body.password, salt);
   

    const newUser = await User.create({
      name,
      email,
      password
     
  })
  console.log(newUser)

    
    res.status(StatusCodes.OK).json({success: true, msg: "User created successfully", newUser})



   }
  catch(error) {
    res.status(500).json({success: false, msg: "Internal server error"})
  }
    
    
  }



const login = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user= await User.findOne({email}).select("+password")
  
    if(!user) {
     return res.status(400).json({success: false,msg: "User Not Found"})
  //  throw new BadRequestError("User not Found");
    } 

  const validPassword= await bcrypt.compare(password, user.password)
  if (!validPassword) {
    return res.status(400).json({msg:"Invalid Password"})
    // throw new Error("Invalid Password")
  }

  const token = user.createJWT()
  user.password=undefined
 
  attachCookies({res,token})

 
// it simply going to add to all requests


  // const token = jwt.sign({email: user.email,userId: user._id}, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_LIFETIME })


 

  res.status(StatusCodes.OK).json({success: true, user, location: user.location})
 

  }


    
catch (error) {
  res.status(500).json({success: false, msg: "Internal server error"})
  
}

}



 






const updateUser = async(req, res) => {
  
  const {email, name, lastName,location}= req.body
  // const user = User.findOne({_id: req.user._id})
  
  if (!email || !name || !lastName || !location) {
    res.status(400).json({msg: "Please provide all Values"})
  }
 try {
  

 
   const user = await User.findByIdAndUpdate(req.user.userId, req.body);
   const token = user.createJWT()
   attachCookies({res,token})
   res.status(StatusCodes.OK).json({success: true,user, location: user.location, msg:"User Profile Updated..."})
 

 }
 catch(error) {
  res.status(500).json({msg: "Internal Server error"})
 }
  


} 



const getCurrentUser = async(req, res) => {
  try {
    const user= await User.findOne({_id: req.user.userId})
    res.status(StatusCodes.OK).json({success: true,user, location: user.location})
  }
  catch(error) {
    res.status(500).json({msg: "Internal Server error"})
   }
}


const logout= async(req, res) => {
  res.cookie('token', "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
   
  });
  res.status(StatusCodes.OK).json({msg: "User logged out"})
  
}



export {register, login,updateUser, getCurrentUser, logout}

