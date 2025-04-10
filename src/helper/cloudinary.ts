
import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export const UploadOnCloudinary = async (localFilePath: string): Promise<string | null> => {

    try {

          if(!localFilePath || !fs.existsSync(localFilePath)){
            console.error("File not found:", localFilePath)
            return null
          }

            const response =  await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
                folder: 'nextmentor'
            })

            if(response.secure_url)  fs.unlinkSync(localFilePath)
            return response.secure_url

    } catch (error: any) {
        console.log("Cloudinary image upload error ");
        fs.unlinkSync(localFilePath)
        return null
    }
            
}