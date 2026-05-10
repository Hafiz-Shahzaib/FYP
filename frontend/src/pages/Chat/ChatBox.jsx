import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
// import { useAppContext } from '../context/appContext'
import { assets } from './../../assets/assets';
import Message from './Message'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux';
import { serverUrl } from '../../App';
import { addMessage, setMessages } from '../../redux/chatSlice'

function ChatBox() {

  const containerRef = useRef(null)

  // const { selectedChat, user } = useAppContext()
  // const { selectedChat } = useAppContext()
  const dispatch = useDispatch();

  const user = useSelector(state => state.user.userData)
  const selectedChat = useSelector(state => state.chat.selectedChat)
const messages = useSelector(state => state.chat.messages)

  // const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const [prompt, setPrompt] = useState('')
  const [mode, setMode] = useState('text')
  const [isPublished, setIsPublished] = useState(false)

//   const onSubmit = async (e) => {
//     try {
//       e.preventDefault()

//       if (!user) return toast('Login to send a message')

//         console.log("TOKEN:", token)
//         if (!selectedChat?._id) {
//   return toast.error("Please select or create a chat first");
// }

//       setLoading(true)
//       const promptCopy = prompt
//       setPrompt('')

//       setMessages(prev => [
//         ...prev,
//         { role: 'user', content: prompt, timestamp: Date.now(), isImage: false }
//       ])

//       const { data } = await axios.post( serverUrl +
//         `/api/message/${mode}`,
//         { chatId: selectedChat._id, prompt, isPublished },
//         { withCredentials: true }
//       )

//       if (data.success) {
//         setMessages(prev => [...prev, data.reply])
//       } else {
//         toast.error(data.message)
//         setPrompt(promptCopy)
//       }

//     } catch (error) {
//       toast.error(error.message)
//     } finally {
//       setPrompt('')
//       setLoading(false)
//     }
//   }

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


//   useEffect(() => {
//   if (selectedChat?.messages) {
//     setMessages(selectedChat.messages)
//   } else {
//     setMessages([])   // 🔥 prevents crash on first load
//   }
// }, [selectedChat])

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
    // <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
    // <div className='flex-1 flex flex-col h-full overflow-hidden m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40'>
    <div className='flex-1 flex flex-col h-screen p-5 md:p-10 xl:px-30 max-md:pt-14 2xl:pr-40'>

      {/* Chat Messages */}
      {/* <div ref={containerRef} className='flex-1 mb-5 overflow-y-scroll'> */}
      {/* <div ref={containerRef} className='flex-1 mb-5 overflow-y-auto'> */}
      <div ref={containerRef} className='flex-1 overflow-y-auto mb-4'>
        {messages.length === 0 && (
          <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <img
              src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
              alt=""
              className='w-full max-w-56 sm:max-w-68'
            />
            <p className='mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white'>
              Ask me anything.
            </p>
          </div>
        )}

        {/* {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))} */}

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

      <div className="sticky bottom-0 bg-white dark:bg-[#000] py-3">

      {/* Prompt Input Box */}
      <form
        onSubmit={onSubmit}
        className='bg-primary/20 dark:bg-[#583C79]/30 border border-primary dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center'
      >
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className='text-sm pl-3 pr-2 outline-none'
        >
          <option className='dark:bg-purple-900' value="text">Text</option>
          <option className='dark:bg-purple-900' value="image">Image</option>
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
          <img
            src={loading ? assets.stop_icon : assets.send_icon}
            className='w-8 cursor-pointer'
            alt=""
          />
        </button>
      </form>
      </div>
    </div>
  )
}

export default ChatBox