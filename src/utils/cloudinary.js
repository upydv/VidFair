import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

// Configuration 
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {   
        //check if url is not available
        if(!localFilePath) return null;
        //upload file
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // print message if uploaded
        console.log("File is uploaded successfully.", response.url)
        fs.unlinkSync(localFilePath) // remove local file after successful upload
        return response
    }
    catch(error) {
        fs.unlinkSync(localFilePath) // removes locally saved files if operation failed
        return null
    }
}

export { uploadOnCloudinary }