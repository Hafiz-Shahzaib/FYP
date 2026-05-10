import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddCourse() {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    title:"",
    subTitle:"",
    category:"",
    level:"",
    // price:""

  });



  const handleSubmit = async () => {

    await axios.post(

      serverUrl + "/api/admin/add-course",

      form

    );

    toast.success("Course Added");

    navigate(-1);

  };



  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">

        Add Course

      </h1>

      <div className="flex flex-col gap-3 w-80">

        <input
          placeholder="Title"
          onChange={(e)=>
            setForm({
              ...form,
              title:e.target.value
            })
          }
        />

        <input
          placeholder="Subtitle"
          onChange={(e)=>
            setForm({
              ...form,
              subTitle:e.target.value
            })
          }
        />

        <input
          placeholder="Category"
          onChange={(e)=>
            setForm({
              ...form,
              category:e.target.value
            })
          }
        />

        <input
          placeholder="Level"
          onChange={(e)=>
            setForm({
              ...form,
              level:e.target.value
            })
          }
        />

        {/* <input
          placeholder="Price"
          type="number"
          onChange={(e)=>
            setForm({
              ...form,
              price:e.target.value
            })
          }
        /> */}

        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white py-2 rounded"
        >

          Save Course

        </button>

      </div>

    </div>

  );

}

export default AddCourse;