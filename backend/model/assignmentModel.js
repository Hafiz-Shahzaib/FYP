import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    assignmentTitle:{
        type:String,
        required:true
    },
    assignmentContent: {          
        type: String
    },

    // ✅ NEW FIELD
    dueDate:{
        type: Date,
        required:false
    }

},{timestamps:true})

const Assignment = mongoose.model("Assignment", assignmentSchema)

export default Assignment;