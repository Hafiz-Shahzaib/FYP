import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({

    assignmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true
    },

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // for Now
     // ✅ NEW FIELD
    studentName: {
        type: String,
        required: true
    },

    // ✅ NEW FIELD
    rollNumber: {
        type: String,
        required: true
    },

    submissionContent: {
        type: String,
        required: true
    },

    marks: {
        type: Number,
        default: 0
    },

    feedback: {
        type: String,
        default: ""
    },

}, { timestamps: true });

const Submission =
mongoose.model("Submission", submissionSchema);

export default Submission;