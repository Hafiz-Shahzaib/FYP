// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { serverUrl } from "../../App";
// import { toast } from "react-toastify";
// import { FaEdit, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function AdminCourses() {

//   const navigate = useNavigate();

//   const [courses, setCourses] = useState([]);

//   const fetchCourses = async () => {

//     const res =
//       await axios.get(
//         serverUrl + "/api/admin/courses"
//       );

//     setCourses(res.data);

//   };

//   useEffect(() => {

//     fetchCourses();

//   }, []);



//   // const handleDisable = async (id) => {

//   //   await axios.delete(
//   //     serverUrl +
//   //     `/api/admin/disable-course/${id}`
//   //   );

//   //   toast.success("Course Disabled");

//   //   fetchCourses();

//   // };

//   const handleDisable = async (id) => {
//   try {
//     await axios.delete(
//       `${serverUrl}/api/admin/disable-course/${id}`
//     );

//     toast.success("Course Disabled");
//     fetchCourses();
//   } catch (error) {
//     toast.error(
//       error.response?.data?.message ||
//       "Failed to disable course"
//     );
//   }
// };



//   // const handleEnable = async (id) => {

//   //   await axios.put(
//   //     serverUrl +
//   //     "/api/admin/enable-course/" + id
//   //   );

//   //   toast.success("Course Enabled");

//   //   fetchCourses();

//   // };

//   const handleEnable = async (id) => {
//   try {
//     await axios.put(
//       `${serverUrl}/api/admin/enable-course/${id}`
//     );

//     toast.success("Course Enable");
//     fetchCourses();
//   } catch (error) {
//     toast.error(
//       error.response?.data?.message ||
//       "Failed to enable course"
//     );
//   }
// };



//   return (

//     <div className="p-5">

//       <div className="flex justify-between mb-5">

//         <h1 className="text-2xl font-bold">

//           Admin Course Management

//         </h1>

//         <button
//           onClick={() =>
//             navigate("add-course")
//           }
//           className="bg-green-500 text-white px-4 py-2 rounded flex gap-2"
//         >

//           <FaPlus />

//           Add Course

//         </button>

//       </div>



//       {/* <table className="min-w-full border"> */}
//     <table className="min-w-full border border-gray-300">

//         <thead className="bg-gray-200">

//           <tr>

//             <th>#</th>

//             <th>Title</th>

//             <th>Category</th>

//             <th>Level</th>

//             <th>Status</th>

//             <th>Action</th>

//           </tr>

//         </thead>

//         <tbody>

//           {courses.map(
//             (course, index) => (

//             <tr
//               key={course._id}
//               className="text-center"
//             >

//               <td>{index+1}</td>

//               <td>{course.title}</td>

//               <td>{course.category}</td>

//               <td>{course.level}</td>

//               <td>

//                 {course.isActive
//                   ? "Active"
//                   : "Disabled"}

//               </td>

//               <td className="flex gap-2 justify-center">

//                 <button
//                   onClick={() =>
//                     navigate(
//                       `admin-edit-course/${course._id}`
//                     )
//                   }
//                   className="bg-blue-500 text-white px-2 py-1"
//                 >

//                   <FaEdit />

//                 </button>



//                 {course.isActive ? (

//                   <button
//                     onClick={() =>
//                       handleDisable(course._id)
//                     }
//                     className="bg-red-500 text-white px-2"
//                   >

//                     Disable

//                   </button>

//                 ) : (

//                   <button
//                     onClick={() =>
//                       handleEnable(course._id)
//                     }
//                     className="bg-green-500 text-white px-2"
//                   >

//                     Enable

//                   </button>

//                 )}

//               </td>

//             </tr>

//           ))

//           }

//         </tbody>

//       </table>

//     </div>

//   );

// }

// export default AdminCourses;













import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import img from "../../assets/empty.jpg"
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminCourses() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {

        const res =
            await axios.get(
                serverUrl + "/api/admin/courses"
            );

        setCourses(res.data);

    };

    useEffect(() => {

        fetchCourses();

    }, []);


    const handleDisable = async (id) => {
        try {
            await axios.delete(
                `${serverUrl}/api/admin/disable-course/${id}`
            );

            toast.success("Course Disabled");
            fetchCourses();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to disable course"
            );
        }
    };


    const handleEnable = async (id) => {
        try {
            await axios.put(
                `${serverUrl}/api/admin/enable-course/${id}`
            );

            toast.success("Course Enable");
            fetchCourses();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to enable course"
            );
        }
    };



    return (

        <div className='flex min-h-screen bg-gray-100'>
            <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
                    <div className='flex items-center justify-center gap-3'>
                        <FaArrowLeftLong className='w-[22px] h-[22px] cursor-pointer' onClick={() => navigate(-1)} />
                        <h1 className='text-2xl font-semibold'>Admin Course Management</h1>
                    </div>
                    <button className='bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500' onClick={() => navigate("add-course")}>Create Course</button>
                </div>

                {/* for Large Screen */}

                <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
                    <table className='min-w-full text-sm'>
                        <thead className='border-b bg-gray-50'>
                            <tr>
                                <th className='text-left py-3 px-4'>#</th>
                                <th className='text-left py-3 px-4'>Title</th>
                                {/* <th className='text-left py-3 px-4'>Category</th> */}
                                <th className='text-left py-3 px-4'>Status</th>
                                {/* <th className='text-left py-3 px-4'>Level</th> */}
                                <th className='text-left py-3 px-4'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={index} className='border-b hover:bg-gray-50 transition duration-200'>
                                  <td className='px-4 py-3'>{index+1}</td>
                                    <td className='py-3 px-4 flex items-center gap-4'>
                                                    {course?.thumbnail ?<img src={course?.thumbnail} className='w-25 h-14 object-cover rounded-md' alt="" />:<img src={img} className='w-25 h-14 object-cover rounded-md' alt="" />}<span> {course?.title}</span>
                                    
                                                  </td>
                                    {/* <td className='px-4 py-3'>{course.title}</td> */}
                                    {/* <td className='px-4 py-3'>{course.category}</td> */}
                                    {/* <td className='px-4 py-3'><FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() => navigate(`admin-edit-course/${course._id}`)} /></td> */}
                                    <td className='px-4 py-3'><span className={`px-3 py-1 rounded-full text-xs ${course.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} `}>{course.isActive ? "Active" : "Disable"}</span></td>

                                    {/* side */}

                                    {/* <td className='px-4 py-3'><FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() => navigate(`admin-edit-course/${course._id}`)} /></td> */}

                                    <td className='px-4 py-3'>
                                        {/* <FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() => navigate(`admin-edit-course/${course._id}`)} /> */}
                                        {course.isActive ? (

                                            <button
                                                onClick={() =>
                                                    handleDisable(course._id)
                                                }
                                                className="bg-red-500 text-white px-2"
                                            >

                                                Disable

                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleEnable(course._id)
                                                }
                                                className="bg-green-500 text-white px-2"
                                            >

                                                Enable

                                            </button>

                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <p className='text-center text-sm text-gray-400 mt-6'>A list of your recent courses.</p>
                </div>

                {/* for Small Screen table */}

                <div className='md:hidden space-y-4'>
                    {courses.map((course, index) => (<div key={index} className='bg-white rounded-lg shadow p-4 flex flex-col gap-3'>
                        <div className='flex gap-4 items-center'>

                            {/* Require 1 Step */}
                            {index+1}

                            {course?.thumbnail?<img src={course?.thumbnail} alt="" className='w-16 h-16 rounded-md object-cover'/>:<img src={img} alt="" className='w-16 h-16 rounded-md object-cover'/>}

                            <div className='flex-1'>
                                <h2 className='font-medium text-sm'>{course.title}</h2>
                            </div>
                            {/* <FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={()=>navigate(`admin-edit-course/${course._id}`)}/> */}
                            
                            {/* now */}

                            {/* {course.isActive ? (

                                            <button
                                                onClick={() =>
                                                    handleDisable(course._id)
                                                }
                                                className="bg-red-500 text-white px-2"
                                            >

                                                Disable

                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleEnable(course._id)
                                                }
                                                className="bg-green-500 text-white px-2"
                                            >

                                                Enable

                                            </button>

                                        )} */}

                                        

                        </div>
                        <span className={`w-fit px-3 py-1 text-xs rounded-full  ${course.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}  `}>{course.isActive? "Active":"Disable"}</span>

                        {/* <span className='w-  px-3 py-1 text-xs rounded-md'>{course.isActive ? (

                                            <button
                                                onClick={() =>
                                                    handleDisable(course._id)
                                                }
                                                className="bg-red-500 text-white px-2"
                                            >

                                                Disable

                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleEnable(course._id)
                                                }
                                                className="bg-green-500 text-white px-2"
                                            >

                                                Enable

                                            </button>

                                        )}</span> */}

                                        {course.isActive ? (

                                            <button
                                                onClick={() =>
                                                    handleDisable(course._id)
                                                }
                                                className="bg-red-500 text-white px-2"
                                            >

                                                Disable

                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleEnable(course._id)
                                                }
                                                className="bg-green-500 text-white px-2"
                                            >

                                                Enable

                                            </button>

                                        )}
                    </div>))}
                    <p className='text-center text-sm text-gray-400 mt-4'>A list of your recent courses.</p>
                </div>

            </div>
        </div>

    );

}

export default AdminCourses;