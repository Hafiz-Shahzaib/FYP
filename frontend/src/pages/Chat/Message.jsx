import React, { useEffect } from 'react'
import { assets } from './../../assets/assets';
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import { FaUserCircle } from "react-icons/fa";

function Message({ message }) {

  if (!message) return null;

  useEffect(() => {
    if (message?.content) {
      Prism.highlightAll();
    }
  }, [message?.content]);

  return (
    <div className='w-full'>

      {message.role === "user" ? (

        /* USER MESSAGE */
        <div className='flex justify-end my-4 gap-3 w-full'>

          {/* <div className='flex flex-col gap-2 p-3 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-2xl w-fit max-w-[85%] md:max-w-2xl'> */}
          <div className='flex flex-col gap-2 p-3 px-4 bg-gray-800 border-white rounded-2xl w-fit max-w-[85%] md:max-w-2xl'>

            {/* <p className='text-sm break-words dark:text-primary'> */}
            <p className='text-sm break-words text-white'>
              {message?.content}
            </p>

            {/* <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'> */}
            <span className='text-xs text-white'>
              {moment(message.timestamp).fromNow()}
            </span>

          </div>

          {/* <img src={assets.user_icon} alt="" className='w-8 h-8 rounded-full object-cover'/> */}
          <FaUserCircle className='w-8 h-8 rounded-full object-cover'/>

        </div>

      ) : (

        /* AI MESSAGE */
        <div className='flex justify-start my-4 w-full'>

          {/* <div className='flex flex-col gap-2 p-3 px-4 bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-2xl w-fit max-w-[90%] md:max-w-3xl'> */}
          <div className='flex flex-col gap-2 p-3 px-4 bg-black border border-red-600 rounded-2xl w-fit max-w-[90%] md:max-w-3xl'>

            {message.isImage ? (

              <img
                src={message.content}
                alt=""
                className='w-full max-w-md rounded-xl'
              />

            ) : (

              // <div className='text-sm break-words dark:text-primary reset-tw overflow-hidden'>
              <div className='text-sm break-words text-white reset-tw overflow-hidden'>
                <Markdown>
                  {message.content}
                </Markdown>
              </div>

            )}

            <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>
              {moment(message.timestamp).fromNow()}
            </span>

          </div>

        </div>

      )}

    </div>
  )
}

export default Message