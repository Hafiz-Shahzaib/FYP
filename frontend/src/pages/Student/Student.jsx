// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Nav from '../../component/Nav'
// import Sidebar from './Sidebar'
// import Footer from '../../component/Footer'

// function Stm() {
//   return (
//     <div className='text-default min-h-screen bg-white'>
//       <Nav />
//       <br />
//       <br />
//       <div className='flex'>
//         <Sidebar />
//         <div className='flex-1'>
//               {<Outlet />}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default Stm








import React ,{ useEffect, useState  } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import Card from '../../component/Card';
import Nav from '../../component/Nav';
import Footer from '../../component/Footer';
import { HiOutlineHome } from "react-icons/hi";
import { FaRobot } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { SiCoursera } from "react-icons/si";
import { IoMdPlayCircle } from "react-icons/io";

function Student() {

  const menuItems = [
      { name: 'Dashboard', path: '/student', icon:  <HiOutlineHome /> },
      { name: 'Course', path: 'allcourses', icon: <SiCoursera /> },
      { name: 'My Courses', path: 'mycourses', icon: <IoMdPlayCircle /> },
      { name: 'Assignment', path: '/', icon: <MdAssignment /> },
      { name: 'AI Chatbot', path: '/chat', icon: <FaRobot /> },
    ];

  const navigate = useNavigate();
  const [isSidebarVisible,setIsSidebarVisible] = useState(false);

  
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Nav/>

      <button className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black' onClick={()=>setIsSidebarVisible(prev=>!prev)}>
        {isSidebarVisible ? 'Hide' : 'Show'} Sidebar
      </button>
      
      {/* sideBar */}

      <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-0 py-[90px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} md:block md:translate-x-0`}>
        <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-1'><FaArrowLeftLong className='text-white' onClick={()=>navigate("/")}/>Back</h2>

              <div className='space-y-3 px-4 text-sm text-[white]  p-[20px]'>

                {menuItems.map((item)=> (
                  <NavLink
                  to={item.path}
                  key={item.name}
                  end={item.path}
                  className={({isActive})=> `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? 'bg-indigo-50 border-r-[6px] border-red-500/90 text-black' : 'hover:bg-gray-100/90 border-r-[6px] border-black hover:border-gray-100/90'}`}>
                    {/* <img src={item.icon} alt="" className='w-6 h-6'/> */}
                    <span className='text-2xl'>
                      {item.icon}
                    </span>
                    {/* <p className='md:block hidden text-center'>{item.name}</p> */}
                    <p className='block text-center'>{item.name}</p>
                  </NavLink>
                ))}

              </div>


      </aside>

      <main className='w-full transition-all duration-300 py-[50px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
        <Outlet />
      </main>
    {/* <Footer/>   */}
    </div>
  )
}

export default Student