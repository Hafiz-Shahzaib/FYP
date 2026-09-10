import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
// export const serverUrl = "http://localhost:8000"
export const serverUrl = "https://fyp-qqik.vercel.app/"
import {ToastContainer} from "react-toastify"
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Dashboard from './pages/Eductor/Dashboard'
import Courses from './pages/Eductor/Courses'
import CreateCourses from './pages/Eductor/CreateCourses';
import getCreatorCourse from './customHooks/getCreatorCourse'
import EditCourse from './pages/Eductor/EditCourse';
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Eductor/CreateLecture'
import EditLecture from './pages/Eductor/EditLecture'
import ViewCourse from './pages/ViewCourse'
import ScrollToTop from './component/ScrollToTop'
import ViewLecture from './pages/ViewLecture'
import MyEnrolledCourses from './pages/MyEnrolledCourses'
import getAllReviews from './customHooks/getAllReviews'
import SearchWithAi from './pages/SearchWithAi'
import AdminDashboard from './pages/Admin/AdminDashboard';
// import StudentDashboard from './pages/studentDashboard'
// import Stm from './pages/Student/Student'
import Educator from './pages/Eductor/Educator'
import Admin from './pages/Admin/Admin'
import AdminUsers from './pages/Admin/AdminUsers'
import EditUser from './pages/Admin/EditUser'
import AddUser from './pages/Admin/AddUser'
import AdminCourses from './pages/Admin/AdminCourses'
import AddCourse from './pages/Admin/AddCourse'
import AdminEditCourse from './pages/Admin/AdminEditCourse'
import AdminLectures from './pages/Admin/AdminLectures'
import AdminAddLecture from './pages/Admin/AdminAddLecture'
import AdminEditLecture from './pages/Admin/AdminEditLecture'
import CreateAssignment from './pages/Assignment/CreateAssignment'
import EditAssignment from './pages/Assignment/EditAssignment'
import ViewAssignment from './pages/Assignment/ViewAssignment'
import SubmitAssignment from './pages/Assignment/SubmitAssignment'
import ViewSubmission from './pages/Assignment/ViewSubmission'
import CheckSubmission from './pages/Assignment/CheckSubmission'
import Chat from './pages/Chat/Chat'
import ChatBox from './pages/Chat/ChatBox';
import Community from './pages/Chat/Community';
// import Ch from './pages/Chat/ch'
import Student from './pages/Student/Student'
import StudentDashboard from './pages/Student/StudentDashboard';

function App() {
    getCurrentUser();
    getCreatorCourse();
    getPublishedCourse();
    getAllReviews();

    const {userData} = useSelector(state=>state.user);
  return (
    <>
    <ToastContainer />
    <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={userData ? <Profile /> : <Navigate to={"/signup"} />} />
        <Route path='/forget' element={userData ? <ForgetPassword /> : <Navigate to={"/signup"} />} />
        <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/signup"} />} />
        <Route path='/allcourses' element={userData ? <AllCourses /> : <Navigate to={"/signup"} />} />



        
        {/* <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/student-dashboard' element={userData?.role === "student" ? <StudentDashboard /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/student' element={userData?.role === "student" ? <StudentDashboard /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/admin-dashboard' element={userData?.role === "admin" ? <AdminDashboard /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/courses' element={userData?.role === "educator" ? <Courses /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/createcourse' element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/editcourse/:courseId' element={userData?.role === "educator" ? <EditCourse /> : <Navigate to={"/signup"} />} /> */}
        <Route path='/createlecture/:courseId' element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />} />
        <Route path='/createassignment/:courseId' element={userData?.role === "educator" ? <CreateAssignment /> : <Navigate to={"/signup"} />} />
        <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator" ? <EditLecture /> : <Navigate to={"/signup"} />} />
        <Route path='/editassignment/:courseId/:assignmentId' element={userData?.role === "educator" ? <EditAssignment /> : <Navigate to={"/signup"} />} />
        <Route path='/viewcourse/:courseId' element={userData ? <ViewCourse /> : <Navigate to={"/signup"} />} />
        <Route path='/viewlecture/:courseId' element={userData ? <ViewLecture /> : <Navigate to={"/signup"} />} />
        <Route path='/viewassignment/:courseId' element={userData ? <ViewAssignment /> : <Navigate to={"/signup"} />} />
        <Route path='/submitassignment/:courseId/:assignmentId' element={userData ? <SubmitAssignment /> : <Navigate to={"/signup"} />} />
        {/* <Route path='/viewsubmission/:assignmentId' element={userData ? <ViewSubmission /> : <Navigate to={"/signup"} />} /> */}
        <Route path='/viewsubmission/:courseId/:assignmentId' element={userData ? <ViewSubmission /> : <Navigate to={"/signup"} />} />
        <Route path="/checksubmission/:submissionId" element={<CheckSubmission />}/>
        {/* <Route path='/viewsubmission' element={userData ? <ViewSubmission /> : <Navigate to={"/signup"} />} /> */}
        {/* <Route path='/mycourses' element={userData ? <MyEnrolledCourses /> : <Navigate to={"/signup"} />} /> */}
        <Route path='/search' element={userData ? <SearchWithAi /> : <Navigate to={"/signup"} />} />
        {/* <Route path='/chat' element={userData ? <Chat /> : <Navigate to={"/signup"} />} /> */}

        <Route path='/chat' element={<Chat />}>
          <Route path='/chat' element={<ChatBox />} />
          <Route path='community' element={<Community />} />
        </Route>

        <Route path='/student' element={<Student />}>
          <Route path='/student' element={<StudentDashboard />} />
          <Route path='allcourses' element={<AllCourses />} />
          <Route path='mycourses' element={<MyEnrolledCourses /> } />
        </Route>

        {/* for educator */}
        <Route path='/dashboard' element={<Educator />}>
          <Route path='/dashboard' element={ <Dashboard />} />
          {/* </Route> */}
          <Route path='courses' element={<Courses />} />
          {/* </Route> */}
          <Route path='courses/createcourse' element={userData?.role === "educator" ? <CreateCourses /> : <Navigate to={"/signup"} />} />
          <Route path='courses/editcourse/:courseId' element={userData?.role === "educator" ? <EditCourse /> : <Navigate to={"/signup"} />} />
          <Route path='createlecture/:courseId' element={userData?.role === "educator" ? <CreateLecture /> : <Navigate to={"/signup"} />} />
        </Route>


        {/* for admin */}
        <Route path='/admindashboard' element={<Admin />}>
          <Route path='/admindashboard' element={ <AdminDashboard />} />
          <Route path="admincourse" element={<AdminCourses />} />
          <Route path="admincourse/add-course" element={<AddCourse />}/>
          <Route path="admincourse/admin-edit-course/:id" element={<AdminEditCourse />}/>
          <Route path='adminuser' element={<AdminUsers />} />
          {/* <Route path="/admin/edit-user/:id" element={<EditUser />}/> */}
          <Route path="adminuser/edit-user/:id" element={<EditUser />}/>
          <Route path="adminuser/add-user" element={<AddUser />} />
        </Route>


{/* for course page */}
{/* <Route path="admincourse" element={<AdminCourses />} /> */}

{/* <Route
  path="admincourse/add-course"
  element={<AddCourse />}
/> */}

<Route
  path="admincourse/admin-edit-course/:id"
  element={<AdminEditCourse />}
/>

{/* for lecture page */}
{/* <Route path="admincourse" element={<AdminCourses />} /> */}

{/* <Route path="admincourse/add-course" element={<AddCourse />} /> */}

{/* <Route path="admincourse/edit-course/:id" element={<EditCourse />} /> */}

<Route path="admincourse/:courseId/lectures" element={<AdminLectures />} />

<Route path="admincourse/:courseId/lectures/admin-add-lecture" element={<AdminAddLecture />} />

<Route path="admincourse/:courseId/lectures/admin-edit-lecture/:lectureId" element={<AdminEditLecture />} />
      </Routes>
    </>
  )
}

export default App
