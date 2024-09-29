import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utills/generateToken.js';
import { v2 as cloudinary } from 'cloudinary';

import { config } from 'dotenv';
config()
const authUser = async(req,res) =>{
    try{

    
    const {email,password}  = req.body
        console.log(req);
    const user = await User.findOne({email:email,isAdmin:false})
    if(user && await user.matchPassword(password)){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            image:user?.profile_picture?.url  
        })
        
    }else{ 
       
        res.status(400).json("invalid email or password"); 
        
    }
}catch(error){
    console.error(error);
}

}


const registerUser = async(req,res) =>{
    try{

   
    const {name,email,password,phone} = req.body
        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400)
            throw new Error("User alredy exists")
        }

        const user = await User.create({
            name,
            email,
            password,
            phone
        }) 
        
        if(user){
          
            generateToken(res,user._id)
            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email
            })
        }else{ 
            res.status(400); 
            throw new Error("Invalid user data")
        }
    }catch(error){
        console.log(error);
    }

}


const logoutUser = asyncHandler( async(req,res) =>{
    res.cookie("jwt","",{
        httpOnly:true,
        expires:new Date(0)
    })


    res.status(200).json({message:"User logged out"})
})  


const getUserProfile = asyncHandler( async(req,res) =>{
    console.log(req.user);
    res.status(200).json({message:"User profile"})
})



const updateUserProfile =  async(req,res) =>{
    try {
        console.log(req.body);
        const { id, name, email, phone, password,image } = req.body;
  
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        
        // Your existing code...
        
    
        const uploadResult = await cloudinary.uploader.upload(image, {
            folder: 'Photo',
        });

      let user = await User.findById(id);
      
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user fields if provided in request body
      if (name) user.name = name;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if (password) user.password = password; // Example: handle password encryption
      if(uploadResult) user.profile_picture.url = uploadResult.secure_url;
      // Save updated user data
      await user.save();
  
      res.status(200).json({ _id:user._id,name:user.name,email:user.email,phone:user.phone,image: user.profile_picture.url });
    } catch (err) {
      console.error('Error updating profile:', err);
      res.status(500).json({ error: 'Server error' });
    }
}



export{
    
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}