'use client'
import { signIn } from "next-auth/react";
// import React from 'react'

const page = () => {

    const onSubmit = async () => {

       const result =  await  signIn('credentials',
         {
            redirect: false,
            email: "aneelmeghwar666@gmail.com",
            password:"123478"
         }
        )
        console.log("Success",result);

        if(result?.error){
           console.log("login Failed");
        }
        
    }
    


  return (
    <div>
        <button 
        onClick={onSubmit}
        className='bg-blue-500 px-4 py-2 rounded-xl m-4 cursor-pointer '>
            Sign In
        </button>
    </div>
  )
}


export default page