// import mongoose from "mongoose";

// const submissionSchema = new mongoose.Schema({

//     assignmentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Assignment",
//         required: true
//     },

//     courseId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Course",
//         required: true
//     },

//     studentId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },

//     // for Now
//      // ✅ NEW FIELD
//     studentName: {
//         type: String,
//         required: true
//     },

//     // ✅ NEW FIELD
//     rollNumber: {
//         type: String,
//         required: true
//     },

//     submissionContent: {
//         type: String,
//         required: true
//     },

//     marks: {
//         type: Number,
//         default: 0
//     },

//     feedback: {
//         type: String,
//         default: ""
//     },

// }, { timestamps: true });

// const Submission =
// mongoose.model("Submission", submissionSchema);

// export default Submission;

import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Retained for compatibility with existing submissions
    studentName: {
      type: String,
      default: "",
    },

    rollNumber: {
      type: String,
      default: "",
    },

    // Optional because the student can submit a PDF file
    submissionContent: {
      type: String,
      default: "",
    },

    // Student's uploaded PDF
    submissionFile: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },

      originalName: {
        type: String,
        default: "",
      },

      mimeType: {
        type: String,
        default: "",
      },

      format: {
        type: String,
        default: "",
      },

      size: {
        type: Number,
        default: 0,
      },
    },

    // null means the submission has not been graded
    marks: {
      type: Number,
      default: null,
      min: 0,
    },

    feedback: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["submitted", "graded"],
      default: "submitted",
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },

    gradedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;