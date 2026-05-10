import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function AdminAddLecture() {

  const { courseId } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({

    lectureTitle:"",
    videoUrl:"",
    lectureContent:"",
    isPreviewFree:false

  });



  const handleSubmit = async () => {

    try {

      await axios.post(

        serverUrl +
        "/api/admin/add-lecture/" + courseId,

        form

      );

      toast.success("Lecture Added");

      navigate(-1);

    } catch (error) {

      console.log(error);

    }

  };



  return (

    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">

        Add Lecture

      </h1>

      <div className="flex flex-col gap-3 w-96">

        <input
          placeholder="Lecture Title"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({
              ...form,
              lectureTitle:e.target.value
            })
          }
        />

        <input
          placeholder="Video URL"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({
              ...form,
              videoUrl:e.target.value
            })
          }
        />

        <textarea
          placeholder="Lecture Content"
          className="border px-2 py-1"
          rows={5}
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
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2"
        >

          Save Lecture

        </button>

      </div>

    </div>

  );

}

export default AdminAddLecture;