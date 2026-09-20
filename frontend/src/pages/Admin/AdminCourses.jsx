import React, { useEffect, useState } from "react";
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



  // const handleDisable = async (id) => {

  //   await axios.delete(
  //     serverUrl +
  //     `/api/admin/disable-course/${id}`
  //   );

  //   toast.success("Course Disabled");

  //   fetchCourses();

  // };

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



  // const handleEnable = async (id) => {

  //   await axios.put(
  //     serverUrl +
  //     "/api/admin/enable-course/" + id
  //   );

  //   toast.success("Course Enabled");

  //   fetchCourses();

  // };

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

    <div className="p-5">

      <div className="flex justify-between mb-5">

        <h1 className="text-2xl font-bold">

          Admin Course Management

        </h1>

        <button
          onClick={() =>
            navigate("add-course")
          }
          className="bg-green-500 text-white px-4 py-2 rounded flex gap-2"
        >

          <FaPlus />

          Add Course

        </button>

      </div>



      {/* <table className="min-w-full border"> */}
    <table className="min-w-full border border-gray-300">

        <thead className="bg-gray-200">

          <tr>

            <th>#</th>

            <th>Title</th>

            <th>Category</th>

            <th>Level</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {courses.map(
            (course, index) => (

            <tr
              key={course._id}
              className="text-center"
            >

              <td>{index+1}</td>

              <td>{course.title}</td>

              <td>{course.category}</td>

              <td>{course.level}</td>

              <td>

                {course.isActive
                  ? "Active"
                  : "Disabled"}

              </td>

              <td className="flex gap-2 justify-center">

                <button
                  onClick={() =>
                    navigate(
                      `admin-edit-course/${course._id}`
                    )
                  }
                  className="bg-blue-500 text-white px-2 py-1"
                >

                  <FaEdit />

                </button>



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

          ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default AdminCourses;