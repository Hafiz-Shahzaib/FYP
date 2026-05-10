import React ,{ useEffect, useState  } from 'react'
import logo from './../../assets/logo.jpg'
// import Nav from '../component/Nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, Outlet } from 'react-router-dom';
// import ai from "../assets/SearchAi.png";
import { useSelector } from 'react-redux';
// import Card from '../component/Card';
import Nav from '../../component/Nav';

import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from './../../assets/assets';
import { useDispatch } from 'react-redux'
import { setUserData } from "../../redux/userSlice";
import { setChats, setSelectedChat } from '../../redux/chatSlice'
import { serverUrl } from '../../App';

function Ch({isMenuOpen, setIsMenuOpen}) {
  const navigate = useNavigate();
  const {courseData} = useSelector(state=>state.course)
  const [semester,setSemester] = useState([])
  const [filterCourses,setFilterCourses] = useState([])
  const [isSidebarVisible,setIsSidebarVisible] = useState(false);

  const user = useSelector(state => state.user.userData)
    const chats = useSelector(state => state.chat.chats)
  
    const dispatch = useDispatch();
  
    // const navigate = useNavigate();
    
    
      const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
      const [token, setToken] = useState(localStorage.getItem('token') || null);
  
  
    const [search, setSearch] = useState('')
  
  
    const fetchUser = async () => {
            try {
                const { data } = await axios.get(serverUrl + '/api/user/data',
                  //  {headers: {Authorization: token}}
                  { withCredentials: true }
                )
                if(data.success){
                    // setUser(data.user)
                    dispatch(setUserData(data.user))
                }else{
                    toast.error(data.message)
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    
  
        const createNewChat = async () => {
    try {
      if (!user) return toast('Login to create a new chat')
  
      const { data } = await axios.get(serverUrl + '/api/chat/create', {
        withCredentials: true
      })
  
      if (data.success) {
      await fetchUsersChats()
  
      const chatsRes = await axios.get(serverUrl + '/api/chat/get', {
          withCredentials: true
      })
  
      if (chatsRes.data.success) {
          dispatch(setChats(chatsRes.data.chats))
  
          const latestChat = chatsRes.data.chats.at(-1) // safer
          dispatch(setSelectedChat(latestChat))
      }
  }
  
      navigate('/ch')
  
    } catch (error) {
      toast.error(error.message)
    }
  }
    
    
        const fetchUsersChats = async () => {
            try {
                const { data } = await axios.get(serverUrl + '/api/chat/get',
                  //  {headers: {Authorization: token}}
                  { withCredentials: true }
                  )
  
                if(data.success){
      dispatch(setChats(data.chats))
  
      if(data.chats.length === 0){
          await createNewChat()
      } else {
          dispatch(setSelectedChat(data.chats[0]))
      }
  }
            } catch (error) {
                toast.error(error.message)
            }
        }
  
    const logout = () => {
      localStorage.removeItem('token')
      dispatch(setUserData(null))
  setToken(null)
      toast.success('Logged out successfully')
    }
  
    const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation()
  
      const confirm = window.confirm('Are you sure you want to delete this chat?')
      if (!confirm) return
  
      const { data } = await axios.post(
        serverUrl + '/api/chat/delete',
        { chatId },
        { withCredentials: true }
      )
  
      if (data.success) {
  
        // ✅ REMOVE DELETED CHAT FROM REDUX
        const updatedChats = chats.filter(chat => chat._id !== chatId)
        dispatch(setChats(updatedChats))
  
        // ✅ OPTIONAL: refresh from backend
        await fetchUsersChats()
  
        toast.success(data.message)
      }
  
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className='flex min-h-screen bg-gray-50'>
      {/* <Nav/> */}

      <button className='fixed top-20 left-4 z-50 bg-white text-black px-3 py-1 rounded md:hidden border-2 border-black' onClick={()=>setIsSidebarVisible(prev=>!prev)}>
        {isSidebarVisible ? 'Hide' : 'Show'} Filters
      </button>

      {/* sideBar */}

      <aside className={`w-[260px] h-screen overflow-y-auto bg-black fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"} md:block md:translate-x-0`}>
        {/* <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6'><FaArrowLeftLong className='text-white' onClick={()=>navigate("/")}/>Filter by Category</h2> */}
        {/* <img src={logo} alt="" className='w-[50px] max-w-48'/> */}

        {/* <form action="" onSubmit={(e)=>e.preventDefault()} className='space-y-4 text-sm bg-gray-600 border-white text-[white] border p-[20px] rounded-2xl'>

          <button className='px-[10px] py-[10px] bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer' onClick={()=>navigate("/search")}>Search with AI <img src={ai} className='w-[30px] h-[30px] rounded-full' alt="" /></button>

          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 1'} onChange={toggleCategory}/> Semester 1
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 2'} onChange={toggleCategory}/> 
            Semester 2
          </label>

          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 3'} onChange={toggleCategory}/> 
            Semester 3
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 4'} onChange={toggleCategory}/> 
            Semester 4
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 5'} onChange={toggleCategory}/> 
            Semester 5
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 6'} onChange={toggleCategory}/> 
            Semester 6
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 7'} onChange={toggleCategory}/> 
            Semester 7
          </label>
          <label htmlFor="" className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
            <input type="checkbox" className='accent-black w-4 h-4 rounded-md' value={'Semester 8'} onChange={toggleCategory}/> 
            Semester 8
          </label>
        
        </form> */}

        <button onClick={createNewChat} className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-sm rounded-md cursor-pointer'>
                <span className='mr-2 text-xl'>+</span> New Chat
              </button>
        
              {/* Search Conversation */}
              <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md'>
                <img src={assets.search_icon} className='w-4 no-dark:invert' alt=""/>
                <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" placeholder='Search conversations' className='text-xs placeholder:text-gray-400 outline-none'/>
              </div>
        
              {/* Recent Chats */}
              {chats.length > 0 && <p className='mt-4 text-sm text-white'>Recent Chats</p>}
              {/* <div className='flex-1 overflow-y-scroll mt-3 text-sm spacey-3'> */}
              <div className='flex-1 overflow-y-auto mt-3 text-sm text-white space-y-3'>
                {
                 chats.filter((chat)=>chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase())).map((chat)=>(
                  <div 
                  // onClick={()=> {navigate('/chat'); setSelectedChat(chat); setIsMenuOpen(false)}}
                  onClick={() => {
            navigate('/chat')
            dispatch(setSelectedChat(chat))
            setIsMenuOpen(false)
        }} 
                  key={chat._id} className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group'>
                    <div>
                      <p className='truncate w-full'>
                        {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>{moment(chat.updatedAt).fromNow()}</p>
                    </div>
                    <img src={assets.bin_icon} className='hidden group-hover:block w-4 cursor-pointer not-dark:invert' alt="" onClick={e=> toast.promise(deleteChat(e,chat._id), {loading: 'deleting...'})}/>
                    {/* <IoTrashBinOutline className='hidden mt-4 group-hover:block w-4 cursor-pointer not-dark:invert' alt="" onClick={e=> toast.promise(deleteChat(e,chat._id), {loading: 'deleting...'})}/> */}
                  </div>
                ))
                }
              </div>
            
              {/* Community Image */}
              <div onClick={() => {navigate('community'); setIsMenuOpen(false)}} className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-103 transition-all'>
                <img src={assets.gallery_icon} className='w-4.5 not-dark:invert' alt="" />
                <div className='flex flex-col text-sm text-white'>
                  <p>Community Images</p>
                </div>
              </div>
        
        
              {/* Dark Mode Toggle */}
              <div className='flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md'>
                <div className='flex items-center gap-2 text-sm text-white'>
                  <img src={assets.theme_icon} className='w-4 not-dark:invert' alt="" />
                  <p>Dark Mode</p>
                </div>
                <label className='relative inline-flex cursor-pointer'>
                  <input onChange={()=> setTheme(theme === 'dark' ? 'light' : 'dark')} type="checkbox" className='sr-only peer' checked={theme === 'dark'}/>
                  <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'>
                  </div>
                  <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
                </label>
              </div>
        
              {/* User Account */}
              <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer group'>
                <img src={assets.user_icon} className='w-7 rounded-full' alt="" />
                <p className='flex-1 text-sm text-white dark:text-primary truncate'>{user ? user.name : 'Login your account'}</p>
                {user && <img onClick={logout} src={assets.logout_icon} className='h-5 cursor-pointer hidden not-dark:invert group-hover:block'/>}
              </div>
            
            <img onClick={()=> setIsMenuOpen(false)} src={assets.close_icon} className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert' alt="" />


      </aside>

      <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]'>
        <Outlet />
      </main>

    </div>
  )
}

export default Ch
