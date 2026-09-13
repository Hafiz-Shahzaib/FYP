import multer from "multer"

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null ,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null , file.originalname)
    }

})
const upload = multer({storage})

export default upload




// import multer from "multer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";

// // Get current file directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Create absolute path to backend/public
// const uploadDir = path.join(__dirname, "../public");

// console.log("MULTER UPLOAD DIRECTORY:", uploadDir);

// // Create public folder if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//     console.log("Public folder created");
// }

// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         console.log("MULTER DESTINATION:", uploadDir);
//         console.log("ORIGINAL FILE:", file.originalname);
//         console.log("MIME TYPE:", file.mimetype);

//         cb(null, uploadDir);
//     },

//     filename: (req, file, cb) => {

//         // Create unique filename
//         const filename = Date.now() + "-" + file.originalname;

//         console.log("MULTER FILENAME:", filename);

//         cb(null, filename);
//     }
// });

// const upload = multer({ storage });

// export default upload;