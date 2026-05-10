import React,
{ useEffect, useState }
from "react";

import axios from "axios";

import { useParams,
useNavigate }
from "react-router-dom";

import { serverUrl }
from "../../App";

function ViewSubmission() {

const { assignmentId }
= useParams();

const navigate =
useNavigate();

const [submissions,
setSubmissions] =
useState([]);

useEffect(()=>{

const fetchSubmissions =
async () => {

try {

const result =
await axios.get(

serverUrl +
`/api/course/viewsubmission/${assignmentId}`,

{ withCredentials:true }

);

setSubmissions(
result.data
);

}

catch(error){

console.log(error);

}

};

fetchSubmissions();

}, [assignmentId]);

return (

<div className="p-6">

<h2 className="text-xl
font-bold mb-6">

All Student Submissions

</h2>

{submissions.length === 0 && (

<p className="text-gray-500">

No submissions yet.

</p>

)}

{submissions.map(

(sub)=>(

<div

key={sub._id}

className="border
p-4 mb-4
rounded-lg
flex justify-between
items-center">

<div>

<h3 className="font-semibold">

{sub.studentName}

</h3>

<p className="text-sm
text-gray-600">

Roll No:
{sub.rollNumber}

</p>

</div>

<button

onClick={()=>navigate(
`/checksubmission/${sub._id}`
)}

className="bg-black
text-white
px-4 py-2
rounded-md">

Check Assignment

</button>

</div>

)

)}

</div>

);

}

export default ViewSubmission;