

// // before













// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { serverUrl } from "../../App";
// import { FaEdit, FaPlus } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// function AdminUsers() {

//   const navigate = useNavigate();

//   const [users, setUsers] = useState([]);

//   // Search + Filter
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // GET USERS
//   const fetchUsers = async () => {

//     try {

//       const res =
//         await axios.get(
//           serverUrl + "/api/admin/users"
//         );

//       setUsers(res.data);

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   useEffect(() => {

//     fetchUsers();

//   }, []);

//   // DISABLE USER
//   const handleDisable = async (id) => {

//     if (!window.confirm("Disable this user?"))
//       return;

//     try {

//       await axios.delete(
//         serverUrl +
//         "/api/admin/delete-user/" + id
//       );

//       toast.success("User Disabled");

//       fetchUsers();

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   // ENABLE USER
//   const handleEnable = async (id) => {

//     try {

//       await axios.put(
//         serverUrl +
//         "/api/admin/enable-user/" + id
//       );

//       toast.success("User Enabled");

//       fetchUsers();

//     } catch (err) {

//       console.log(err);

//     }

//   };

//   // FILTER USERS

//   let filteredUsers = users;

//   // Role filter
//   if (roleFilter !== "all") {

//     filteredUsers =
//       filteredUsers.filter(
//         u => u.role === roleFilter
//       );

//   }

//   // Status filter
//   if (statusFilter !== "all") {

//     filteredUsers =
//       filteredUsers.filter(
//         u =>
//           statusFilter === "active"
//             ? u.isActive
//             : !u.isActive
//       );

//   }

//   // Search filter
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

//       {/* HEADER */}

//       <div className="flex justify-between items-center mb-5">

//         <h1 className="text-2xl font-bold">
//           Admin User Management
//         </h1>

//         {/* ADD USER */}

//         <button
//           onClick={() =>
//             navigate("add-user")
//           }
//           className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
//         >

//           <FaPlus />

//           Add User

//         </button>

//       </div>

//       {/* USER COUNT SUMMARY */}

//       <div className="flex gap-4 mb-6 flex-wrap">

//         <div className="bg-gray-200 px-4 py-2 rounded">
//           Total: {users.length}
//         </div>

//          {/* count */}
//          <div className="bg-blue-200 px-4 py-2 rounded">
//           Students: {
//             users.filter(
//               u => u.role === "student"
//             ).length
//           }
//         </div>

//         <div className="bg-green-200 px-4 py-2 rounded">
//           Educators: {
//             users.filter(
//               u => u.role === "educator"
//             ).length
//           }
//         </div>

//         <div className="bg-red-200 px-4 py-2 rounded">
//           Admins: {
//             users.filter(
//               u => u.role === "admin"
//             ).length
//           }
//         </div>

//         <div className="bg-green-200 px-4 py-2 rounded">
//           Active: {
//             users.filter(
//               u => u.isActive
//             ).length
//           }
//         </div>

//         <div className="bg-red-200 px-4 py-2 rounded">
//           Disabled: {
//             users.filter(
//               u => !u.isActive
//             ).length
//           }
//         </div>

//       </div>

//       {/* SEARCH + FILTER */}

//       <div className="flex gap-3 mb-5 flex-wrap">

//         {/* SEARCH */}

//         <input
//           placeholder="Search name or email"
//           className="border px-3 py-1"
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//         />

//         {/* ROLE FILTER */}

//         <select
//           className="border px-3 py-1"
//           onChange={(e) =>
//             setRoleFilter(e.target.value)
//           }
//         >

//           <option value="all">
//             All Roles
//           </option>

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

//         {/* STATUS FILTER */}

//         <select
//           className="border px-3 py-1"
//           onChange={(e) =>
//             setStatusFilter(e.target.value)
//           }
//         >

//           <option value="all">
//             All Status
//           </option>

//           <option value="active">
//             Active
//           </option>

//           <option value="disabled">
//             Disabled
//           </option>

//         </select>

//       </div>

//       {/* TABLE */}

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
//                 Role
//               </th>

//               <th className="border px-4 py-2">
//                 Status
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
//                   colSpan="6"
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

//                   <td className="border px-4 py-2 capitalize">

//                     {user.role}

//                   </td>

//                   {/* STATUS */}

//                   <td className="border px-4 py-2">

//                     {user.isActive ? (

//                       <span className="bg-green-200 px-2 py-1 rounded">

//                         Active

//                       </span>

//                     ) : (

//                       <span className="bg-red-200 px-2 py-1 rounded">

//                         Disabled

//                       </span>

//                     )}

//                   </td>

//                   {/* ACTIONS */}

//                   <td className="border px-4 py-2 flex justify-center gap-2">

//                     {/* EDIT */}

//                     <button
//                       onClick={() =>
//                         navigate(
//                           `edit-user/${user._id}`
//                         )
//                       }
//                       className="bg-blue-500 text-white px-3 py-1 rounded"
//                     >

//                       <FaEdit />

//                     </button>

//                     {/* ENABLE / DISABLE */}

//                     {user.isActive ? (

//                       <button
//                         onClick={() =>
//                           handleDisable(user._id)
//                         }
//                         className="bg-red-500 text-white px-3 py-1 rounded"
//                       >

//                         Disable

//                       </button>

//                     ) : (

//                       <button
//                         onClick={() =>
//                           handleEnable(user._id)
//                         }
//                         className="bg-green-500 text-white px-3 py-1 rounded"
//                       >

//                         Enable

//                       </button>

//                     )}

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






// // after








import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
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

    <div className='flex min-h-screen bg-gray-100'>
      <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
          <div className='flex items-center justify-center gap-3'>
            <FaArrowLeftLong className='w-[22px] h-[22px] cursor-pointer' onClick={() => navigate(-1)} />
            <h1 className='text-2xl font-semibold'>Admin User Management</h1>
          </div>
          <button className='bg-[black] text-white px-4 py-2 rounded hover:bg-gray-500' onClick={() => navigate("add-user")}>Add User</button>
        </div>

        {/* Additional Information */}

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

        {/* for Large Screen table */}

        <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
          <table className='min-w-full text-sm'>
            <thead className='border-b bg-gray-50'>
              <tr>
                <th className='text-left py-3 px-4'>#</th>
                <th className='text-left py-3 px-4'>Name</th>
                <th className='text-left py-3 px-4'>Email</th>
                <th className='text-left py-3 px-4'>Role</th>
                <th className='text-left py-3 px-4'>Status</th>
                {/* <th className='text-left py-3 px-4'>Edit</th> */}
                <th className='text-left py-3 px-4'>Action</th>
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
                    <tr key={index} className='border-b hover:bg-gray-50 transition duration-200'>
                      <td className='py-3 px-4 flex items-center gap-4'>
                        {index + 1}
                      </td>
                      <td className='px-4 py-3'> {user.name}</td>
                      <td className='px-4 py-3'> {user.email}</td>
                      <td className='px-4 py-3'> {user.role}</td>
                      <td className='px-4 py-3'>
                        <span className={`px-3 py-1 rounded-full text-xs ${user.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"} `}>{user.isActive ? "Active" : "Disable"}</span></td>
                      {/* <td className='px-4 py-3'>
                        <FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() => navigate(`edit-user/${user._id}`)} />
                      </td> */}
                      <td className='px-4 py-3'>
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
          <p className='text-center text-sm text-gray-400 mt-6'>A list of your recent users.</p>
        </div>

        {/* for Small Screen table */}
        <div className='md:hidden space-y-4'>
          {searchedUsers.length === 0 ? (
            <tr>

              <td
                colSpan="6"
                className="text-center py-4"
              >

                No Users Found

              </td>

            </tr>
          ) : (searchedUsers.map(
            (user, index) => (
              <div key={index} className='bg-white rounded-lg shadow p-4 flex flex-col gap-3'>
                <div className='flex gap-4 items-center'>{index + 1}
                  <div className='flex-1'>
                    <h2 className='font-medium text-sm'>Name : </h2>
                    {user.name}
                    {/* <h2 className='font-medium text-sm'>{user.email}</h2>  */}
                    <h2 className='font-medium text-sm'>Email : </h2>
                    {user.email}
                    {/* <h2 className='font-medium text-sm'>{user.role}</h2> */}
                  </div>
                  {/* <FaEdit className='text-gray-600 hover:text-blue-600 cursor-pointer' onClick={() => navigate(`edit-user/${user._id}`)} /> */}
                </div>
                <div className="flex-1">
                  <span className={`w-fit px-3 py-1 text-xs rounded-full  ${user.isActive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}  `}>{user.isActive ? "Active" : "Disable"}</span>

                  <span className={"w-fit px-3 py-1 text-xs ml-8 rounded-full   bg-red-100 text-red-600"}>{user.role}</span>

                  {/* now */}



                </div>
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
              </div>
            )))}
          <p className='text-center text-sm text-gray-400 mt-4'>A list of your recent users.</p>
        </div>

      </div>
    </div>

  );

}

export default AdminUsers;
