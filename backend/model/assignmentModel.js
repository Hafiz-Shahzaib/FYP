// import mongoose from "mongoose";

// const assignmentSchema = new mongoose.Schema({
//     assignmentTitle:{
//         type:String,
//         required:true
//     },
//     assignmentContent: {          
//         type: String
//     },

//     // ✅ NEW FIELD
//     dueDate:{
//         type: Date,
//         required:false
//     }

// },{timestamps:true})

// const Assignment = mongoose.model("Assignment", assignmentSchema)

// export default Assignment;




import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    assignmentTitle: {
      type: String,
      required: true,
      trim: true,
    },

    assignmentContent: {
      type: String,
      default: "",
    },

    dueDate: {
      type: Date,
      required: false,
    },

    // Direct course-level relationship
    // Optional initially to support existing assignments
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: false,
      index: true,
    },

    // Teacher who created the assignment
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    // Teacher's uploaded PDF or image
    assignmentFile: {
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

    // Maximum marks for this assignment
    maxMarks: {
      type: Number,
      default: 100,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;