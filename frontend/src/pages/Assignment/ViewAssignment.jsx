import axios from 'axios'
import React, {useEffect ,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FcClock } from "react-icons/fc";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { serverUrl } from '../../App';

function ViewAssignment() {
    const {courseId} = useParams()
    const {courseData} = useSelector(state => state.course)
    const {userData} = useSelector(state => state.user)
    const selectedCourse = courseData?.find((course)=> course._id === courseId)
    const [creatorData, setCreatorData] = useState(null)
    const [selectedAssignment, setSelectedAssignment] = useState(selectedCourse?.assignments?.[0] || null)

    // for Grade
    const [studentSubmission,
setStudentSubmission] =
useState(null);    

    const [zoomImage, setZoomImage] = useState(null);

    // for DeadLine
    const [timeLeft, setTimeLeft] = useState("");
    const [isExpired, setIsExpired] = useState(false);

    const navigate = useNavigate()

    useEffect(()=>{


        const handleCreator = async () => {
            if(selectedCourse?.creator){
                try {
                    const result = await axios.post(serverUrl + "/api/course/creator",{userId:selectedCourse?.creator}, {withCredentials:true})
                    console.log(result.data)
                    setCreatorData(result.data)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        handleCreator()
    },[selectedCourse])

    // for DeadLine
    useEffect(()=>{

if(!selectedAssignment?.dueDate)
return;

const interval =
setInterval(()=>{

const now =
new Date().getTime();

const due =
new Date(
selectedAssignment.dueDate
).getTime();

const distance =
due - now;

if(distance <= 0){

clearInterval(interval);

setIsExpired(true);

setTimeLeft("Time Expired");

return;

}

const hours =
Math.floor(
(distance %
(1000*60*60*24))
/
(1000*60*60)
);

const minutes =
Math.floor(
(distance %
(1000*60*60))
/
(1000*60)
);

const seconds =
Math.floor(
(distance %
(1000*60))
/
1000
);

setTimeLeft(
`${hours}h : ${minutes}m : ${seconds}s`
);

},1000);

return () =>
clearInterval(interval);

},[selectedAssignment]);


    // for Grade
    useEffect(()=>{

if(!selectedAssignment?._id)
return;

const fetchStudentSubmission =
async ()=>{

try{

const result =
await axios.get(

serverUrl +
`/api/course/studentsubmission/${selectedAssignment._id}`,

{ withCredentials:true }

);
console.log("Student Submission:", result.data);

setStudentSubmission(
result.data
);

}

catch(error){

console.log(error);

}

};

fetchStudentSubmission();

const interval =
setInterval(
fetchStudentSubmission,
5000
);

return () =>
clearInterval(interval);

},[selectedAssignment]);
    

    const handleContentClick = (e) => {
  if (e.target.tagName === "IMG") {
    setZoomImage(e.target.src);
  }
};

// for code
useEffect(() => {
  hljs.highlightAll();
}, [selectedAssignment]);

// for copy button
useEffect(() => {
  const blocks = document.querySelectorAll("pre");

  blocks.forEach((block) => {
    if (block.querySelector(".copy-btn")) return;

    const button = document.createElement("button");
    button.innerText = "Copy";
    button.className =
      "copy-btn absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded";

    block.style.position = "relative";
    block.appendChild(button);

    button.addEventListener("click", () => {
      const code = block.innerText.replace("Copy", "");
      navigator.clipboard.writeText(code);
      button.innerText = "Copied!";
      setTimeout(() => (button.innerText = "Copy"), 1500);
    });
  });
}, [selectedAssignment]);

  

  return (
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6'>

        {/* left or top */}
        <div className='w-full md:w-4/5 bg-white rounded-2xl shadow-md p-6 border border-gray-200'>
            <div className='mb-6'>

                <h2 className='text-2xl font-bold flex items-center justify-start gap-[20px] text-gray-800'><FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>{selectedCourse?.title}</h2>

                {/* for DeadLine */}
                <button disabled={isExpired}className={`px-4 py-2 rounded ${isExpired? "bg-gray-400 cursor-not-allowed": "bg-black hover:bg-gray-500"} text-white`}onClick={()=>navigate(`/submitassignment/${courseId}/${selectedAssignment?._id}`)}>{isExpired? "Submission Closed": "Submit Assignment"}</button>

                <div className='mt-2 flex gap-4 text-sm text-gray-500 font-medium'>
                    <span>Semester : {selectedCourse?.semester}</span>
                    <span>Course Code : {selectedCourse?.courseCode}</span>
                    <span>Subject : {selectedCourse?.subject}</span>
                </div>

            </div>

            {/* for Gade */}
            {studentSubmission && (

<div className="mt-6
border
rounded-lg
p-4
bg-gray-50">

<h3 className="text-lg
font-semibold
mb-3">

Your Result

</h3>

<p className="mb-2">

<b>Marks: </b>

{studentSubmission?.marks !== undefined
? studentSubmission.marks
: "Not graded yet"}

</p>

<p>

<b>Feedback: </b>

{studentSubmission?.feedback
|| "No feedback yet"}

</p>

</div>

)}

            

            {/* for DeadLine */}
            <div className="mt-2 text-2xl">
              <p className="text-red-600 font-semibold flex gap-1 justify-center">
                <FcClock className='text-black w-[35px] h-[35px]'/>Time Left: {timeLeft}
              </p>
            </div>

            <div className='mt-2'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>{selectedAssignment?.assignmentTitle}</h2>
            </div>


            
{selectedAssignment?.assignmentContent && (
  
<div
  onClick={handleContentClick}
  className="text-gray-800 text-[15px] leading-7 break-words

  [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4
  [&_code]:text-sm

  [&_ul]:list-disc [&_ul]:pl-6
  [&_ol]:list-decimal [&_ol]:pl-6
  [&_p]:mb-4

  [&_img]:cursor-zoom-in [&_img]:mx-auto [&_img]:block [&_img]:my-5

  "
  dangerouslySetInnerHTML={{
    __html: selectedAssignment?.assignmentContent
  }}
/>
)}

        </div>
  

        {/* right or bottom */}
        
        <div className='w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>All Assignments</h2>
            <div className='flex flex-col gap-3 mb-6'>
                {selectedCourse?.assignments?.length > 0 ?
                
                (selectedCourse?.assignments?.map((assignment, index)=>(
                    <button key={index} onClick={()=>setSelectedAssignment(assignment)} className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                        selectedAssignment?._id === assignment._id
                        ? 'bg-gray-200 border-gray-500'
                        : 'hover:bg-gray-50 border-gray-300'
                    }`}><h2 className='text-sm font-semibold text-gray-800'>{assignment.assignmentTitle}</h2>

                    </button>
                )))
                : (<p className='text-gray-500'>No Assignment available.</p>)}

            </div>
                {/* educator Info */}
            {creatorData &&
                <div className='mt-4 border-t pt-4'>
                    <h3 className='text-md font-semibold text-gray-700 mb-3'>Educator</h3>

                    <div className='flex items-center gap-4'><img src={creatorData?.photoUrl} alt="" className='w-14 h-14 rounded-full object-cover'/></div>

                    <div>
                        <h2 className='text-base font-medium text-gray-800'>{creatorData?.name}</h2>
                        <p className='text-sm text-gray-600'>{creatorData?.description}</p>
                        <p className='text-sm text-gray-600'>{creatorData?.email}</p>
                    </div>    
                </div>}

                
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

export default ViewAssignment
