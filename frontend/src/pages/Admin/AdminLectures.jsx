import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaPlus } from "react-icons/fa";

function AdminLectures() {

  const { courseId } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);



  const fetchCourse = async () => {

    try {

      const res =
        await axios.get(
          serverUrl + "/api/admin/courses"
        );

      const selected =
        res.data.find(
          c => c._id === courseId
        );

      setCourse(selected);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchCourse();

  },[]);



  // DISABLE LECTURE

  const handleDisable = async (lectureId) => {

    await axios.delete(

      serverUrl +
      `/api/admin/disable-lecture/${courseId}/${lectureId}`

    );

    toast.success("Lecture Disabled");

    fetchCourse();

  };



  // ENABLE LECTURE

  const handleEnable = async (lectureId) => {

    await axios.put(

      serverUrl +
      `/api/admin/enable-lecture/${courseId}/${lectureId}`

    );

    toast.success("Lecture Enabled");

    fetchCourse();

  };



  return (

    <div className="p-5">

      <div className="flex justify-between mb-5">

        <h1 className="text-2xl font-bold">

          Manage Lectures

        </h1>

        <button
          onClick={() =>
            navigate(
              `add-lecture`
            )
          }
          className="bg-green-500 text-white px-4 py-2 flex gap-2"
        >

          <FaPlus />

          Add Lecture

        </button>

      </div>



      <table className="min-w-full border">

        <thead className="bg-gray-200">

          <tr>

            <th>#</th>

            <th>Lecture Title</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {course?.lectures?.map(

            (lecture,index)=>(

            <tr
              key={lecture._id}
              className="text-center"
            >

              <td>{index+1}</td>

              <td>
                {lecture.lectureTitle}
              </td>

              <td>

                {lecture.isActive
                  ? "Active"
                  : "Disabled"}

              </td>

              <td className="flex gap-2 justify-center">

                <button
                  onClick={()=>navigate(
                    `edit-lecture/${lecture._id}`
                  )}
                  className="bg-blue-500 text-white px-2"
                >

                  <FaEdit />

                </button>

                {lecture.isActive ? (

                  <button
                    onClick={()=>
                      handleDisable(
                        lecture._id
                      )
                    }
                    className="bg-red-500 text-white px-2"
                  >

                    Disable

                  </button>

                ) : (

                  <button
                    onClick={()=>
                      handleEnable(
                        lecture._id
                      )
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

export default AdminLectures;