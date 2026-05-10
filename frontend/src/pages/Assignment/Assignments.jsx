import axios from 'axios'
import React, {useEffect ,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FcClock } from "react-icons/fc";
import ReactQuill from "react-quill-new";
// for code
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { serverUrl } from '../../App';


function CheckSubmission() {
    const {submissionId} = useParams()
    const [submission, setSubmission] = useState(null);
    
    const [marks, setMarks] = useState("");
    
    const [feedback, setFeedback] = useState("");

    

    const navigate = useNavigate()

    useEffect(()=>{


        const fetchSubmission = async () => {
        
                try {
                    const result = await axios.get(serverUrl + `/api/course/getsubmission/${submissionId}`, {withCredentials:true})
                    console.log(result.data)
                    setSubmission(result.data)
                    setMarks(result.data.marks)
                    setFeedback(result.data.feedback || "")
                } catch (error) {
                    console.log(error)
                }
            
        }
        fetchSubmission()
    },[submissionId])

    const handleSave = async () => {
        try {
            await axios.post(serverUrl + `/api/course/gradesubmission/${submissionId}`,{marks, feedback},{ withCredentials:true });
            toast.success("Graded Successfully")
            navigate(-1)
        } catch (error) {
            console.log(error)
            toast.error("Error grading submission")
        }
    }

    if(!submission){ 
        return <p>Loading...</p>;
    }

    
  return (
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6'>

        {/* left or top */}
        <div className='w-full md:w-4/5 bg-white rounded-2xl shadow-md p-6 border border-gray-200'>
            <div className='mb-6'>

                <h2 className='text-2xl font-bold flex items-center justify-start gap-[20px] text-gray-800'><FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>Checking Assignment</h2>

                <div className='mt-2 flex gap-4 text-sm text-gray-500 font-medium'>
                    <span>Semester : {selectedCourse?.semester}</span>
                    <span>Course Code : {selectedCourse?.courseCode}</span>
                    <span>Subject : {selectedCourse?.subject}</span>
                </div>

            </div>

            <div className='mt-2'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'> Name : {submission.studentName}</h2>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'> Roll Nummber : {submission.rollNumber}</h2>
            </div>

            <div className="text-gray-800 text-[15px] leading-7 break-words

            [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
            [&_code]:text-sm

            [&_ul]:list-disc [&_ul]:pl-6
            [&_ol]:list-decimal [&_ol]:pl-6
            [&_p]:mb-4

            [&_img]:cursor-zoom-in [&_img]:mx-auto [&_img]:block [&_img]:my-5"
            dangerouslySetInnerHTML={{
            __html: submission.submissionContent
        }}/>

        </div>
        

        {/* right or bottom */}
        
        <div className='w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>All Assignments</h2>
            <div className='flex flex-col gap-3 mb-6'>
                <input type="Number" placeholder="Enter marks" onChange={(e) => setMarks(e.target.value)} value={marks}  />
                <textarea  placeholder="Enter feedback" onChange={(e) => setFeedback(e.target.value)} value={feedback}  />
                <button onClick={handleSave}>Save</button>
            </div>
                
        </div>

        {/* ✅ ADD IMAGE MODAL HERE (IMPORTANT) */}
    {zoomImage && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
  onClick={() => setZoomImage(null)}
  >
    
    {/* Close Button */}
    <button
      onClick={() => setZoomImage(null)}
      className="absolute top-5 right-5 text-white text-3xl"

    >
      <FaTimes />
    </button>

    {/* Image */}
    <img
      src={zoomImage}
      alt="Zoom"
      className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg animate-zoomIn"
    />
  </div>
)}

    </div>
  )
}

export default CheckSubmission
