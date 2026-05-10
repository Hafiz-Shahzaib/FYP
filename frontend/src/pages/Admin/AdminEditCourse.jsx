import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditCourse() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title:"",
    subTitle:"",
    category:"",
    level:"",
    // price:""
  });

  // FETCH COURSE

  const fetchCourse = async () => {

    try {

      const res =
        await axios.get(
          serverUrl + "/api/admin/courses"
        );

      const course =
        res.data.find(c => c._id === id);

      setForm({

        title:course.title,
        subTitle:course.subTitle,
        category:course.category,
        level:course.level,
        // price:course.price

      });

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(()=>{

    fetchCourse();

  },[]);



  // UPDATE COURSE

  const handleUpdate = async () => {

    try {

      await axios.put(

        serverUrl +
        "/api/admin/update-course/" + id,

        form

      );

      toast.success("Course Updated");

      navigate(-1);

    } catch (error) {

      toast.error("Update failed");

    }

  };



  return (

    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">

        Edit Course

      </h1>

      <div className="flex flex-col gap-3 w-80">

        <input
          value={form.title}
          placeholder="Title"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, title:e.target.value})
          }
        />

        <input
          value={form.subTitle}
          placeholder="Subtitle"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, subTitle:e.target.value})
          }
        />

        <input
          value={form.category}
          placeholder="Category"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, category:e.target.value})
          }
        />

        <input
          value={form.level}
          placeholder="Level"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, level:e.target.value})
          }
        />

        {/* <input
          value={form.price}
          type="number"
          placeholder="Price"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, price:e.target.value})
          }
        /> */}

        <button
          onClick={handleUpdate}
          className="bg-black text-white py-2"
        >

          Update Course

        </button>

      </div>

    </div>

  );

}

export default AdminEditCourse;






// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// // import { FaArrowLeftLong, FaEdit } from "react-icons/fa6";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// import { ClipLoader } from "react-spinners";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "react-toastify";
// import img from "../../assets/empty.jpg";
// import { serverUrl } from "../../App";
// import { setCourseData } from "../../redux/courseSlice";

// function AdminEditCourse() {
//   const navigate = useNavigate();
//   const { courseId } = useParams();
//   const thumb = useRef();
//   const dispatch = useDispatch();
//   const { courseData } = useSelector((state) => state.course);

//   const [selectCourse, setSelectCourse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [loading1, setLoading1] = useState(false);

//   const [title, setTitle] = useState("");
//   const [subtitle, setSubTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [level, setLevel] = useState("");
//   const [price, setPrice] = useState("");
//   const [frontendImage, setFrontendImage] = useState(img);
//   const [backendImage, setBackendImage] = useState(null);
//   const [isPublished, setIsPublished] = useState(false);

//   // HANDLE THUMBNAIL UPLOAD
//   const handleThumbnail = (e) => {
//     const file = e.target.files[0];
//     setBackendImage(file);
//     setFrontendImage(URL.createObjectURL(file));
//   };

//   // FETCH COURSE BY ID
//   const getCourseById = async () => {
//     try {
//       const result = await axios.get(
//         serverUrl + `/api/course/getcourse/${courseId}`,
//         { withCredentials: true }
//       );
//       setSelectCourse(result.data);
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch course");
//     }
//   };

//   // SET FORM DATA WHEN COURSE IS LOADED
//   useEffect(() => {
//     if (selectCourse) {
//       setTitle(selectCourse.title || "");
//       setSubTitle(selectCourse.subtitle || "");
//       setDescription(selectCourse.description || "");
//       setCategory(selectCourse.category || "");
//       setLevel(selectCourse.level || "");
//       setPrice(selectCourse.price || "");
//       setFrontendImage(selectCourse.thumbnail || img);
//       setIsPublished(selectCourse.isPublished);
//     }
//   }, [selectCourse]);

//   useEffect(() => {
//     getCourseById();
//   }, []);

//   // SAVE COURSE CHANGES
//   const handleEditCourse = async () => {
//     setLoading(true);
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("subTitle", subtitle);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("level", level);
//     formData.append("price", price);
//     formData.append("thumbnail", backendImage);
//     formData.append("isPublished", isPublished);

//     try {
//       const result = await axios.post(
//         serverUrl + `/api/course/editcourse/${courseId}`,
//         formData,
//         { withCredentials: true }
//       );
//       const updateData = result.data;

//       if (updateData.isPublished) {
//         const updatedCourses = courseData.map((c) =>
//           c._id === courseId ? updateData : c
//         );
//         if (!courseData.some((c) => c._id === courseId)) {
//           updatedCourses.push(updateData);
//         }
//         dispatch(setCourseData(updatedCourses));
//       } else {
//         const filterCourses = courseData.filter((c) => c._id !== courseId);
//         dispatch(setCourseData(filterCourses));
//       }

//       setLoading(false);
//       toast.success("Course Updated");
//       navigate("/dashboard/courses");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       toast.error(error.response?.data?.message || "Update failed");
//     }
//   };

//   // REMOVE COURSE
//   const handleRemoveCourse = async () => {
//     setLoading1(true);
//     try {
//       await axios.delete(serverUrl + `/api/course/remove/${courseId}`, {
//         withCredentials: true,
//       });
//       const filterCourses = courseData.filter((c) => c._id !== courseId);
//       dispatch(setCourseData(filterCourses));
//       setLoading1(false);
//       toast.success("Course Removed");
//       navigate("/dashboard/courses");
//     } catch (error) {
//       console.log(error);
//       setLoading1(false);
//       toast.error(error.response?.data?.message || "Remove failed");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
//       {/* Top Bar */}
//       <div className="flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative">
//         <FaArrowLeftLong
//           className="top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer"
//           onClick={() => navigate("/dashboard/courses")}
//         />
//         <h2 className="text-2xl font-semibold md:pl-[60px]">
//           Add Detail Information regarding the Course
//         </h2>
//         <div className="space-x-2 space-y-2">
//           <button
//             className="bg-black text-white px-4 py-2 rounded-md"
//             // onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}
//             onClick={() => navigate(`/createlecture/${selectCourse?._id}`)}

//           >
//             Go to Lecture page
//           </button>
//         </div>
//       </div>

//       {/* Form Details */}
//       <div className="bg-gray-50 p-6 rounded-md">
//         <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
//         <div className="space-x-2 space-y-2">
//           {!isPublished ? (
//             <button
//               className="bg-green-100 text-green-600 px-4 py-2 rounded-md border-1"
//               onClick={() => setIsPublished((prev) => !prev)}
//             >
//               Click to Publish
//             </button>
//           ) : (
//             <button
//               className="bg-red-100 text-red-600 px-4 py-2 rounded-md border-1"
//               onClick={() => setIsPublished((prev) => !prev)}
//             >
//               Click to UnPublish
//             </button>
//           )}
//           <button
//             className="bg-red-600 text-white px-4 py-2 rounded-md border-1"
//             onClick={handleRemoveCourse}
//           >
//             {loading1 ? <ClipLoader size={20} color="white" /> : "Remove Course"}
//           </button>
//         </div>

//         <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               className="w-full border px-4 py-2 rounded-md"
//               placeholder="CourseTitle"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           {/* Subtitle */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               SubTitle
//             </label>
//             <input
//               type="text"
//               className="w-full border px-4 py-2 rounded-md"
//               placeholder="Course SubTitle"
//               value={subtitle}
//               onChange={(e) => setSubTitle(e.target.value)}
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               className="w-full border px-4 py-2 rounded-md h-24 resize-none"
//               placeholder="Course Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>
//           </div>

//           {/* Category, Level, Price */}
//           <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Course Category
//               </label>
//               <select
//                 className="w-full border px-4 py-2 rounded-md bg-white"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Select category</option>
//                 <option value="App Development">App Development</option>
//                 <option value="AI/ML">AI/ML</option>
//                 <option value="AI Tools">AI Tools</option>
//                 <option value="Data Science">Data Science</option>
//                 <option value="Data Analytics">Data Analytics</option>
//                 <option value="Ethical Hacking">Ethical Hacking</option>
//                 <option value="UI UX Designing">UI UX Designing</option>
//                 <option value="Web Development">Web Development</option>
//                 <option value="Others">Others</option>
//               </select>
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Course Level
//               </label>
//               <select
//                 className="w-full border px-4 py-2 rounded-md bg-white"
//                 value={level}
//                 onChange={(e) => setLevel(e.target.value)}
//               >
//                 <option value="">Select Level</option>
//                 <option value="Beginner">Beginner</option>
//                 <option value="Intermediate">Intermediate</option>
//                 <option value="Advanced">Advanced</option>
//               </select>
//             </div>
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Course Price (INR)
//               </label>
//               <input
//                 type="number"
//                 className="w-full border px-4 py-2 rounded-md"
//                 placeholder="₹"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Thumbnail */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Course Thumbnail
//             </label>
//             <input
//               type="file"
//               hidden
//               ref={thumb}
//               accept="image/*"
//               onChange={handleThumbnail}
//             />
//           </div>
//           <div className="relative w-[300px] h-[170px]">
//             <img
//               src={frontendImage}
//               alt=""
//               className="w-[100%] h-[100%] border-1 border-black rounded-[5px] cursor-pointer"
//               onClick={() => thumb.current.click()}
//             />
//             <FaEdit
//               className="w-[20px] h-[20px] absolute top-2 right-2 cursor-pointer"
//               onClick={() => thumb.current.click()}
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex items-center justify-start gap-[15px]">
//             <button
//               className="bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black px-4 py-2 rounded-md"
//               onClick={() => navigate("/courses")}
//             >
//               Cancel
//             </button>
//             <button
//               className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500"
//               onClick={handleEditCourse}
//             >
//               {loading ? <ClipLoader size={30} color="white" /> : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminEditCourse;