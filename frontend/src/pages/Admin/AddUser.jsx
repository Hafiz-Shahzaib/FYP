import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddUser() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const [loading, setLoading] = useState(false);

  const handleAddUser = async () => {

    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      await axios.post(
        serverUrl + "/api/admin/add-user",
        form
      );

      toast.success("User Added Successfully");

      // Go back to Admin page
    //   navigate("/admin-users");
      navigate(-1);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Add New User
      </h1>

      <div className="flex flex-col gap-3 w-80">

        <input
          placeholder="Name"
          className="border px-3 py-2"
          // className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]'
          onChange={(e)=>
            setForm({
              ...form,
              name:e.target.value
            })

            // for practice
            // <input id='name' type="text" className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px]' placeholder='Your name' onChange={(e)=>setName(e.target.value)} value={name}/>
          }
        />

        <input
          placeholder="Email"
          className="border px-3 py-2"
          onChange={(e)=>
            setForm({
              ...form,
              email:e.target.value
            })
          }
        />

        <input
          placeholder="Password"
          type="password"
          className="border px-3 py-2"
          onChange={(e)=>
            setForm({
              ...form,
              password:e.target.value
            })
          }
        />

        <select
          className="border px-3 py-2"
          onChange={(e)=>
            setForm({
              ...form,
              role:e.target.value
            })
          }
        >

          <option value="student">
            Student
          </option>

          <option value="educator">
            Educator
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button
          onClick={handleAddUser}
          disabled={loading}
          className="bg-green-500 text-white py-2 rounded"
        >

          {loading
            ? "Adding..."
            : "Save User"}

        </button>

      </div>

    </div>

  );
}

export default AddUser;