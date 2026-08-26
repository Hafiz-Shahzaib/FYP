import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo (1).svg'
import { assets } from './../../assets/assets';
import Message from './Message'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../../App';
import { addMessage, setMessages } from '../../redux/chatSlice'
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCircleStop } from "react-icons/fa6";
// import logo from '../../assets/logo.jpg'

function ChatBox() {

  const containerRef = useRef(null)
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.userData)
  const selectedChat = useSelector(state => state.chat.selectedChat)
const messages = useSelector(state => state.chat.messages)

  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)



const onSubmit = async (e) => {
  try {
    e.preventDefault()

    if (!user) return toast('Login to send a message')

    if (!selectedChat?._id) {
      return toast.error("Please select or create a chat first");
    }

    setLoading(true)

    const promptCopy = prompt   // ✅ SAVE BEFORE CLEAR
    setPrompt('')

    // ✅ ADD USER MESSAGE TO REDUX
    dispatch(addMessage({
      role: 'user',
      content: promptCopy,
      timestamp: Date.now(),
      isImage: false
    }))

    const { data } = await axios.post(
      serverUrl + `/api/message/${mode}`,
      { chatId: selectedChat._id, prompt: promptCopy, isPublished },
      { withCredentials: true }
    )

    if (data.success) {
      dispatch(addMessage(data.reply))  // ✅ ADD AI RESPONSE
    } else {
      toast.error(data.message)
      setPrompt(promptCopy)
    }

  } catch (error) {
    toast.error(error.message)
  } finally {
    setLoading(false)
  }
}




useEffect(() => {
  if (selectedChat?.messages) {
    dispatch(setMessages(selectedChat.messages))
  } else {
    dispatch(setMessages([]))
  }
}, [selectedChat])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  return (
    
    // <div className='flex-1 flex flex-col h-screen p-5 md:p-10 xl:px-30 max-md:pt-14 2xl:pr-40'>
    // <div className='flex-1 flex flex-col h-screen overflow-hidden p-5 md:p-10 xl:px-30 max-md:pt-14 2xl:pr-40'>
    // <div className='flex-1 h-screen flex flex-col overflow-hidden p-5 md:p-10 xl:px-30 max-md:pt-14 2xl:pr-40'>
    <div className='flex-1 flex flex-col overflow-hidden h-full p-5 md:p-10 xl:px-30 max-md:pt-14 2xl:pr-40'>
      {/* Chat Messages */}
      
      {/* <div ref={containerRef} className='flex-1 overflow-y-auto mb-4'> */}
      <div ref={containerRef} className='flex-1 overflow-y-auto pr-2 min-h-0'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            {/* <img src={assets.logo_full_dark} alt="" className='w-full max-w-56 sm:max-w-68'/> */}
            <img src={logo} alt="" className='w-full max-w-50 sm:max-w-18'/>
            <p className='mt-1 text-4xl sm:text-6xl text-center text-black font-semibold'>
              Ask me anything.
            </p>
          </div>
        )}


        {messages
  ?.filter(msg => msg && msg.content !== undefined)
  .map((message, index) => (
    <Message key={index} message={message} />
))}

        {loading && (
          <div className='loader flex items-center gap-1.5'>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
            <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          </div>
        )}
      </div>

      {mode === 'image' && (
        <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
          <p className='text-xs'>Publish Generated Image to Community</p>
          <input
            type="checkbox"
            className='cursor-pointer'
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </label>
      )}

      {/* <div className="sticky bottom-0 bg-white dark:bg-[#000] py-3"> */}
      {/* <div className="bg-white dark:bg-black pt-3"> */}
      <div className="shrink-0 bg-white pt-3">
      {/* Prompt Input Box */}
      {/* <form
        onSubmit={onSubmit}
        className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'
      > */}
      <form
        onSubmit={onSubmit}
        className='bg-black text-white border border-white rounded-full w-full h-17 max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className='text-sm pl-3 pr-2 outline-none'
        >
          <option className='bg-black text-white' value="text">Text</option>
          <option className='bg-black text-white' value="image">Image</option>
        </select>

        <input
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          type="text"
          placeholder='Type your Prompt here...'
          className='flex-1 w-full text-sm outline-none'
          required
        />

        <button disabled={loading}>
          {/* <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className='w-8 cursor-pointer'
            alt=""
          /> */}
          {/* <img src={loading ? assets.stop_icon : assets.send_icon} className='w-12 cursor-pointer' alt=""/> */}
          {loading ? <FaCircleStop className='w-8 h-8 cursor-pointer'/> : <FaCircleArrowUp className='w-8 h-8 cursor-pointer'/>}
          
        </button>
      </form>
      </div>
    </div>
  )
}

export default ChatBox