import { v2 as cloudinary } from 'cloudinary'

import fs from "fs"


const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

try {
    if(!filePath){
        return null
    }
    const uploadResult = await cloudinary.uploader.upload(filePath,{resource_type:'auto'})
    fs.unlinkSync(filePath)
    return uploadResult.secure_url

    console.log("CLOUDINARY UPLOAD RESULT:", uploadResult)
    console.log("CLOUDINARY Name:", CLOUDINARY_NAME)
    console.log("CLOUDINARY API Key:", CLOUDINARY_API_KEY)

} catch (error) {
    fs.unlinkSync(filePath)
    console.log("CLOUDINARY UPLOAD ERROR:", error)   
}
}

export default uploadOnCloudinary











// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (filePath) => {
//     try {
//         if (!filePath) {
//             return null;
//         }

//         console.log("Cloudinary upload started");
//         console.log("File path:", filePath);
//         console.log("Cloudinary name exists:", !!process.env.CLOUDINARY_NAME);
//         console.log("Cloudinary API key exists:", !!process.env.CLOUDINARY_API_KEY);
//         console.log("Cloudinary API secret exists:", !!process.env.CLOUDINARY_API_SECRET);

//         const uploadResult = await cloudinary.uploader.upload(filePath, {
//             resource_type: "image"
//         });

//         console.log("Cloudinary upload successful");
//         console.log("Cloudinary URL:", uploadResult.secure_url);

//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//         }

//         return uploadResult.secure_url;

//     } catch (error) {

//         console.log("CLOUDINARY UPLOAD ERROR:");
//         console.log("Message:", error.message);
//         console.log("HTTP Code:", error.http_code);
//         console.log("Full Error:", error);

//         if (filePath && fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//         }

//         return null;
//     }
// };

// export default uploadOnCloudinary;