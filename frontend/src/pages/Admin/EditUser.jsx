import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  // GET USER DATA
  const fetchUser = async () => {
    try {

      const res = await axios.get(
        serverUrl + "/api/admin/users"
      );

      const user = res.data.find(u => u._id === id);

      setForm({
        name: user.name,
        email: user.email,
        password: "",
        role: user.role
      });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // UPDATE USER
  const handleUpdate = async () => {

    try {

      await axios.put(
        serverUrl + "/api/admin/update-user/" + id,
        form
      );

      toast.success("User Updated");

      // Go Back to Admin Page
    //   navigate("/admin/users");
      navigate(-1);

    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (

    <div className="p-5">

      <h1 className="text-2xl font-bold mb-5">
        Edit User
      </h1>

      <div className="flex flex-col gap-3 w-80">

        <input
          value={form.name}
          placeholder="Name"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, name:e.target.value})
          }
        />

        <input
          value={form.email}
          placeholder="Email"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, email:e.target.value})
          }
        />

        <input
          value={form.password}
          placeholder="New Password (optional)"
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, password:e.target.value})
          }
        />

        <select
          value={form.role}
          className="border px-2 py-1"
          onChange={(e)=>
            setForm({...form, role:e.target.value})
          }
        >

          <option value="student">Student</option>
          <option value="educator">Educator</option>
          <option value="admin">Admin</option>

        </select>

        <button
          onClick={handleUpdate}
          className="bg-black text-white py-2"
        >
          Update User
        </button>

      </div>

    </div>

  );
}

export default EditUser;