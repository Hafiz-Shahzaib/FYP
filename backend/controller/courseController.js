import uploadOnCloudinary from './../config/cloudinary.js';
import { uploadFileWithDetails } from "../config/cloudinary.js";
import Course from "../model/courseModel.js"
import Lecture from '../model/lectureModel.js';
import User from "../model/userModel.js"
import Assignment from '../model/assignmentModel.js';
import Submission from '../model/submissionModel.js';



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

// ================= ASSIGNMENT & SUBMISSION =================

const isEducator = async (userId) => {
  const user = await User.findById(userId).select("role");
  return user?.role === "educator";
};

const isCourseEducator = async (courseId, userId) => {
  const course = await Course.findById(courseId);
  if (!course) return { error: "Course not found", status: 404 };
  if (String(course.creator) !== String(userId)) {
    return { error: "You are not authorized to manage this course", status: 403 };
  }
  return { course };
};

const uploadMetadata = (result, file) => ({
  url: result.url,
  publicId: result.publicId,
  originalName: file.originalname,
  mimeType: file.mimetype,
  format: result.format,
  size: result.size,
});

const allowedAssignmentTypes = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const allowedSubmissionTypes = ["application/pdf"];


// CREATE ASSIGNMENT
export const createAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      assignmentTitle,
      assignmentContent = "",
      dueDate,
      maxMarks = 100,
    } = req.body;

    if (!(await isEducator(req.userId))) {
      return res.status(403).json({ message: "Educator access required" });
    }

    if (!assignmentTitle?.trim()) {
      return res.status(400).json({ message: "Assignment title is required" });
    }

    const access = await isCourseEducator(courseId, req.userId);
    if (access.error) {
      return res.status(access.status).json({ message: access.error });
    }

    if (dueDate && Number.isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({ message: "Invalid due date" });
    }

    const parsedMaxMarks = Number(maxMarks);
    if (!Number.isFinite(parsedMaxMarks) || parsedMaxMarks < 0) {
      return res.status(400).json({ message: "maxMarks must be 0 or greater" });
    }

    let assignmentFile = {};
    if (req.file) {
      if (!allowedAssignmentTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only PDF or image files are allowed" });
      }

      const uploaded = await uploadFileWithDetails(req.file.path);
      if (!uploaded) {
        return res.status(500).json({ message: "Assignment file upload failed" });
      }

      assignmentFile = uploadMetadata(uploaded, req.file);
    }

    const assignment = await Assignment.create({
      assignmentTitle: assignmentTitle.trim(),
      assignmentContent,
      dueDate: dueDate || undefined,
      courseId,
      createdBy: req.userId,
      assignmentFile,
      maxMarks: parsedMaxMarks,
    });

    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { assignments: assignment._id },
    });

    return res.status(201).json({ message: "Assignment created", assignment });
  } catch (error) {
    return res.status(500).json({ message: `Failed to create assignment: ${error.message}` });
  }
};


// GET COURSE ASSIGNMENTS
export const getCourseAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId)
      .populate("assignments");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// EDIT ASSIGNMENT
export const editAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (!(await isEducator(req.userId))) {
      return res.status(403).json({ message: "Educator access required" });
    }

    const access = await isCourseEducator(assignment.courseId, req.userId);
    if (access.error) {
      return res.status(access.status).json({ message: access.error });
    }

    const { assignmentTitle, assignmentContent, dueDate, maxMarks } = req.body;

    if (assignmentTitle !== undefined) {
      if (!assignmentTitle.trim()) {
        return res.status(400).json({ message: "Assignment title cannot be empty" });
      }
      assignment.assignmentTitle = assignmentTitle.trim();
    }

    if (assignmentContent !== undefined) {
      assignment.assignmentContent = assignmentContent;
    }

    if (dueDate !== undefined) {
      if (dueDate && Number.isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({ message: "Invalid due date" });
      }
      assignment.dueDate = dueDate || null;
    }

    if (maxMarks !== undefined) {
      const parsed = Number(maxMarks);
      if (!Number.isFinite(parsed) || parsed < 0) {
        return res.status(400).json({ message: "maxMarks must be 0 or greater" });
      }
      assignment.maxMarks = parsed;
    }

    if (req.file) {
      if (!allowedAssignmentTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only PDF or image files are allowed" });
      }

      const uploaded = await uploadFileWithDetails(req.file.path);
      if (!uploaded) {
        return res.status(500).json({ message: "Assignment file upload failed" });
      }

      assignment.assignmentFile = uploadMetadata(uploaded, req.file);
    }

    await assignment.save();
    return res.status(200).json({ message: "Assignment updated", assignment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// REMOVE ASSIGNMENT
export const removeAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (!(await isEducator(req.userId))) {
      return res.status(403).json({ message: "Educator access required" });
    }

    const access = await isCourseEducator(assignment.courseId, req.userId);
    if (access.error) {
      return res.status(access.status).json({ message: access.error });
    }

    await Submission.deleteMany({ assignmentId });
    await Assignment.findByIdAndDelete(assignmentId);

    await Course.updateOne(
      { _id: assignment.courseId },
      { $pull: { assignments: assignmentId } }
    );

    return res.status(200).json({ message: "Assignment and submissions removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// SUBMIT / RESUBMIT ASSIGNMENT
export const submitAssignment = async (req, res) => {
  try {
    const { courseId, assignmentId } = req.params;
    const studentId = req.userId;
    const { submissionContent = "", studentName = "", rollNumber = "" } = req.body;

    const student = await User.findById(studentId).select("role");
    if (!student || student.role !== "student") {
      return res.status(403).json({ message: "Student access required" });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const assignment = await Assignment.findOne({ _id: assignmentId, courseId });
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found in this course" });
    }

    const enrolled = course.enrolledStudent?.some(
      (id) => String(id) === String(studentId)
    );

    if (!enrolled) {
      return res.status(403).json({ message: "You are not enrolled in this course" });
    }

    if (assignment.dueDate && new Date() > new Date(assignment.dueDate)) {
      return res.status(400).json({ message: "Assignment deadline has passed" });
    }

    if (!req.file && !submissionContent.trim()) {
      return res.status(400).json({ message: "Upload a PDF or provide submission text" });
    }

    let submissionFile;
    if (req.file) {
      if (!allowedSubmissionTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only PDF submissions are allowed" });
      }

      const uploaded = await uploadFileWithDetails(req.file.path);
      if (!uploaded) {
        return res.status(500).json({ message: "Submission file upload failed" });
      }

      submissionFile = uploadMetadata(uploaded, req.file);
    }

    // One record per student/assignment; allow resubmission before deadline.
    const existing = await Submission.findOne({ assignmentId, studentId });

    if (existing) {
      existing.submissionContent = submissionContent;
      existing.studentName = studentName || existing.studentName;
      existing.rollNumber = rollNumber || existing.rollNumber;
      if (submissionFile) existing.submissionFile = submissionFile;

      // A resubmission requires re-grading.
      existing.marks = null;
      existing.feedback = "";
      existing.status = "submitted";
      existing.gradedAt = null;
      existing.submittedAt = new Date();

      await existing.save();
      return res.status(200).json({ message: "Assignment resubmitted", submission: existing });
    }

    const submission = await Submission.create({
      assignmentId,
      courseId,
      studentId,
      studentName,
      rollNumber,
      submissionContent,
      submissionFile: submissionFile || {},
    });

    return res.status(201).json({ message: "Assignment submitted", submission });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// EDUCATOR: VIEW ALL SUBMISSIONS FOR AN ASSIGNMENT
export const getSubmissionByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    if (!(await isEducator(req.userId))) {
      return res.status(403).json({ message: "Educator access required" });
    }

    const access = await isCourseEducator(assignment.courseId, req.userId);
    if (access.error) {
      return res.status(access.status).json({ message: access.error });
    }

    const submissions = await Submission.find({ assignmentId })
      .populate("studentId", "name email")
      .sort({ submittedAt: -1 });

    return res.status(200).json(submissions);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// STUDENT: REMOVE OWN UNGRADED SUBMISSION
export const removeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const submission = await Submission.findById(submissionId);

    if (!submission) return res.status(404).json({ message: "Submission not found" });

    if (String(submission.studentId) !== String(req.userId)) {
      return res.status(403).json({ message: "You can only remove your own submission" });
    }

    if (submission.status === "graded") {
      return res.status(400).json({ message: "Graded submissions cannot be removed" });
    }

    await Submission.findByIdAndDelete(submissionId);
    return res.status(200).json({ message: "Submission removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// EDUCATOR: GRADE SUBMISSION
export const gradeSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { marks, feedback = "" } = req.body;

    const submission = await Submission.findById(submissionId);
    if (!submission) return res.status(404).json({ message: "Submission not found" });

    const assignment = await Assignment.findById(submission.assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    if (!(await isEducator(req.userId))) {
      return res.status(403).json({ message: "Educator access required" });
    }

    const access = await isCourseEducator(assignment.courseId, req.userId);
    if (access.error) {
      return res.status(access.status).json({ message: access.error });
    }

    const parsedMarks = Number(marks);
    if (marks === undefined || !Number.isFinite(parsedMarks) ||
        parsedMarks < 0 || parsedMarks > assignment.maxMarks) {
      return res.status(400).json({
        message: `Marks must be between 0 and ${assignment.maxMarks}`,
      });
    }

    submission.marks = parsedMarks;
    submission.feedback = feedback;
    submission.status = "graded";
    submission.gradedAt = new Date();

    await submission.save();
    return res.status(200).json({ message: "Submission graded", submission });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSingleSubmission = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== "educator") {
      return res.status(403).json({
        message: "Educator access required"
      });
    }

    const submission = await Submission.findById(req.params.submissionId)
      .populate("studentId", "name email")
      .populate("assignmentId");

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    return res.status(200).json(submission);
  } catch (error) {
    return res.status(500).json({
      message: `Get submission failed: ${error.message}`
    });
  }
};

// STUDENT: VIEW OWN SUBMISSION FOR AN ASSIGNMENT
export const getStudentSubmission = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submission = await Submission.findOne({
      assignmentId,
      studentId: req.userId,
    });

    return res.status(200).json(submission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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