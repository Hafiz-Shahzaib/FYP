import React ,{ useEffect, useState  } from 'react'
import Nav from '../../component/Nav';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../../App';
import { setUserData } from "../../redux/userSlice";
import { setChats, setSelectedChat } from '../../redux/chatSlice'
import moment from 'moment'

function Chat() {
  const navigate = useNavigate();
  
  const [isSidebarVisible,setIsSidebarVisible] = useState(false);


  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    navigate('/chat')

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
      <Nav/>

      <button className='fixed top-20 left-4 z-[60] bg-white text-black px-3 py-2 rounded-md border-2 border-black' onClick={()=>setIsSidebarVisible(prev=>!prev)}>
        {isSidebarVisible ? 'Hide' : 'Show'} Sidebar
      </button>

      {/* sideBar */}

      <aside
  className={`w-[260px] h-screen bg-black fixed top-0 left-0 p-6 
  border-r border-gray-200 shadow-md transition-transform duration-300 z-50
  flex flex-col
  ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}`}
>

  {/* CLOSE BUTTON */}
  <img
    onClick={() => setIsSidebarVisible(false)}
    src={assets.close_icon}
    className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert'
    alt=""
  />

  {/* ================= TOP FIXED ================= */}
  <div className="flex-shrink-0">

    {/* Logo */}
    <img src={logo} alt="" className='w-100% flex px-[30%] h-[50px] max-w-48'/>
    {/* <img src={assets.logo_full} alt="" className='w-full max-w-48'/> */}
    {/* <img src={logo} alt="" className='w-100% h-[50px] max-w-48'/> */}

    {/* New Chat */}
    <button
      onClick={createNewChat}
      className='flex justify-center items-center w-full py-2 mt-8 text-black bg-white hover:bg-gray-600 text-sm rounded-md'
    >
      <span className='mr-2 text-xl'>+</span>
      New Chat
    </button>

    {/* Search */}
    <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 rounded-md'>
      <img
        src={assets.search_icon}
        className='w-4'
        alt=""
      />
      <input
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        type="text"
        placeholder='Search conversations'
        className='bg-transparent text-white text-xs placeholder:text-gray-400 outline-none w-full'
      />
    </div>

    {chats.length > 0 && (
      <p className='mt-4 text-sm text-white'>Recent Chats</p>
    )}
  </div>


  {/* ================= MIDDLE SCROLL ================= */}
  <div className='flex-1 overflow-y-auto mt-3 text-sm text-white space-y-3 pr-1'>
    {
      chats
      .filter((chat)=>
        chat.messages[0]
          ? chat.messages[0]?.content
              .toLowerCase()
              .includes(search.toLowerCase())
          : chat.name.toLowerCase().includes(search.toLowerCase())
      )
      .map((chat)=>(
        <div
          key={chat._id}
          onClick={()=>{
            navigate('/chat')
            dispatch(setSelectedChat(chat))
          }}
          className='p-2 px-4 border border-gray-300 rounded-md cursor-pointer flex justify-between group'
        >
          <div>
            <p className='truncate w-full'>
              {chat.messages.length > 0
                ? chat.messages[0].content.slice(0,32)
                : chat.name}
            </p>
            <p className='text-xs text-gray-400'>
              {moment(chat.updatedAt).fromNow()}
            </p>
          </div>

          <img
            src={assets.bin_icon}
            className='hidden group-hover:block w-4 cursor-pointer'
            alt=""
            onClick={(e)=>
              toast.promise(
                deleteChat(e, chat._id),
                { loading:'deleting...' }
              )
            }
          />
        </div>
      ))
    }
  </div>


  {/* ================= BOTTOM FIXED ================= */}
  <div className="flex-shrink-0 pb-4">

    {/* Community */}
    <div
      onClick={() => navigate('community')}
      className='flex items-center text-white gap-2 p-3 mt-4 border border-gray-300 rounded-md cursor-pointer'
    >
      <img src={assets.gallery_icon} className='w-4' alt="" />
      <p className='text-sm'>Community Images</p>
    </div>

    {/* Dark Mode */}
    
    {/* <div className='flex items-center justify-between p-3 mt-4 border border-gray-300 rounded-md'>
      <div className='flex items-center gap-2 text-white text-sm'>
        <img src={assets.theme_icon} className='w-4' alt="" />
        <p>Dark Mode</p>
      </div>

      <label className='relative inline-flex cursor-pointer'>
        <input
          type="checkbox"
          className='sr-only peer'
          checked={theme === 'dark'}
          onChange={() =>
            setTheme(theme === 'dark' ? 'light' : 'dark')
          }
        />
        <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600'></div>
        <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
      </label>
    </div> */}

    {/* User */}
    <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 rounded-md cursor-pointer group'>
      <img src={assets.user_icon} className='w-7 rounded-full' alt="" />

      <p className='flex-1 text-sm text-white truncate'>
        {user ? user.name : 'Login your account'}
      </p>

      {user && (
        <img
          onClick={logout}
          src={assets.logout_icon}
          className='h-5 hidden group-hover:block cursor-pointer'
          alt=""
        />
      )}
    </div>
  </div>

</aside>

      {/* <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]'> */}
      <main className={`h-screen overflow-hidden w-full transition-all duration-300 flex ${isSidebarVisible ? "md:pl-[260px]" : "pl-0"}`}>
        <Outlet />
      </main>

    </div>
  )
}

export default Chat