import generateAdminToken from "../utills/adminToken.js"
import User from "../models/userModels.js"
import { v2 as cloudinary } from 'cloudinary';

import { config } from 'dotenv';
config()

const authUser = async(req,res) =>{
    try{
    const {email,password}  = req.body


    const user = await User.findOne({email:email,isAdmin:true})
   
    if(user && await user.matchPassword(password)){
        generateAdminToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            email:email,
        })
    }else{ 
        res.status(400).json("invalid email or password"); 
    }
}catch(error){
    console.error(error);
}

}



const getUserData = async (req, res) => {
    try {
        const users = await User.find({isAdmin:false}); 
        res.json({users: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getSearchResult = async(req,res)=>{
    try{
        const { search } = req.body;
        const searchCriteria = { isAdmin: false };

        if (search) {
            searchCriteria.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                
            ];
        }

        const users = await User.find(searchCriteria); 
        res.json({ users: users });
    }catch(error){
        console.error(error);
    }
}


const editUser = async (req,res)=>{

    try{
       
        const { id, name, email, phone,profilePicture } = req.body;

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET
        });
        
        // Your existing code...
        let  uploadResult =null
    if(profilePicture){
         uploadResult = await cloudinary.uploader.upload(profilePicture, {
            folder: 'Photo',
        });
    }
        

      let user = await User.findById(id);
      
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Update user fields if provided in request body
      if (name) user.name = name;
      if (email) user.email = email;
      if (phone) user.phone = phone;
      if(uploadResult) user.profile_picture.url = uploadResult.secure_url;
      // Save updated user data
      await user.save();
  
      res.status(200).json({userData:user });

    }catch(error){
        console.error(error);
    }
}
const createUser = async (req,res)=>{
    try{
        const {name,email,phone,password,profilePicture} = req.body
    console.log("create user");
        const newUser = new User({
            name:name,
            email:email,
            phone:phone,
            password:password,
            profile_picture:{
                url:profilePicture
            }
        })

        await newUser.save()
        res.status(200).json({userData:newUser });
    }catch(error){
        console.error(error);  
    }  
}  


const deleteUser =async(req,res)=>{
    try{
        const {userId} = req.body
        await User.deleteOne({_id:userId})
        const users = await User.find({isAdmin:false}); 
        res.json({users: users }); 
    }catch(error){ 
        console.error(error);
    }
}

const logoutAdmin = async (req,res)=>{
    try{
        res.cookie("adminJwt","",{
            httpOnly:true,
            expires:new Date(0)
        })
    
        res.status(200).json({message:"Admin logged out"})
    }catch(error){
        console.error(error);
    }
}
 
export {
    authUser,
    getUserData, 
    editUser,
    createUser, 
    deleteUser,
    logoutAdmin,
    getSearchResult
}  