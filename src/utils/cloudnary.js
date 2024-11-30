import { v2 } from "cloudinary";
import { response } from "express";
import fs from "fs"


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


    const uploadOnCloudinary=async (localFilePath){
        try
        {   
            //check if url is not available
            if(!localFilePath) return null;
            //upload file
              const response= await cloudinary.uploader.upload(localFilePath,{
                    resource_type:"auto"
                })
                // print message if uploaded
                console.log("File is uploades successfully.",response.url)
                return response
        }
        catch(error)
        {
            fs.unlinkSync(localFilePath) // removes loaclly saved files id operation got failed 
            return null
        }
    }

    export {uploadOnCloudinary}