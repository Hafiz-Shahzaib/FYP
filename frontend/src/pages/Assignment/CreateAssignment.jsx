import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { serverUrl } from '../../App';
import { ClipLoader } from 'react-spinners';
import { setAssignmentData } from '../../redux/assignmentSlice';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
function CreateAssignment() {
    const {courseId} = useParams();
    const navigate = useNavigate();
    const [assignmentTitle, setAssignmentTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const {assignmentData} = useSelector(state=>state.assignment);

    const handleCreateAssignment = async () => {
        setLoading(true);
        try {
            const result = await axios.post(serverUrl + `/api/course/createassignment/${courseId}`, {assignmentTitle}, {withCredentials:true});
            console.log(result.data)
            dispatch(setAssignmentData([...assignmentData, result.data.assignment]));
            setLoading(false);
            toast.success("Assignment Added")
            setAssignmentTitle("");
        } catch (error) {
            console.log(error)
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const getCourseAssignment = async () => {
            try {
                const result = await axios.get(serverUrl + `/api/course/courseassignment/${courseId}`,{withCredentials:true});
                console.log(result.data)
                dispatch(setAssignmentData(result.data.assignments));
            } catch (error) {
                console.log(error)
            }
        }
        getCourseAssignment();
    },[])


  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>
            {/* header */}
            <div className='mb-6'>
                <h1 className='text-2xl font-semibold text-gray-800 mb-1'>
                    Let's Add an Assignment
                </h1>
                <p className='text-sm text-gray-500'>Enter the title and add your video lectures to enhance your course content.</p>
            </div>

            {/* input Area */}
            <input type="text" 
            className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' placeholder='e.g. Introduction to Mern Stack' onChange={(e)=>setAssignmentTitle(e.target.value)} value={assignmentTitle}/>

            {/* Button */}
            <div className='flex gap-4 mb-6'>
                <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-semibold' onClick={()=>navigate(-1)}> <FaArrowLeftLong />Back to Course</button>
                <button className='px-5 py-2 rounded-md bg-[black] text-white hover:bg-gray-600 transition-all text-sm font-semibold shadow' disabled={loading} onClick={handleCreateAssignment}>{loading ? <ClipLoader size={30} color='white'/>: "+ Create Assignment"}</button>
            </div>
            {/* assignment list */}
            <div className='space-y-2'>
                {assignmentData?.map((assignment, index)=>(
                    <div key={index} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700'>
                        <span>Assignment - {index + 1} : {assignment.assignmentTitle}</span>
                        <FaEdit className='text-gray-500 hover:text-gray-700 cursor-pointer' onClick={()=>navigate(`/editassignment/${courseId}/${assignment._id}`)}/>
                        <button className='bg-[black] text-gray-500 hover:text-gray-700 cursor-pointer' onClick={()=>navigate(`/viewsubmission/${courseId}/${assignment._id}`)}>View</button>
                    </div>
                ))}
                
            </div>
        </div>
      
    </div>
  )
}

export default CreateAssignment
