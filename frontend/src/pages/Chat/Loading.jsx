import React, { useEffect } from 'react'
import { useState } from 'react';
// import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
// import { useAppContext } from '../context/AppContext'

// const Loading = () => {
  function Loading() {

  const navigate = useNavigate()
  // const {fetchUser} = useAppContext()
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data', {headers: {Authorization: token}})
            if(data.success){
                setUser(data.user)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoadingUser(false)
        }
    }

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      fetchUser()
      navigate('/')
    },8000)
    return()=> clearTimeout(timeout)
  },[])

  return (
    <div className='bg-gradient-to-b from-[#531B81] top-[#29184B] backdrop-opacity-60 flex items-center justify-center h-screen w-screen text-white text-2xl'>
      <div className='w-10 h-10 rounded-full border-3 border-white border-t-transparent animate-spin'></div>
    </div>
  )
}

export default Loading
