import React, { useState } from 'react'
import logo from '../../assets/logo.jpg'
import patients_icon from '../../assets/patients_icon.svg'
import appointments_icon from '../../assets/appointments_icon.svg'
import earning_icon from '../../assets/earning_icon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

function StudentDashboard() {
    const [dashboardData, setDashboardData] = useState(null)

    const navigate = useNavigate()
    const {courseId} = useParams()
    const {courseData} = useSelector(state=>state.course)
    const {selectedCourse} = useSelector(state=>state.course)
    const {userData} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const [selectedLecture,setSelectedLecture] = useState(null)
    const [creatorData,setCreatorData] = useState(null)
    const [creatorCourses,setCreatorCourses] = useState(null)
    const [isEnrolled,setIsEnrolled] = useState(false)


  return (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5'>
        {/* <p className='text-2xl font-medium text-black-600'>Welcome, {userData?.name} 👋</p> */}

        {/* for name */}

        <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
          <img src={userData?.photoUrl || userData?.name.slice(0,1).toUpperCase()} className='w-28 h-28 rounded-full object-cover border-4 border-black shadow-md' alt="Educator" />

          <div className='text-center md:text-left space-y-1'>
            <h1 className='text-2xl font-bold text-gray-800'>Welcome ,{userData?.name || "Educator"} 👋</h1>
            {/* <p className='text-gray-600 text-sm'>{userData?.description || "Start creating Courses for Your Students"}</p> */}
            {/* <h1 className='px-[10px] text-center py-[10px] border-2 bg-black border-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center cursor-pointer' onClick={()=>navigate("courses")}>Create Courses</h1> */}
          </div>
        </div>



        <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={patients_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                HMS
                </p>
              <p className='text-base text-gray-500'>Total Enrolments</p>
            </div>
          </div>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={appointments_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                H
                </p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={earning_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                H
                </p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className='pb-4 text-lg font-medium'>Latest Enrolments</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-blue-500'>
            <table className='table-fixed md:table-auto w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-blue-500 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                  <th className='px-4 py-3 font-semibold '>Course Title</th>
                  <th className='px-4 py-3 font-semibold '>Course Code</th>
                  <th className='px-4 py-3 font-semibold '>Status</th>
                </tr>
              </thead>
              <tbody className='text-sm text-gray-500'>
                {userData?.enrolledCourses?.map((course, index) => (
                  <tr key={index} className='border-b border-gray-500/20'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                      <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                        <img 
                          src={course?.thumbnail} 
                          alt="" 
                          className='w-9 h-9 rounded-full'
                        />
                        <span className='truncate'>
                            
                            {course?.title}
                            </span>



                            
                      </td>
                      <td className='px-4 py-3 truncate'>
                        {course?.courseCode}
                        </td>
                      <td className='px-4 py-3 truncate'>
                        <h1 className='px-[10px] text-center py-[10px] border-2 bg-black text-white rounded-[10px] text-[15px] font-light  cursor-pointer mt-[10px] hover:bg-gray-600' onClick={()=>navigate(`/viewlecture/${course._id}`)}>Watch Now</h1>
                        </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
