import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";

function CreateAssignment() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [assignmentContent, setAssignmentContent] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [maxMarks, setMaxMarks] = useState(100);
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateAssignment = async (e) => {
    e.preventDefault();

    if (!assignmentTitle.trim()) {
      return toast.error("Please enter assignment title");
    }

    if (!dueDate) {
      return toast.error("Please select a due date");
    }

    if (Number(maxMarks) <= 0) {
      return toast.error("Maximum marks must be greater than 0");
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("assignmentTitle", assignmentTitle);
      formData.append("assignmentContent", assignmentContent);
      formData.append("dueDate", dueDate);
      formData.append("maxMarks", maxMarks);

      if (assignmentFile) {
        formData.append("assignmentFile", assignmentFile);
      }

      const result = await axios.post(
        `${serverUrl}/api/course/createassignment/${courseId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success(
        result.data.message || "Assignment created successfully"
      );

      setAssignmentTitle("");
      setAssignmentContent("");
      setDueDate("");
      setMaxMarks(100);
      setAssignmentFile(null);

      // Reset file input
      e.target.reset();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create assignment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-3xl rounded-xl bg-white p-5 shadow-lg sm:p-8">

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <FaArrowLeftLong
            className="cursor-pointer text-xl text-gray-700 hover:text-black"
            onClick={() => navigate(-1)}
          />

          <div>
            <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl">
              Create Assignment
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add an assignment for your students.
            </p>
          </div>
        </div>

        {/* Assignment Form */}
        <form
          onSubmit={handleCreateAssignment}
          className="space-y-5"
        >

          {/* Assignment Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Assignment Title *
            </label>

            <input
              type="text"
              placeholder="Enter assignment title"
              value={assignmentTitle}
              onChange={(e) =>
                setAssignmentTitle(e.target.value)
              }
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Assignment Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Assignment Description
            </label>

            <textarea
              rows="5"
              placeholder="Enter assignment instructions..."
              value={assignmentContent}
              onChange={(e) =>
                setAssignmentContent(e.target.value)
              }
              className="w-full resize-y rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Due Date & Maximum Marks */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Due Date *
              </label>

              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full rounded-md border border-gray-300 px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Maximum Marks *
              </label>

              <input
                type="number"
                min="1"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

          </div>

          {/* Assignment File */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Assignment File (Optional)
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={(e) =>
                setAssignmentFile(e.target.files[0] || null)
              }
              className="w-full rounded-md border border-gray-300 p-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-gray-200 file:px-4 file:py-2 file:text-sm file:font-medium"
            />

            <p className="mt-2 text-xs text-gray-500">
              Supported formats: PDF, JPG, JPEG, PNG, WebP.
            </p>

            {assignmentFile && (
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-md bg-gray-100 p-3">
                <span className="break-all text-sm text-gray-700">
                  {assignmentFile.name}
                </span>

                <button
                  type="button"
                  onClick={() => setAssignmentFile(null)}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
              className="rounded-md bg-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              onClick={() => navigate(-1)}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <ClipLoader size={20} color="white" />
                  Creating...
                </>
              ) : (
                "Create Assignment"
              )}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAssignment;