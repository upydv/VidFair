import mongoose, { Schema } from "mongoose"
//import jwt
import jwt from "jsonwebtoken"
import brcypt from "bcrypt"
const userSchema=new Schema({

    userName: {
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email: {
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName: {
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avatar: {
        type:String,
        require:true,

    }
    ,coverImage:{
        type:String
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        require:true,

    },
    refToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password= await brcypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect=async function (password) {
    return await brcypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=function (){
   return  jwt.sign(
        {
        _id:this._id,
        email:this.email,
        fullName:this.fullName,
        userName:this.userName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateAccessToken=function (){
    return  jwt.sign(
         {
         _id:this._id,
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
     }
 )
 }
export const User=mongoose.model("User",userSchema)