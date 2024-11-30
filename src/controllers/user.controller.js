import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser=asyncHandler(async(req,res)=>{
    // get user details 

    // validation --not empty

    //check if user already exist

    //check for images or avatars

    //upload to cloudanary

    //create user object - create entry in db


    const {fullName,email,userName,password}=req.body
    console.log(email)

    if(
        [fullName,email,userName,password].some((field)=>
        field?.trim()==="")
    ){
        throw new ApiError(400,"All field are required")
    }
    // if email or user exist 
    const existedUser=User.findOne({
        $or:[{userName},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"user already exist")
    }

   const avatarLocalPath= req.files?.avatar[0]?.path
   const coverImageLocalPath=req.files?.coverImagr[0]?.path
   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file required")
   }
   

   const avatar=await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400,"Avatar files is required")
   }

   const user=await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    userName:userName.toLowerCase()
   })

   const createdUser=User.findById(user._id).select(
    "-password -refreshToken"
   )
   if(!createdUser){
    throw new ApiError(500,"Something went wrong while registring a user")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registed successfully")
   )
})

export {registerUser}