import React, { useState, useEffect } from "react";
import { FaArrowLeftLong, FaFilePdf } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "./../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function SubmitAssignment() {
  const { courseId, assignmentId } = useParams();
  const navigate = useNavigate();

  const { userData } = useSelector((state) => state.user);

  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [submissionContent, setSubmissionContent] = useState("");
  const [submissionFile, setSubmissionFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Automatically fill student name
  useEffect(() => {
    if (userData) {
      setStudentName(userData.name || "");
    }
  }, [userData]);

  // Handle PDF selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow PDF files only
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      toast.error("Please upload a PDF file only.");
      e.target.value = "";
      setSubmissionFile(null);
      return;
    }

    setSubmissionFile(file);
  };

  // Submit assignment
  const handleSubmit = async () => {
    if (!studentName.trim() || !rollNumber.trim()) {
      toast.error("Name and Roll Number are required.");
      return;
    }

    if (!submissionFile) {
      toast.error("Please upload your assignment PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("studentName", studentName.trim());
      formData.append("rollNumber", rollNumber.trim());
      formData.append("submissionContent", submissionContent);
      formData.append("submissionFile", submissionFile);

      const result = await axios.post(
        `${serverUrl}/api/course/submitassignment/${courseId}/${assignmentId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      toast.success("Assignment submitted successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Assignment submission error:", error);

      toast.error(
        error.response?.data?.message || "Failed to submit assignment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <FaArrowLeftLong
            className="text-gray-600 cursor-pointer hover:text-black"
            onClick={() => navigate(-1)}
          />

          <h2 className="text-xl font-semibold text-gray-800">
            Submit Assignment
          </h2>
        </div>

        <div className="space-y-5">

          {/* Student Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student Name *
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number *
            </label>

            <input
              type="text"
              placeholder="Enter your roll number"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>

          {/* Assignment Content (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>

            <textarea
              placeholder="Write any additional comments here..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black resize-y"
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Assignment (PDF) *
            </label>

            <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-black transition">
              <FaFilePdf className="text-4xl text-red-500 mb-3" />

              <span className="text-sm font-medium text-gray-700 text-center">
                {submissionFile
                  ? submissionFile.name
                  : "Click to upload your assignment PDF"}
              </span>

              <span className="text-xs text-gray-500 mt-2">
                PDF files only
              </span>

              <input
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>

            {submissionFile && (
              <div className="flex items-center justify-between mt-3 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 min-w-0">
                  <FaFilePdf className="text-red-500 shrink-0" />

                  <span className="text-sm text-gray-700 truncate">
                    {submissionFile.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmissionFile(null)}
                  className="text-sm text-red-500 hover:text-red-700 ml-3"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-700 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <ClipLoader size={22} color="white" />
                <span className="ml-2">Submitting Assignment...</span>
              </>
            ) : (
              "Submit Assignment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmitAssignment;