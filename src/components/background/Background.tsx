import React from 'react'
import backgroundImage from "@/img/Background111.jpg";

export default function Background() {

  return (
    <div>
        <div className="fixed top-0 left-0 w-full h-full z-0">
      <img
        src={backgroundImage}
        alt="Background"
        className="object-cover w-full h-full"
      />
    </div>
    </div>
  )
}
