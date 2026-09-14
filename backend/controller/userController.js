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
        console.log("========== UPDATE PROFILE START ==========");

        console.log("User ID:", req.userId);
        console.log("File exists:", !!req.file);

        if (req.file) {
            console.log("File name:", req.file.originalname);
            console.log("File type:", req.file.mimetype);
            console.log("Buffer exists:", !!req.file.buffer);
            console.log("Buffer size:", req.file.buffer?.length);
        }

        const userId = req.userId;
        const { description, name } = req.body;

        const updateData = {
            name,
            description
        };

        // Upload image only if user selected one
        if (req.file) {

            console.log("Starting Cloudinary upload...");

            const uploadedPhotoUrl = await uploadOnCloudinary(
                req.file.buffer
            );

            console.log("Cloudinary URL:", uploadedPhotoUrl);

            if (!uploadedPhotoUrl) {
                return res.status(500).json({
                    message: "Cloudinary image upload failed"
                });
            }

            updateData.photoUrl = uploadedPhotoUrl;
        }

        console.log("Update data:", updateData);

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

        console.log("Profile updated successfully");
        console.log("Photo URL:", updatedUser.photoUrl);

        return res.status(200).json(updatedUser);

    } catch (error) {

        console.error("========== UPDATE PROFILE ERROR ==========");
        console.error("ERROR:", error);
        console.error("ERROR MESSAGE:", error?.message);
        console.error("ERROR NAME:", error?.name);
        console.error("ERROR HTTP CODE:", error?.http_code);
        console.error("ERROR JSON:", JSON.stringify(error));

        return res.status(500).json({
            message: "Profile update failed",
            error: error?.message || JSON.stringify(error)
        });
    }
};