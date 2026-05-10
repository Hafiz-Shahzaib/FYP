import React, { useState } from 'react'
import ChatSidebar from './ChatSidebar';
import { Outlet } from 'react-router-dom';
import Nav from './../../component/Nav';

function Chat() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    

      <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>

        {/* <Nav /> */}
        {/* <div className='flex h-screen w-screen'> */}
        <div className='flex h-screen w-full overflow-hidden'>
          <ChatSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>

          <div className='flex-1'>
              {<Outlet />}
        </div>

        </div> 
      </div>
      
    
  )
}

export default Chat