'use client'
import { signIn, signOut } from "next-auth/react";
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

    const googleHanlde = async () => {
      try {
        const res = await signIn("google",{callbackUrl: "/dashboard", redirect: true})

        console.log(res);
        
      } catch (error: any) {
        console.log(error.message);
      } 
    }


    const githubHanlde = async () => {
      try {
        const res = await signIn("github", {callbackUrl: "/dashboard", redirect: true})

        console.log("response ",res);
        
      } catch (error: any) {
        console.log(error.message);
      } 
    }


    const signoutHandle = async () => {
           try {
              const signout =  await signOut({ callbackUrl: "http://localhost:3000/dashboard" })
              console.log("signout succesfully", signout);
              
           } catch (error: any) {
               console.log(error.message);

           }
    }
    


  return (
    <div>
        <button 
        onClick={onSubmit}
        className='bg-blue-500 px-4 py-2 rounded-xl m-4 cursor-pointer '>
            Sign In
        </button>

    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      
      {/* Google Login Button */}
      <button
        onClick={googleHanlde}
        className="px-4 py-2 bg-red-500 text-white rounded-lg mb-2 cursor-pointer"
      >
        Sign in with Google
      </button>

      {/* GitHub Login Button */}
      <button
        onClick={githubHanlde}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg  cursor-pointer"
      >
        Sign in with GitHub
      </button>
      <button
        onClick={signoutHandle}
        className=" mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg  cursor-pointer"
      >
        Logout
      </button>
    </div>
    </div>
  )
}


export default page