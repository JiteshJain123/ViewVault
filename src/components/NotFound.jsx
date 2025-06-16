import React from 'react'
import notfound from "/404.gif"
function Notfound() {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
          <img className='h-[50%] object-cover' src={notfound} alt="" />
    </div>
  )
}

export default Notfound
