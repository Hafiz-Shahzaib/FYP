// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Nav from '../../component/Nav'
// import Footer from '../../component/Footer'
// import SidebarEdu from './SidebarEdu'

// function Educator() {
//   return (
//     <div className='text-default min-h-screen bg-white'>
//       <Nav />
//       <div className='flex mt-17'>
//         <SidebarEdu />
//         <div className='flex-1'>
//               {<Outlet />}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default Educator




import React ,{ useEffect, useState  } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Card from '../../component/Card';
import Nav from '../../component/Nav';
import Footer from './../../component/Footer';

// import { NavLink } from 'react-router-dom';
import { HiOutlineHome } from "react-icons/hi";
import { IoAdd } from "react-icons/io5";

function Educator() {

  const menuItems = [
      { name: 'Dashboard', path: '/dashboard', icon:  <HiOutlineHome /> },
      { name: 'Course', path: 'courses', icon: <IoAdd /> },
      { name: 'My Courses', path: 'mycourses', icon: <HiOutlineHome /> },
      { name: 'Assignment', path: '/', icon: <HiOutlineHome /> },
      // { name: 'AI Chatbot', path: '/chat', icon: <HiOutlineHome /> },
    ];

  const navigate = useNavigate();
  // const {courseData} = useSelector(state=>state.course)
  const [semester,setSemester] = useState([])
  // const [filterCourses,setFilterCourses] = useState([])
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

export default Educator
