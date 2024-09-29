import mongoose from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
       
    },
    password:{
        type:String,
        required:true
    },
    profile_picture:{  
        url:{
            type:String
        }
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})




userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt  = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword = async function (enteredPassword){
    console.log("password ",enteredPassword);
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model("User",userSchema)

export default User;