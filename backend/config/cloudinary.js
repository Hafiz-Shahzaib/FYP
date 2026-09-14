// import { v2 as cloudinary } from 'cloudinary'

// import fs from "fs"


// const uploadOnCloudinary = async (filePath) => {
//     cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// try {
//     if(!filePath){
//         return null
//     }
//     const uploadResult = await cloudinary.uploader.upload(filePath,{resource_type:'auto'})
//     fs.unlinkSync(filePath)
//     return uploadResult.secure_url

//     console.log("CLOUDINARY UPLOAD RESULT:", uploadResult)
//     console.log("CLOUDINARY Name:", CLOUDINARY_NAME)
//     console.log("CLOUDINARY API Key:", CLOUDINARY_API_KEY)

// } catch (error) {
//     fs.unlinkSync(filePath)
//     console.log("CLOUDINARY UPLOAD ERROR:", error)   
// }
// }

// export default uploadOnCloudinary







// for vercel


import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {

        if (!fileBuffer) {
            return resolve(null);
        }

        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image"
            },
            (error, result) => {

                if (error) {
                    // console.log("CLOUDINARY ERROR:", error);

                    // for vercel

                    console.error("CLOUDINARY UPLOAD ERROR:");
    console.error("Error:", error);
    console.error("Message:", error.message);
    console.error("HTTP Code:", error.http_code);


                    return reject(error);
                }

                console.log("CLOUDINARY SUCCESS:");
                console.log(result.secure_url);

                resolve(result.secure_url);

                // now

                console.log(
    "Cloudinary name exists:",
    !!process.env.CLOUDINARY_NAME
);

console.log(
    "Cloudinary API key exists:",
    !!process.env.CLOUDINARY_API_KEY
);

console.log(
    "Cloudinary API secret exists:",
    !!process.env.CLOUDINARY_API_SECRET
);
            }
        );

        stream.end(fileBuffer);
    });
};

export default uploadOnCloudinary;