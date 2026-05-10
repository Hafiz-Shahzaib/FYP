import axios from 'axios'
import React, {useEffect ,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
// for code
import hljs from "highlight.js";
import "highlight.js/styles/github.css";


function ViewLecture() {
    const {courseId} = useParams()
    const {courseData} = useSelector(state => state.course)
    const {userData} = useSelector(state => state.user)
    const selectedCourse = courseData?.find((course)=> course._id === courseId)
    const [creatorData, setCreatorData] = useState(null)
    const [selectedLecture, setSelectedLecture] = useState(selectedCourse?.lectures?.[0] || null)
    const [zoomImage, setZoomImage] = useState(null);
    

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

    const handleContentClick = (e) => {
  if (e.target.tagName === "IMG") {
    setZoomImage(e.target.src);
  }
};

// for code
useEffect(() => {
  hljs.highlightAll();
}, [selectedLecture]);

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
}, [selectedLecture]);

  // for youtube video
  const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;

  // watch?v= format
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/");
  }

  // youtu.be format
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return null;
};

  return (
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6'>

        {/* left or top */}
        <div className='w-full md:w-4/5 bg-white rounded-2xl shadow-md p-6 border border-gray-200'>
            <div className='mb-6'>

                <h2 className='text-2xl font-bold flex items-center justify-start gap-[20px] text-gray-800'><FaArrowLeftLong className='text-black w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>{selectedCourse?.title}</h2>

                <div className='mt-2 flex gap-4 text-sm text-gray-500 font-medium'>
                    <span>Semester : {selectedCourse?.semester}</span>
                    <span>Course Code : {selectedCourse?.courseCode}</span>
                    <span>Subject : {selectedCourse?.subject}</span>
                </div>

            </div>

            {/* video player */}
            

            <div className='aspect-video bg-black rounded-xl overflow-hidden mb-4 border'>

{selectedLecture?.videoUrl ? (

selectedLecture.videoUrl.includes("youtube") ||
selectedLecture.videoUrl.includes("youtu.be")

? (

<iframe
  className="w-full h-full"
  src={getYoutubeEmbedUrl(selectedLecture.videoUrl) || null}
  title="YouTube video"
  allowFullScreen
/>

) : (

<video
  className='w-full h-full object-cover'
  src={selectedLecture.videoUrl}
  controls
/>

)

) : (

<div className='flex items-center justify-center h-full text-white'>
Select a lecture to start watching
</div>

)}

</div>

            
            <div className='mt-2'>
                
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>{selectedLecture?.lectureTitle}</h2>
            </div>


            
{selectedLecture?.lectureContent && (
  
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
    __html: selectedLecture?.lectureContent
  }}
/>
)}
        </div>

        

        {/* right or bottom */}
        
        <div className='w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>All Lectures</h2>
            <div className='flex flex-col gap-3 mb-6'>
                {selectedCourse?.lectures?.length > 0 ?
                
                (selectedCourse?.lectures?.map((lecture, index)=>(
                    <button key={index} onClick={()=>setSelectedLecture(lecture)} className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                        selectedLecture?._id === lecture._id
                        ? 'bg-gray-200 border-gray-500'
                        : 'hover:bg-gray-50 border-gray-300'
                    }`}><h2 className='text-sm font-semibold text-gray-800'>{lecture.lectureTitle}</h2>
                    <FaPlayCircle className='text-lg text-black'/>

                    </button>
                )))
                : (<p className='text-gray-500'>No lectures available.</p>)}

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

export default ViewLecture
