import uploadOnCloudinary from './../config/cloudinary.js';
import Course from "../model/courseModel.js"
import Lecture from '../model/lectureModel.js';
import User from "../model/userModel.js"
import Assignment from '../model/assignmentModel.js';
import Submission from '../model/submissionModel.js';


// export const createCourse = async (req,res) => {
//     try {
//         const {title, category} = req.body
//         if(!title || !category){
//             return res.status(400).json({message:"title or Category is required"})
//         }
//         const course = await Course.create({
//             title,
//             category, 
//             creator:req.userId
//         })
//         return res.status(201).json(course)
//     } catch (error) {
//         return res.status(500).json({message:`CreateCourse error ${error}`})
//     }
// }

// for Semester & CourseCode
export const createCourse =
async (req,res) => {

 try {

  const {
   title,
   semester,
   courseCode,
   subject
  } = req.body

  if(
   !title ||
   !semester ||
   !courseCode ||
   !subject
  ){

   return res.status(400).json({
    message:"All fields required"
   })

  }

  const course =
  await Course.create({

   title,
   semester,
   courseCode,
   subject,
   creator:req.userId

  })

  return res
  .status(201)
  .json(course)

 } catch (error) {

  return res.status(500).json({
   message:`CreateCourse error ${error}`
  })

 }

}

export const getPublishedCourses = async (req,res) => {
    try {
        const courses = await Course.find({isPublished:true, isActive: true,})
        // .populate("lectures reviews")

        // Now
        .populate("lectures assignments reviews")
        if(!courses){
            return res.status(400).json({message:"Courses are not found"})
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({message:`failed to get isPublished Courses ${error}`})
    }
}

export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({creator:userId})
        if(!courses){
            return res.status(400).json({message:"Courses are not found"})
        }
        return res.status(200).json(courses)

    } catch (error) {
        return res.status(500).json({message:`failed to get Creator Courses ${error}`})
    }
}

export const editCourse = async (req,res) => {
    try {
        const {courseId} = req.params
        const {title, subTitle, description, semester, courseCode, subject, isPublished} = req.body
        let thumbnail
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path)

            // for vercel

            // thumbnail = await uploadOnCloudinary(req.file.buffer)
        }
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        const updateData = {title, subTitle, description, semester, courseCode, isPublished, subject, thumbnail}

        course = await Course.findByIdAndUpdate(courseId, updateData, {new:true})
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message:`failed to edit Course ${error}`})
    }
}


export const getCourseById = async (req,res) => {
    try {
        const {courseId} = req.params
        // let course = await Course.findById(courseId)
        // Now
        let course = await Course.findById(courseId).populate("lectures assignments reviews")
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        return res.status(200).json(course)
        
    } catch (error) {
        return res.status(500).json({message:`failed to get Course by id ${error}`})
    }
}

export const removeCourse = async (req,res) => {
    try {
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        course = await Course.findByIdAndDelete(courseId,{new:true})
        return res.status(200).json({message:"Course removed"})
    } catch (error) {
        return res.status(500).json({message:`failed to delete Course by id ${error}`})
    }
}

//for Lecture

export const createLecture = async (req,res) => {
    try {
        const {lectureTitle} = req.body
        const {courseId} = req.params
        if(!lectureTitle || !courseId){
            return res.status(400).json({message:"lectureTitle is required"})
        }
        const lecture = await Lecture.create({lectureTitle})
        const course = await Course.findById(courseId)
        if(course){
            course.lectures.push(lecture._id)
        }
        await course.populate("lectures")
        await course.save()
        return res.status(201).json({lecture, course})

    } catch (error) {
        return res.status(500).json({message:`failed to create Lecture ${error}`})
    }
}

export const getCourseLecture = async (req,res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        await course.populate("lectures")
        await course.save()
        return res.status(200).json(course)
        

    } catch (error) {
        return res.status(500).json({message:`failed to getCourseLecture ${error}`})
    }
}

// export const editLecture = async (req,res) => {
//     try {
//         const {lectureId} = req.params
//         const {isPreviewFree, lectureTitle} = req.body
//         const lecture = await Lecture.findById(lectureId)
//         if(!lecture){
//             return res.status(404).json({message:"Lecture is not found"})
//         }
//         let videoUrl
//         if(req.file){
//             videoUrl = await uploadOnCloudinary(req.file.path)
//             lecture.videoUrl = videoUrl
//         }
//         if(lectureTitle){
//             lecture.lectureTitle = lectureTitle
//         }
//         lecture.isPreviewFree = isPreviewFree

//         await lecture.save()
//         return res.status(200).json(lecture)
//     } catch (error) {
//         return res.status(500).json({message:`failed to edit Lecture ${error}`})
//     }
// }

// lecture Content and Image Url added

// export const editLecture = async (req,res) => {
//     try {
//         const {lectureId} = req.params
//         const {isPreviewFree, lectureTitle, lectureContent} = req.body
//         const lecture = await Lecture.findById(lectureId)
//         if(!lecture){
//             return res.status(404).json({message:"Lecture is not found"})
//         }
//         // Upload Video
//         if (req.files?.videoUrl) {
//             const video = await uploadOnCloudinary(req.files.videoUrl[0].path)
//             lecture.videoUrl = video.secure_url || video
//         }
//         // Upload Image
//         if (req.files?.lectureImage) {
//             const image = await uploadOnCloudinary(req.files.lectureImage[0].path)
//             lecture.lectureImage = image.secure_url || image
//         }

//         if(lectureTitle){
//             lecture.lectureTitle = lectureTitle
//         }
//         if(lectureContent){
//             lecture.lectureContent = lectureContent
//         }
//         lecture.isPreviewFree = isPreviewFree

//         await lecture.save()
//         return res.status(200).json(lecture)
//     } catch (error) {
//         return res.status(500).json({message:`failed to edit Lecture ${error}`})
//     }
// }


// video & Video Url with content
export const editLecture = async (req, res) => {
    try {

        const { lectureId } = req.params
        const { lectureTitle, lectureContent, videoUrl, isPreviewFree } = req.body

        const lecture = await Lecture.findById(lectureId)

        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" })
        }

        // ✅ If Video File Uploaded
        if (req.file) {
            const video = await uploadOnCloudinary(req.file.path)
            lecture.videoUrl = video.secure_url || video
        }

        // ✅ If YouTube URL Provided
        if (videoUrl) {
            lecture.videoUrl = videoUrl
        }

        // Update fields
        if (lectureTitle)
            lecture.lectureTitle = lectureTitle

        if (lectureContent)
            lecture.lectureContent = lectureContent

        lecture.isPreviewFree = isPreviewFree

        await lecture.save()

        return res.status(200).json(lecture)

    } catch (error) {
        return res.status(500).json({
            message: `failed to edit Lecture ${error}`
        })
    }
}


// ChatGpt
// export const editLecture = async (req, res) => {
//     try {
//         const { lectureId } = req.params
//         const { isPreviewFree, lectureTitle, lectureContent } = req.body

//         const lecture = await Lecture.findById(lectureId)
//         if (!lecture) {
//             return res.status(404).json({ message: "Lecture is not found" })
//         }

//         // ✅ Upload Video
//         if (req.files?.videoUrl) {
//             const video = await uploadOnCloudinary(req.files.videoUrl[0].path)
//             lecture.videoUrl = video.secure_url || video
//         }

//         // ✅ Upload Image
//         if (req.files?.lectureImage) {
//             const image = await uploadOnCloudinary(req.files.lectureImage[0].path)
//             lecture.lectureImage = image.secure_url || image
//         }

//         // ✅ Update fields
//         if (lectureTitle) lecture.lectureTitle = lectureTitle
//         if (lectureContent) lecture.lectureContent = lectureContent

//         lecture.isPreviewFree = isPreviewFree === "true"

//         await lecture.save()

//         return res.status(200).json(lecture)

//     } catch (error) {
//         return res.status(500).json({ message: `failed to edit Lecture ${error}` })
//     }
// }

export const removeLecture = async (req,res) => {
    try {
        const {lectureId} = req.params
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if(!lecture){
            return res.status(404).json({message:"Lecture is not found"})
        }
        
        await Course.updateOne(
            {lectures:lectureId},
            {$pull:{lectures:lectureId}}
        )
        return res.status(200).json({message:"Lecture Removed"})
    } catch (error) {
        return res.status(500).json({message:`failed to remove Lecture ${error}`})
    }
}



// get Creator

export const getCreatorById = async (req,res) => {
    try {
        const {userId} = req.body

        const user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(404).json({message:"User is not Found"})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`Failed to get Creator ${error}`})
    }
    
}



//for Assignment

export const createAssignment = async (req,res) => {
    try {
        const {assignmentTitle} = req.body
        const {courseId} = req.params
        if(!assignmentTitle || !courseId){
            return res.status(400).json({message:"assignmentTitle is required"})
        }
        const assignment = await Assignment.create({assignmentTitle})
        const course = await Course.findById(courseId)
        if(course){
            course.assignments.push(assignment._id)
        }
        await course.populate("assignments")
        await course.save()
        return res.status(201).json({assignment, course})

    } catch (error) {
        return res.status(500).json({message:`failed to create Assignment ${error}`})
    }
}

export const getCourseAssignment = async (req,res) => {
    try {
        const {courseId} = req.params
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Course is not found"})
        }
        await course.populate("assignments")
        await course.save()
        return res.status(200).json(course)
        

    } catch (error) {
        return res.status(500).json({message:`failed to getCourseAssignment ${error}`})
    }
}



export const editAssignment = async (req, res) => {
    try {

        const { assignmentId } = req.params
        // const { assignmentTitle, assignmentContent, videoUrl } = req.body
        const { assignmentTitle, assignmentContent, dueDate } = req.body

        const assignment = await Assignment.findById(assignmentId)

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" })
        }

        // Update fields
        if (assignmentTitle)
            assignment.assignmentTitle = assignmentTitle

        if (assignmentContent)
            assignment.assignmentContent = assignmentContent

        if (dueDate)
            assignment.dueDate = dueDate

        await assignment.save()

        return res.status(200).json(assignment)

    } catch (error) {
        return res.status(500).json({
            message: `failed to edit Assignment ${error}`
        })
    }
}

export const removeAssignment = async (req,res) => {
    try {
        const {assignmentId} = req.params
        const assignment = await Assignment.findByIdAndDelete(assignmentId)
        if(!assignment){
            return res.status(404).json({message:"Assignment is not found"})
        }
        
        await Course.updateOne(
            {assignments:assignmentId},
            {$pull:{assignments:assignmentId}}
        )
        return res.status(200).json({message:"Assignment Removed"})
    } catch (error) {
        return res.status(500).json({message:`failed to remove Assignment ${error}`})
    }
}




// for Submission

export const submitAssignment = async (req, res) => {

    try {

        const { assignmentId, courseId } =
        req.params;

        const { submissionContent, studentName, rollNumber } = req.body;

        // const studentId = req.user._id;
        const studentId = req.userId;

        if (!submissionContent || !studentName ||!rollNumber) {
            return res.status(400).json({
                message: "Submission content required"
            });
        }

        const submission =
        await Submission.create({

            assignmentId,
            courseId,
            studentId,
            studentName,   // ✅
            rollNumber,   // ✅
            submissionContent

        });

        return res.status(201).json(
            submission
        );

    } catch (error) {

        return res.status(500).json({
            message:
            `failed to submit assignment ${error.message}`
        });

    }

};

export const getSubmissionByAssignment =
async (req, res) => {

    try {

        const { assignmentId } =
        req.params;

        const submissions =
        await Submission.find({ assignmentId }).populate("studentId", "name email");

        return res.status(200)
        .json(submissions);

    } catch (error) {

        return res.status(500).json({
            message:
            `failed to get submissions ${error.message}`
        });

    }

};



export const removeSubmission = async (req,res) => {
    try {
        const {submissionId} = req.params
        const submission = await Submission.findByIdAndDelete(submissionId)
        if(!submission){
            return res.status(404).json({message:"Submit Assignment is not found"})
        }
        
        await Course.updateOne(
            {submissions:submissionId},
            {$pull:{submissions:submissionId}}
        )
        return res.status(200).json({message:"Submit Assignment Removed"})
    } catch (error) {
        return res.status(500).json({message:`failed to remove Submit Assignment ${error}`})
    }
}


// for Grade
// export const gradeSubmission =
// async (req, res) => {

//     try {

//         const { submissionId } =
//         req.params;

//         const { marks, feedback } =
//         req.body;

//         const submission =
//         await Submission.findById(
//             submissionId
//         );

//         if (!submission) {

//             return res.status(404).json({
//                 message: "Submission not found"
//             });

//         }

//         // Update marks
//         if (marks !== undefined) {

//             submission.marks = marks;

//         }

//         // Update feedback
//         if (feedback !== undefined) {

//             submission.feedback = feedback;

//         }

//         await submission.save();

//         return res.status(200).json(
//             submission
//         );

//     }

//     catch (error) {

//         return res.status(500).json({
//             message:
//             `failed to grade submission ${error.message}`
//         });

//     }

// };

export const gradeSubmission =
async (req,res)=>{

try{

const {submissionId}
= req.params;

const {marks,feedback}
= req.body;

const submission =
await Submission.findById(
submissionId
);

// New
if(!submission){
return res.status(404).json({
message:"Submission not found"
});
}

submission.marks =
marks;
// Number(marks);

submission.feedback =
feedback;

await submission.save();

res.json(submission);

}

catch(error){

res.status(500).json({
message:error.message
});

}

}

// for single Submission
export const getSingleSubmission =
async (req,res)=>{

try{

const {submissionId}
= req.params;

const submission =
await Submission.findById(
submissionId
);

res.json(submission);

}

catch(error){

res.status(500).json({
message:error.message
});

}

}



export const getStudentSubmission =
async (req, res) => {

    try {

        const { assignmentId } =
        req.params;

        const studentId = req.userId;

        const submission =
        await Submission.findOne({

            assignmentId,
            studentId

        })
        
        // New
        .sort({ createdAt: -1 });

        return res.status(200)
        .json(submission);

    }

    catch (error) {

        return res.status(500).json({
            message:
            `failed to get submission ${error.message}`
        });

    }

};













// In Admin
// import Course from "../model/courseModel.js";


// GET ALL COURSES

export const getAllCourses = async (req, res) => {

  try {

    const courses =
      await Course.find()
      .populate("creator", "name email");

    res.json(courses);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// ADD COURSE

export const addCourse = async (req, res) => {

  try {

    const course =
      await Course.create({
        ...req.body,
        isActive: true
      });

    res.status(201).json(course);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// UPDATE COURSE

export const updateCourse = async (req, res) => {

  try {

    const { id } = req.params;

    const updated =
      await Course.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// DISABLE COURSE

// export const disableCourse = async (req, res) => {

//   try {

//     await Course.findByIdAndUpdate(
//       req.params.id,
//       { isActive: false }
//     );

//     res.json({
//       message: "Course Disabled"
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }

// };



// // ENABLE COURSE

// export const enableCourse = async (req, res) => {

//   try {

//     await Course.findByIdAndUpdate(
//       req.params.id,
//       { isActive: true }
//     );

//     res.json({
//       message: "Course Enabled"
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }

// };


// --- now ----
// Disable Course
export const disableCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      message: "Course disabled successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to disable course",
      error: error.message,
    });
  }
};

// Enable Course
export const enableCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    return res.status(200).json({
      message: "Course enabled successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to enable course",
      error: error.message,
    });
  }
};





// in admin for lecture
// import Course from "../model/courseModel.js";


// ADD LECTURE

export const addLecture = async (req, res) => {

  try {

    const { courseId } = req.params;

    const course =
      await Course.findById(courseId);

    course.lectures.push({
      ...req.body,
      isActive: true
    });

    await course.save();

    res.json({
      message: "Lecture Added"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// UPDATE LECTURE

export const updateLecture = async (req, res) => {

  try {

    const { courseId, lectureId } = req.params;

    const course =
      await Course.findById(courseId);

    const lecture =
      course.lectures.id(lectureId);

    Object.assign(
      lecture,
      req.body
    );

    await course.save();

    res.json({
      message: "Lecture Updated"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// DISABLE LECTURE

export const disableLecture = async (req, res) => {

  const { courseId, lectureId } = req.params;

  const course =
    await Course.findById(courseId);

  const lecture =
    course.lectures.id(lectureId);

  lecture.isActive = false;

  await course.save();

  res.json({
    message: "Lecture Disabled"
  });

};



// ENABLE LECTURE

export const enableLecture = async (req, res) => {

  const { courseId, lectureId } = req.params;

  const course =
    await Course.findById(courseId);

  const lecture =
    course.lectures.id(lectureId);

  lecture.isActive = true;

  await course.save();

  res.json({
    message: "Lecture Enabled"
  });

};