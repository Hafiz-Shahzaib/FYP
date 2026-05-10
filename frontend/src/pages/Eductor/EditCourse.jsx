import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import img from "../../assets/empty.jpg"
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../../App';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setCourseData } from '../../redux/courseSlice';
function EditCourse() {
  const navigate = useNavigate()
  const {courseId} = useParams()
  const thumb = useRef()
  const [isPublished, setIsPublished] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [semester, setSemester] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [subject, setSubject] = useState("");
  const [frontendImage, setFrontendImage] = useState(img);
  const [backendImage, setBackendImage] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  const {courseData} = useSelector(state=>state.course); 

  const handleThumbnail = (e) =>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }


  const getCourseById = async () => {
    try {
      const result = await axios.get(serverUrl + `/api/course/getcourse/${courseId}`, {withCredentials:true})
      setSelectCourse(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(selectCourse)
    {
      setTitle(selectCourse.title || "")
      setSubTitle(selectCourse.subtitle || "")
      setDescription(selectCourse.description || "")
      setSemester(selectCourse.semester || "")
      setCourseCode(selectCourse.courseCode || "")
      setSubject(selectCourse.subject || "")
      setFrontendImage(selectCourse.thumbnail || img)
      setIsPublished(selectCourse?.isPublished)
    }
  },[selectCourse])
  useEffect(()=>{
    getCourseById()
  },[])

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subtitle);
    formData.append("description", description);
    formData.append("semester", semester);
    formData.append("courseCode", courseCode);
    formData.append("subject", subject);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);
    try {
      const result = await axios.post(serverUrl + `/api/course/editcourse/${courseId}`,formData, {withCredentials:true})
      console.log(result.data)

      const updateData = result.data;
      if(updateData.isPublished){
        const updatedCourses = courseData.map(c => c._id === courseId ? updateData : c);

        if(!courseData.some(c => c._id === courseId))
        {
          updatedCourses.push(updateData);
        }
        dispatch(setCourseData(updatedCourses));
      }
      else{
        const filterCourses = courseData.filter(c => c._id !== courseId);
        dispatch(setCourseData(filterCourses));
      }
      setLoading(false);
      navigate("/dashboard/courses")
      toast.success("Course Updated")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response.data.message)
    }
  }
  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(serverUrl + `/api/course/remove/${courseId}`, {withCredentials:true})
      console.log(result.data)
      const filterCourses = courseData.filter(c => c._id !== courseId);
      dispatch(setCourseData(filterCourses));
      setLoading1(false);
      toast.success("Course Removed")
      navigate("/dashboard/courses")
    } catch (error) {
      console.log(error)
      setLoading1(false)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* top bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaArrowLeftLong className='top-[-20%] md:top-[20%] absolute left-[0] md:left-[2%] w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/dashboard/courses")}/>

          <h2 className='text-2xl font-semibold md:pl-[60px]'>
            Add Detail Information regarding the Course
          </h2>
          <div className='space-x-2 space-y-2'>
            <button className='bg-black text-white px-4 py-2 rounded-md' onClick={()=>navigate(`/createlecture/${selectCourse?._id}`)}>Go to Lecture page</button>
            <button className='bg-black text-white px-4 py-2 rounded-md' onClick={()=>navigate(`/createassignment/${selectCourse?._id}`)}>Go to Assignment page</button>
          </div>

      </div>

      {/* form details */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Information</h2>
        <div className='space-x-2 space-y-2'>
          {!isPublished ? <button className='bg-green-100 text-green-600 px-4 py-2 rounded-md border-1' onClick={()=>setIsPublished(prev=>!prev)}>Click to Publish</button> : <button className='bg-red-100 text-red-600 px-4 py-2 rounded-md border-1' onClick={()=>setIsPublished(prev=>!prev)}>Click to UnPublish</button>}
          <button className='bg-red-600 text-white px-4 py-2 rounded-md border-1' onClick={handleRemoveCourse}>Remove Course</button>
        </div>

        <form className='space-y-6' onSubmit={(e)=>e.preventDefault()}>

          <div>
            <label htmlFor="title" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input id='title' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='CourseTitle' onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>
          <div>
            <label htmlFor="subtitle" className='block text-sm font-medium text-gray-700 mb-1'>SubTitle</label>
            <input id='subtitle' type="text" className='w-full border px-4 py-2 rounded-md' placeholder='Course SubTitle' onChange={(e)=>setSubTitle(e.target.value)} value={subtitle}/>
          </div>
          <div>
            <label htmlFor="des" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea id='dis' className='w-full border px-4 py-2 rounded-md h-24 resize-none' placeholder='Course Description' onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
          </div>

          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
            {/* for category */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Semester</label>
              <select name="" id="" className='w-full border px-4 py-2 rounded-md bg-white' onChange={(e)=>setSemester(e.target.value)} value={semester}>
                <option value="">Select Semester</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
              <option value="Semester 3">Semester 3
              </option>
              <option value="Semester 4">Semester 4</option>
              <option value="Semester 5">Semester 5</option>
              <option value="Semester 6">Semester 6</option>
              <option value="Semester 7">Semester 7</option>
              <option value="Semester 8">Semester 8</option>
              </select>
            </div>
            {/* for Level */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Code</label>
              <input type="text" 
              className='w-full border px-4 py-2 rounded-md bg-white'
              placeholder="Course Code (CS101)" onChange={(e)=> setCourseCode(e.target.value)}/>
            </div>
            {/* for Subject */}
            <div className='flex-1'>
              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Subject</label>
              <input type="text"
              className='w-full border px-4 py-2 rounded-md bg-white'
               placeholder="Subject Name" onChange={(e)=> setSubject(e.target.value)}/>
            </div>
            
          </div>

          <div>

              <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
              <input type="file" hidden ref={thumb} accept='image/*' onChange={handleThumbnail}/>
            </div>
          <div className='relative w-[300px] 
            h-[170px]'>
              <img src={frontendImage} alt="" className='w-[100%] 
              h-[100%] border-1 border-black rounded-[5px]' onClick={()=>thumb.current.click()}/>
              <FaEdit className='w-[20px] h-[20px] absolute top-2 right-2' onClick={()=>thumb.current.click()}/>
            </div>

            <div className='flex items-center justify-start gap-[15px]'>
              <button className='bg-[#e9e8e8] hover:bg-red-200 text-black border-1 border-black cursor-pointer px-4 py-2 rounded-md' onClick={()=>navigate(-1)}>Cancel</button>
              <button className='bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer' onClick={handleEditCourse}>{loading ? <ClipLoader size={30} color='white'/> : "Save"}</button>
            </div>

        </form>
        
      </div>
    </div>
  )
}

export default EditCourse
