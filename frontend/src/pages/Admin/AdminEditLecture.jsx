import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function AdminEditLecture() {

  const { courseId, lectureId } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({

    lectureTitle:"",
    videoUrl:"",
    lectureContent:"",
    isPreviewFree:false

  });



  const fetchLecture = async () => {

    try {

      const res =
        await axios.get(
          serverUrl + "/api/admin/courses"
        );

      const course =
        res.data.find(
          c => c._id === courseId
        );

      const lecture =
        course.lectures.find(
          l => l._id === lectureId
        );

      setForm(lecture);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(()=>{

    fetchLecture();

  },[]);



  const handleUpdate = async () => {

    await axios.put(

      serverUrl +
      `/api/admin/update-lecture/${courseId}/${lectureId}`,

      form

    );

    toast.success("Lecture Updated");

    navigate(-1);

  };



  return (

    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">

        Edit Lecture

      </h1>

      <div className="flex flex-col gap-3 w-96">

        <input
          value={form.lectureTitle}
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({
              ...form,
              lectureTitle:e.target.value
            })
          }
        />

        <input
          value={form.videoUrl}
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({
              ...form,
              videoUrl:e.target.value
            })
          }
        />

        <textarea
          value={form.lectureContent}
          rows={5}
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({
              ...form,
              lectureContent:e.target.value
            })
          }
        />

        <label className="flex gap-2">

          <input
            type="checkbox"
            checked={form.isPreviewFree}
            onChange={(e)=>
              setForm({
                ...form,
                isPreviewFree:e.target.checked
              })
            }
          />

          Preview Free

        </label>

        <button
          onClick={handleUpdate}
          className="bg-black text-white py-2"
        >

          Update Lecture

        </button>

      </div>

    </div>

  );

}

export default AdminEditLecture;