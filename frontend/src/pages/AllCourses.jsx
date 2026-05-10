import React ,{ useEffect, useState  } from 'react'
import Nav from '../component/Nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import ai from "../assets/SearchAi.png";
import { useSelector } from 'react-redux';
import Card from '../component/Card';
function AllCourses() {
  const navigate = useNavigate();
  const {courseData} = useSelector(state=>state.course)
  const [semester,setSemester] = useState([])
  const [filterCourses,setFilterCourses] = useState([])
  const [isSidebarVisible,setIsSidebarVisible] = useState(false);

  const toggleCategory = (e)=>{
    if(semester.includes(e.target.value)){
      setSemester(prev => prev.filter(c => c !== e.target.value))
    }
    else{
      setSemester(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = ()=>{
    let courseCopy = courseData?.slice()
    if(semester.length > 0){
      courseCopy = courseCopy.filter(s => semester.includes(s.semester))
    }
    setFilterCourses(courseCopy)
  }

  useEffect(()=>{
    setFilterCourses(courseData)
  },[courseData])

  useEffect(()=>{
    applyFilter()
  },[semester])


  return (
    <div className='flex min-h-screen bg-gray-50'>
      <Nav/>

      <button className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black' onClick={()=>setIsSidebarVisible(prev=>!prev)}>
        {isSidebarVisible ? 'Hide' : 'Show'} Filters
      </button>

      {/* sideBar */}

      <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} md:block md:translate-x-0`}>
        <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'><FaArrowLeftLong className='text-white' onClick={()=>navigate("/")}/>Filter by Category</h2>

        <form action="" onSubmit={(e)=>e.preventDefault()} className='space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl'>

          <button className='px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={()=>navigate("/search")}>Search with AI <img src={ai} className='w-[30px] h-[30px] rounded-full' alt="" /></button>

          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 1'} onChange={toggleCategory}/> Semester 1
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 2'} onChange={toggleCategory}/> 
            Semester 2
          </label>

          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 3'} onChange={toggleCategory}/> 
            Semester 3
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 4'} onChange={toggleCategory}/> 
            Semester 4
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 5'} onChange={toggleCategory}/> 
            Semester 5
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 6'} onChange={toggleCategory}/> 
            Semester 6
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 7'} onChange={toggleCategory}/> 
            Semester 7
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 8'} onChange={toggleCategory}/> 
            Semester 8
          </label>
        
        </form>


      </aside>

      <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
        {
          filterCourses?.map((course,index)=>(
            <Card key={index} thumbnail={course.thumbnail} title={course.title} semester={course.semester} courseCode={course.courseCode} subject={course.subject} id={course._id} reviews={course.reviews}/>
          ))
        }
      </main>

    </div>
  )
}

export default AllCourses
