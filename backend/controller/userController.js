import uploadOnCloudinary from '../config/cloudinary.js';
import User from "../model/userModel.js";


export const getCurrentUser = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password").populate("enrolledCourses")
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        return  res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `GetCurrentUser error ${error}`});
    }
}

// export const updateProfile = async (req,res) => {
//     try {
//         const userId = req.userId
//         const {description, name} = req.body
//         let photoUrl
//         if(req.file){
//             // photoUrl = await uploadOnCloudinary(req.file.path)

//             // for vercel

//             photoUrl = await uploadOnCloudinary(req.file.buffer)
//         }
//         const user = await User.findByIdAndUpdate(userId, {name, description, photoUrl}) 

//         if (!user) {
//             return res.status(404).json({message: "User not found"});
//         }
//         await user.save()
//         return  res.status(200).json(user);
//     } catch (error) {
        
//     console.error("UPDATE PROFILE ERROR:", error);
//     console.error("ERROR MESSAGE:", error.message);
//     console.error("ERROR STACK:", error.stack);

//     return res.status(500).json({
//         message: "Profile update failed",
//         error: error.message || error
//     });

//         // return res.status(500).json({message: `updateProfile error ${error}`});
//     }
// }



// for vercel


export const updateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        const { description, name } = req.body;

        const updateData = {
            name,
            description
        };

        // If a new image is uploaded
        if (req.file) {

            console.log("FILE RECEIVED:", req.file.originalname);
            console.log("BUFFER EXISTS:", !!req.file.buffer);
            console.log("BUFFER SIZE:", req.file.buffer?.length);

            const uploadedPhotoUrl = await uploadOnCloudinary(
                req.file.buffer
            );

            console.log("CLOUDINARY URL:", uploadedPhotoUrl);

            if (!uploadedPhotoUrl) {
                return res.status(500).json({
                    message: "Image upload failed"
                });
            }

            updateData.photoUrl = uploadedPhotoUrl;
        }

        console.log("UPDATE DATA:", updateData);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        console.log("PROFILE UPDATED SUCCESSFULLY");
        console.log("PHOTO URL:", updatedUser.photoUrl);

        return res.status(200).json(updatedUser);

    } catch (error) {

        console.error("========== UPDATE PROFILE ERROR ==========");
        console.error("ERROR:", error);
        console.error("ERROR MESSAGE:", error?.message);
        console.error("ERROR NAME:", error?.name);
        console.error("ERROR CODE:", error?.code);
        console.error("ERROR HTTP CODE:", error?.http_code);

        return res.status(500).json({
            message: "Profile update failed",
            error: error?.message || "Unknown error"
        });
    }
};