import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});

export const uploadonCloudinary = async (localfilepath) => {
    try {
      if (!localfilepath) 
      {
        return null;
      }
      const response = await cloudinary.uploader.upload(localfilepath, {
        resource_type: "auto",
      });
      console.log("file is uploaded on cloudinary ", response.url);
      return response;
    } catch (error) {
      fs.unlinkSync(localfilepath);
      return null;
    }
  };