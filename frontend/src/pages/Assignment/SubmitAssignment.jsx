import React, { useState } from 'react'
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from './../../App';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useEffect } from 'react';

function SubmitAssignment() {
    const { courseId, assignmentId } = useParams();

    const navigate = useNavigate();

    const [submissionContent, setSubmissionContent] = useState("");
    const [loading, setLoading] = useState(false);

    // for Now
    const [studentName, setStudentName] = useState("");

    const [rollNumber, setRollNumber] = useState("");

    const { userData } = useSelector(state => state.user);

    useEffect(()=>{

        if(userData){

            setStudentName(userData.name);
        }
    },[userData]);


    const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["code-block"],
    ["clean"]
  ]
};


    const handleSubmit = async () => {
        if(!studentName || !rollNumber || !submissionContent){
        toast.error("All fields required");
        return;
        }

        setLoading(true);
        try {
            const result = await axios.post(serverUrl + `/api/course/submitassignment/${courseId}/${assignmentId}`, {submissionContent,studentName, rollNumber},{ withCredentials:true })
            console.log(result.data)
            toast.success("Assignment Submited")
            navigate(-1)
            setLoading(false)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
            setLoading(false)
        }
    }
    const removeSubmission = async () => {
        setLoading1(true)
        try {
            const result = await axios.delete(serverUrl + `/api/course/removesubmission/${submissionId}`, {withCredentials:true})
            console.log(result.data)
            setLoading1(false)
            navigate(-1)
            toast.success("Submit Assignment Removed")

        } catch (error) {
            setLoading1(false)
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>
        <div className='w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6'>

            {/* header */}
            <div className='flex items-center gap-2 mb-2 '>
                <FaArrowLeftLong className='text-gray-600 cursor-pointer' onClick={()=>navigate(-1)}/>
                <h2 className='text-xl font-semibold text-gray-800'>Submit Assignment</h2>
            </div>

            <div className='space-y-4'>
                {/* <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="">AssignmentTitle *</label>
                    <input type="text" className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none' required onChange={(e)=>setAssignmentTitle(e.target.value)} value={assignmentTitle}/>
                </div> */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="">Name *</label>
                    <input type="text"
                    placeholder='Enter your Name' 
                    className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none' required onChange={(e)=>setStudentName(e.target.value)} value={studentName}/>
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1' htmlFor="">Roll Number *</label>
                    <input type="text"
                    placeholder='Enter your Roll Number' 
                    className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none' required onChange={(e)=>setRollNumber(e.target.value)} value={rollNumber}/>
                </div>

                <div>
                    <label className='block text-sm font-medium mb-1'>Assignment Content</label>
                    <ReactQuill
                    placeholder="Write your assignment content here..."
                    className='w-full p-3 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-[black] focus:outline-none' required      
                    onChange={setSubmissionContent} 
                    value={submissionContent}
                    modules={modules}/>             
                    
                </div> 
                {loading ? <p>Uploading assignment... Please wait.</p> : ""}

            </div>

            <div className='pt-4'>
                <button className='w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition' disabled={loading} onClick={handleSubmit}>{loading? <ClipLoader size={30} color='white'/>:"Submit Assignment"}</button>
            </div>
        </div>
      
    </div>
  )
}

export default SubmitAssignment
