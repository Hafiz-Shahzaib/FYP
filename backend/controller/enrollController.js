import Course from '../model/courseModel.js'
import User from '../model/userModel.js'

export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.userId   // from auth middleware

        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).json({ message: "Course not found" })
        }

        const user = await User.findById(userId)

        // add course to user
        if (!user.enrolledCourses.includes(courseId)) {
            user.enrolledCourses.push(courseId)
            await user.save()
        }

        // add student to course
        if (!course.enrolledStudent.includes(userId)) {
            course.enrolledStudent.push(userId)
            await course.save()
        }

        return res.status(200).json({ message: "Enrollment successful" })

    } catch (error) {
        return res.status(500).json({ message: `Enrollment failed ${error}` })
    }
}
