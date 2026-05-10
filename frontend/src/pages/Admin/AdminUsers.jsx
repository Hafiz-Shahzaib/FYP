// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { serverUrl } from "../../App";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function AdminUsers() {

//   const navigate = useNavigate();

//   const [users, setUsers] = useState([]);

//   // const [form, setForm] = useState({
//   //   name: "",
//   //   email: "",
//   //   password: "",
//   //   role: "student"
//   // });

//   const [loading, setLoading] = useState(false);

//   // Search + Filter
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");

//   // GET USERS
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(serverUrl + "/api/admin/users");
//       setUsers(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // ADD USER
//   // const handleAddUser = async () => {

//   //   if (!form.name || !form.email || !form.password) {
//   //     toast.error("Please fill all fields");
//   //     return;
//   //   }

//   //   try {

//   //     setLoading(true);

//   //     await axios.post(
//   //       serverUrl + "/api/admin/add-user",
//   //       form
//   //     );

//   //     toast.success("User added");

//   //     fetchUsers();

//   //     setForm({
//   //       name: "",
//   //       email: "",
//   //       password: "",
//   //       role: "student"
//   //     });

//   //   } catch (err) {

//   //     toast.error(
//   //       err.response?.data?.message ||
//   //       "Something went wrong"
//   //     );

//   //   } finally {

//   //     setLoading(false);

//   //   }
//   // };

//   // DELETE USER
//   const handleDelete = async (id) => {

//     if (!window.confirm("Delete this user?")) return;

//     try {

//       await axios.delete(
//         serverUrl + "/api/admin/delete-user/" + id
//       );

//       toast.success("User deleted");

//       fetchUsers();

//     } catch (err) {

//       console.log(err);

//     }
//   };

//   // ROLE FILTER
//   const filteredUsers =
//     roleFilter === "all"
//       ? users
//       : users.filter(
//           (u) => u.role === roleFilter
//         );

//   // SEARCH FILTER
//   const searchedUsers =
//     filteredUsers.filter((user) =>
//       user.name
//         .toLowerCase()
//         .includes(search.toLowerCase()) ||
//       user.email
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     );

//   return (

//     <div className="p-5">

//       {/* <h1 className="text-2xl font-bold mb-4">
//         Admin User Management
//       </h1> */}
//       <div className="flex justify-between items-center mb-5">

//         <h1 className="text-2xl font-bold">
//           Admin User Management
//         </h1>

//         {/* ADD USER BUTTON */}

//         <button onClick={() => navigate("add-user")} className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
//             <FaPlus />
//             Add User
//         </button>

//       </div>

//       {/* USER COUNT SUMMARY */}

      // <div className="flex gap-4 mb-6">

      //   <div className="bg-gray-200 px-4 py-2 rounded">
      //     Total: {users.length}
      //   </div>

      //   <div className="bg-blue-200 px-4 py-2 rounded">
      //     Students: {
      //       users.filter(
      //         u => u.role === "student"
      //       ).length
      //     }
      //   </div>

      //   <div className="bg-green-200 px-4 py-2 rounded">
      //     Educators: {
      //       users.filter(
      //         u => u.role === "educator"
      //       ).length
      //     }
      //   </div>

      //   <div className="bg-red-200 px-4 py-2 rounded">
      //     Admins: {
      //       users.filter(
      //         u => u.role === "admin"
      //       ).length
      //     }
      //   </div>

      // </div>

//       {/* SEARCH + FILTER */}

      // <div className="flex gap-3 mb-5">

      //   <input
      //     placeholder="Search name or email"
      //     className="border px-3 py-1"
      //     onChange={(e) =>
      //       setSearch(e.target.value)
      //     }
      //   />

      //   <select
      //     className="border px-3 py-1"
      //     onChange={(e) =>
      //       setRoleFilter(e.target.value)
      //     }
      //   >

      //     <option value="all">
      //       All Roles
      //     </option>

      //     <option value="student">
      //       Student
      //     </option>

      //     <option value="educator">
      //       Educator
      //     </option>

      //     <option value="admin">
      //       Admin
      //     </option>

      //   </select>

      // </div>

//       {/* ADD USER FORM */}

//       {/* <div className="flex gap-3 mb-6">

//         <input
//           placeholder="Name"
//           value={form.name}
//           className="border px-2 py-1"
//           onChange={(e)=>
//             setForm({
//               ...form,
//               name:e.target.value
//             })
//           }
//         />

//         <input
//           placeholder="Email"
//           value={form.email}
//           className="border px-2 py-1"
//           onChange={(e)=>
//             setForm({
//               ...form,
//               email:e.target.value
//             })
//           }
//         />

//         <input
//           placeholder="Password"
//           value={form.password}
//           className="border px-2 py-1"
//           onChange={(e)=>
//             setForm({
//               ...form,
//               password:e.target.value
//             })
//           }
//         />

//         <select
//           className="border px-2 py-1"
//           value={form.role}
//           onChange={(e)=>
//             setForm({
//               ...form,
//               role:e.target.value
//             })
//           }
//         >

//           <option value="student">
//             Student
//           </option>

//           <option value="educator">
//             Educator
//           </option>

//           <option value="admin">
//             Admin
//           </option>

//         </select>

//         <button
//           onClick={handleAddUser}
//           disabled={loading}
//           className="bg-black text-white px-4 py-1"
//         >

//           {loading
//             ? "Adding..."
//             : "Add"}

//         </button>

//       </div> */}

//       {/* USER TABLE */}

//       <div className="overflow-x-auto">

//         <table className="min-w-full border border-gray-300">

//           <thead className="bg-gray-200">

//             <tr>

//               <th className="border px-4 py-2">
//                 #
//               </th>

//               <th className="border px-4 py-2">
//                 Name
//               </th>

//               <th className="border px-4 py-2">
//                 Email
//               </th>

//               <th className="border px-4 py-2">
//                 Password
//               </th>

//               <th className="border px-4 py-2">
//                 Role
//               </th>

//               <th className="border px-4 py-2">
//                 Action
//               </th>

//             </tr>

//           </thead>

//           <tbody>

//             {searchedUsers.length === 0 ? (

//               <tr>
//                 <td
//                   colSpan="5"
//                   className="text-center py-4"
//                 >
//                   No Users Found
//                 </td>
//               </tr>

//             ) : (

//               searchedUsers.map(
//                 (user, index) => (

//                 <tr
//                   key={user._id}
//                   className="text-center"
//                 >

//                   <td className="border px-4 py-2">
//                     {index + 1}
//                   </td>

//                   <td className="border px-4 py-2">
//                     {user.name}
//                   </td>

//                   <td className="border px-4 py-2">
//                     {user.email}
//                   </td>

//                   <td className="border px-4 py-2">
//                     {user.password}
//                   </td>

//                   <td className="border px-4 py-2 capitalize">
//                     {user.role}
//                   </td>

//                   <td className="border px-4 py-2 flex justify-center gap-2">

//                     {/* EDIT BUTTON */}

//                     <button
//                       onClick={() =>
//                         navigate(
//                           `edit-user/${user._id}`
//                         )
//                       }
//                       // onClick={() =>
//                       //   navigate(
//                       //     `/admin/edit-user/${user._id}`
//                       //   )
//                       // }
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >
//                       <FaEdit />
//                     </button>

//                     {/* DELETE BUTTON */}

//                     <button
//                       onClick={() =>
//                         handleDelete(user._id)
//                       }
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       <FaTrash />
//                     </button>

//                   </td>

//                 </tr>

//               ))

//             )}

//           </tbody>

//         </table>

//       </div>

//     </div>
//   );
// }

// export default AdminUsers;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminUsers() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  // Search + Filter
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // GET USERS
  const fetchUsers = async () => {

    try {

      const res =
        await axios.get(
          serverUrl + "/api/admin/users"
        );

      setUsers(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    fetchUsers();

  }, []);

  // DISABLE USER
  const handleDisable = async (id) => {

    if (!window.confirm("Disable this user?"))
      return;

    try {

      await axios.delete(
        serverUrl +
        "/api/admin/delete-user/" + id
      );

      toast.success("User Disabled");

      fetchUsers();

    } catch (err) {

      console.log(err);

    }

  };

  // ENABLE USER
  const handleEnable = async (id) => {

    try {

      await axios.put(
        serverUrl +
        "/api/admin/enable-user/" + id
      );

      toast.success("User Enabled");

      fetchUsers();

    } catch (err) {

      console.log(err);

    }

  };

  // FILTER USERS

  let filteredUsers = users;

  // Role filter
  if (roleFilter !== "all") {

    filteredUsers =
      filteredUsers.filter(
        u => u.role === roleFilter
      );

  }

  // Status filter
  if (statusFilter !== "all") {

    filteredUsers =
      filteredUsers.filter(
        u =>
          statusFilter === "active"
            ? u.isActive
            : !u.isActive
      );

  }

  // Search filter
  const searchedUsers =
    filteredUsers.filter((user) =>

      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  return (

    <div className="p-5">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-5">

        <h1 className="text-2xl font-bold">
          Admin User Management
        </h1>

        {/* ADD USER */}

        <button
          onClick={() =>
            navigate("add-user")
          }
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >

          <FaPlus />

          Add User

        </button>

      </div>

      {/* USER COUNT SUMMARY */}

      <div className="flex gap-4 mb-6 flex-wrap">

        <div className="bg-gray-200 px-4 py-2 rounded">
          Total: {users.length}
        </div>

         {/* count */}
         <div className="bg-blue-200 px-4 py-2 rounded">
          Students: {
            users.filter(
              u => u.role === "student"
            ).length
          }
        </div>

        <div className="bg-green-200 px-4 py-2 rounded">
          Educators: {
            users.filter(
              u => u.role === "educator"
            ).length
          }
        </div>

        <div className="bg-red-200 px-4 py-2 rounded">
          Admins: {
            users.filter(
              u => u.role === "admin"
            ).length
          }
        </div>

        <div className="bg-green-200 px-4 py-2 rounded">
          Active: {
            users.filter(
              u => u.isActive
            ).length
          }
        </div>

        <div className="bg-red-200 px-4 py-2 rounded">
          Disabled: {
            users.filter(
              u => !u.isActive
            ).length
          }
        </div>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex gap-3 mb-5 flex-wrap">

        {/* SEARCH */}

        <input
          placeholder="Search name or email"
          className="border px-3 py-1"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* ROLE FILTER */}

        <select
          className="border px-3 py-1"
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
        >

          <option value="all">
            All Roles
          </option>

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

        {/* STATUS FILTER */}

        <select
          className="border px-3 py-1"
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
        >

          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="disabled">
            Disabled
          </option>

        </select>

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto">

        <table className="min-w-full border border-gray-300">

          <thead className="bg-gray-200">

            <tr>

              <th className="border px-4 py-2">
                #
              </th>

              <th className="border px-4 py-2">
                Name
              </th>

              <th className="border px-4 py-2">
                Email
              </th>

              <th className="border px-4 py-2">
                Role
              </th>

              <th className="border px-4 py-2">
                Status
              </th>

              <th className="border px-4 py-2">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {searchedUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-4"
                >

                  No Users Found

                </td>

              </tr>

            ) : (

              searchedUsers.map(
                (user, index) => (

                <tr
                  key={user._id}
                  className="text-center"
                >

                  <td className="border px-4 py-2">

                    {index + 1}

                  </td>

                  <td className="border px-4 py-2">

                    {user.name}

                  </td>

                  <td className="border px-4 py-2">

                    {user.email}

                  </td>

                  <td className="border px-4 py-2 capitalize">

                    {user.role}

                  </td>

                  {/* STATUS */}

                  <td className="border px-4 py-2">

                    {user.isActive ? (

                      <span className="bg-green-200 px-2 py-1 rounded">

                        Active

                      </span>

                    ) : (

                      <span className="bg-red-200 px-2 py-1 rounded">

                        Disabled

                      </span>

                    )}

                  </td>

                  {/* ACTIONS */}

                  <td className="border px-4 py-2 flex justify-center gap-2">

                    {/* EDIT */}

                    <button
                      onClick={() =>
                        navigate(
                          `edit-user/${user._id}`
                        )
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >

                      <FaEdit />

                    </button>

                    {/* ENABLE / DISABLE */}

                    {user.isActive ? (

                      <button
                        onClick={() =>
                          handleDisable(user._id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >

                        Disable

                      </button>

                    ) : (

                      <button
                        onClick={() =>
                          handleEnable(user._id)
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >

                        Enable

                      </button>

                    )}

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default AdminUsers;