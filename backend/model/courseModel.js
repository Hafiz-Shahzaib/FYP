import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    subTitle:{
        type:String
    },
    description:{
        type:String
    },
    // category:{
    //     type:String,
    //     required:true
    // },
    // level:{
    //     type:String,
    //     enum:["Beginner", "Intermediate", "Advanced"]
    // },
    // new feild for semester
    // 🔁 category → semester
    semester:{
        // type:Number,
        type:String,
        required:true,
        min:1,
        max:8
    },

    // 🔁 level → courseCode
    courseCode:{
        type:String,
        required:true
    },

    // ✅ NEW subject
    subject:{
        type:String,
        required:true
    },



    // price:{
    //     type:Number
    // },
    thumbnail:{
        type:String
    },
    enrolledStudent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    lectures:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lecture"
    }],
    // Now
    assignments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Assignment"
    }],

    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isPublished:{
        type:Boolean,
        default:false
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    isActive: {
    type: Boolean,
    default: true
  }
    

},{timestamps:true})

const Course = mongoose.model("Course", courseSchema)

export default Course
