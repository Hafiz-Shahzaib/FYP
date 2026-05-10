import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from './../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
function CreateCourses() {
  const navigate = useNavigate()
  const [title,setTitle] = useState("")
  const [semester,setSemester] = useState("")
  const [courseCode,setCourseCode] = useState("")
  const [subject,setSubject] = useState("")
  const [loading,setLoading] = useState(false)

  const handleCreateCourse = async () => {
    setLoading(true);
    try {
      const result = await axios.post(serverUrl + "/api/course/create", {title, semester,courseCode, subject}, {withCredentials:true})
      console.log(result.data)
      // navigate(-1)
      navigate(-1)
      setLoading(false)
      toast.success("Course Created")

    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }

  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10'>
      <div className='max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative'>
        <FaArrowLeftLong className='top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/dashboard/courses")}/>
        <h2 className='text-2xl font-semibold mb-6 text-center'>Create Course</h2>

        <form className='space-y-5' onSubmit={(e)=>e.preventDefault()}>
          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Create Title</label>
            <input type="text" id='title' placeholder='Enter Course title' className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]' 
            onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>
          <div>
            <label htmlFor="semester" className='block text-sm font-medium text-gray-700 mb-1'>Course Semester</label>
            
            {/* for semester */}
            <select
onChange={(e)=>
setSemester(e.target.value)
}
>

<option value="">
Select Semester
</option>

<option value="Semester 1">Semester 1</option>
<option value="Semester 2">Semester 2</option>
<option value="Semester 3">Semester 3</option>
<option value="Semester 4">Semester 4</option>
<option value="Semester 5">Semester 5</option>
<option value="Semester 6">Semester 6</option>
<option value="Semester 7">Semester 7</option>
<option value="Semester 8">Semester 8</option>

</select>
          </div>

          {/* for courseCode */}
          
          <div>
            <label htmlFor="courseCode" className='block text-sm font-medium text-gray-700 mb-1'>Course Code</label>
            <input type="text"
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]'
             placeholder="Course Code (CS101)" onChange={(e)=> setCourseCode(e.target.value)}/>
          </div>

          {/* for subject */}

          <div>
            <label htmlFor="subject" className='block text-sm font-medium text-gray-700 mb-1'>Subject</label>
            <input type="text"
            className='w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[black]' 
            placeholder="Subject Name" onChange={(e)=> setSubject(e.target.value)}/>
          </div>

          
          <button className='w-full bg-[black] text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition' disabled={loading} onClick={handleCreateCourse}>{loading? <ClipLoader size={30} color='white'/>:"Create"}</button>
        </form>
      </div>

    </div>
  )
}

export default CreateCourses
