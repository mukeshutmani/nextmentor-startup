'use client'
import React, { useEffect, useState } from 'react'


export const Timer = (duration: number ) => {

  const [time, setTime] = useState(0) 

  useEffect(() => {
      if(time >= duration) return ;

    const interval = setInterval(() => {
        setTime((prev) => {
            if(prev >= duration){
                clearInterval(interval);
                return prev;
            }
            return prev + 1;
        } )
    },1000)

  },[duration])
  

  return (
    <div>
        {time}
    </div>
  )
}
