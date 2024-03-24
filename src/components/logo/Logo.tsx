import React from 'react'
import logoImage from '@/img/name111.png' 

export default function Logo() {


  return (
    <div className='flex justify-center items-center'>
        <img 
        src={logoImage}
        alt="Logo"
        className="h-[140px] max-w-[100%] bg-red-600 m-4 rounded-md p-4" />
    </div>
  )
}
