import express from "express";
import { addUserByAdmin, deleteUser, enableUser, getAllUsers, updateUser } from "../controller/adminController.js";
import { addCourse, addLecture, disableCourse, disableLecture, enableCourse, enableLecture, getAllCourses, updateCourse, updateLecture } from "../controller/courseController.js";
// import { getAllUsers, addUserByAdmin, deleteUser } from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/add-user", addUserByAdmin);
router.delete("/delete-user/:id", deleteUser);

// NEW ROUTE
router.put("/update-user/:id", updateUser);

// New feild add
router.put("/enable-user/:id", enableUser);



// COURSE ROUTES

router.get("/courses", getAllCourses);

router.post("/add-course", addCourse);

router.put("/update-course/:id", updateCourse);

router.delete("/disable-course/:id", disableCourse);

router.put("/enable-course/:id", enableCourse);



// LECTURE ROUTES

router.post(
  "/add-lecture/:courseId",
  addLecture
);

router.put(
  "/update-lecture/:courseId/:lectureId",
  updateLecture
);

router.delete(
  "/disable-lecture/:courseId/:lectureId",
  disableLecture
);

router.put(
  "/enable-lecture/:courseId/:lectureId",
  enableLecture
);

// export default router;

export default router;