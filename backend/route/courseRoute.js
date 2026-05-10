import express from "express"
import { createAssignment, createCourse, createLecture, editAssignment, editCourse, editLecture, getCourseAssignment, getCourseById, getCourseLecture, getCreatorById, getCreatorCourses, getPublishedCourses, getSingleSubmission, getStudentSubmission, getSubmissionByAssignment, gradeSubmission, removeAssignment, removeCourse, removeLecture, submitAssignment } from "../controller/courseController.js"
import isAuth from '../middleware/isAuth.js';
import upload from '../middleware/multer.js';
import { searchWithAi } from "../controller/searchController.js";

const courseRouter = express.Router()
// for Courses
courseRouter.post("/create",isAuth, createCourse)
courseRouter.get("/getpublished", getPublishedCourses)
courseRouter.get("/getcreator",isAuth, getCreatorCourses)
courseRouter.post("/editcourse/:courseId",isAuth, upload.single("thumbnail"), editCourse)
courseRouter.get("/getcourse/:courseId",isAuth, getCourseById)
courseRouter.delete("/remove/:courseId",isAuth, removeCourse)


//for Lcetures

courseRouter.post("/createlecture/:courseId", isAuth, createLecture)
courseRouter.get("/courselecture/:courseId", isAuth, getCourseLecture)
// courseRouter.post("/editlecture/:lectureId", isAuth, upload.single("videoUrl"), editLecture)

// ChatGpt
courseRouter.post("/editlecture/:lectureId", isAuth, upload.fields([{ name: "videoUrl", maxCount: 1 },{ name: "lectureImage", maxCount: 1 }]), editLecture)


courseRouter.delete("/removelecture/:lectureId", isAuth, removeLecture)
courseRouter.post("/creator", isAuth, getCreatorById)



//for Assignments

courseRouter.post("/createassignment/:courseId", isAuth, createAssignment)
courseRouter.get("/courseassignment/:courseId", isAuth, getCourseAssignment)

// ChatGpt
courseRouter.post("/editassignment/:assignmentId", isAuth, upload.fields([{ name: "videoUrl", maxCount: 1 },{ name: "lectureImage", maxCount: 1 }]), editAssignment)


courseRouter.delete("/removeassignment/:assignmentId", isAuth, removeAssignment)


// for Submission

courseRouter.post(
"/submitassignment/:courseId/:assignmentId", isAuth,submitAssignment);

courseRouter.get("/viewsubmission/:assignmentId",isAuth, getSubmissionByAssignment);
courseRouter.delete("/removesubmission/:submissionId", isAuth, removeAssignment)
// courseRouter.get("/viewsubmission/:courseId",isAuth, getSubmissionByAssignment);


// for Grade
courseRouter.post("/gradesubmission/:submissionId",isAuth, gradeSubmission);
courseRouter.get("/getsubmission/:submissionId",isAuth, getSingleSubmission);
courseRouter.get("/studentsubmission/:assignmentId",isAuth, getStudentSubmission);



// for search
courseRouter.post("/search", searchWithAi)

export default courseRouter