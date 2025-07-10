'use client'
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { useState } from "react"
import {X, Menu} from "lucide-react"



export default function Header() {

    const [isOpen , setIsOpen] = useState(false);
    const {data: session } = useSession();
    
    console.log("data", session);
    
   const navLinks = session?.user ? [
       {
        name: "Book a Call", 
        href: "/"
       },

       {
        name: "Mentors",
        href: "/mentors"
       },

       {
        name: "Profile",
        href: `/${session?.user?.username}`
       }
   ] : [
      {
        name: "Mentors",
        href: "/mentors"
      },

      {
        name: "Login",
        href: "/signin"
      },

      {
        name:"Sign Up",
        href: "/signup"
      }
   ]
 

  return (
    <header className=" bg-gray-900 shadow-md sticky top-0 z-50 w-full ">
           <div className=" max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href='/' className="flex items-center space-x-2">
                    {/* <Image 
                    src="/next.svg"
                    alt="Logo"
                    width={120} height={60}
                    /> */}
                    <h1 className="text-white text-xl">NEXT→MENTOR</h1>
                </Link>

                <nav className=" hidden md:flex items-center space-x-6   ">
                  {navLinks.map((link) => (
                    <Link
                    key={link.name}
                    href={link.href}
                    className="text-white hover:text-gray-300 transition border rounded-sm px-2 py-1 border-gray-700"
                    >
                    {link.name}
                    </Link>
                  ))}

                  {session?.user && (
                    <button
                    onClick={() => signOut()}
                    className="ml-4 mr-4 px-3 py-1 bg-red-600 text-white font-semibold rounded
                     hover:bg-red-700 cursor-pointer"

                    > Logout </button>
                  )}
                </nav>
                   
                <button onClick={ () => setIsOpen(!isOpen)}
                 className="md:hidden text-gray-700" 
                >
                  { isOpen ? <X size={24}/>  : <Menu size={24}/> }
                </button>
           </div>

           {isOpen && (
            <nav className="md:hidden bg-white-400 border-t px-4 py-3 space-y-2 text-center">
                  {navLinks.map((link) => (
                      <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-gray-700 hover:text-blue-600"
                      >
                        {link.name}
                      </Link>
                  ))}
               {session?.user && (
                <button onClick={() => {setIsOpen(false); signOut() }} 
                className="w-full  text-red-600 font-medium mt-2"
                >
                    Logout
                </button>
               )}
            </nav>
           )}
    </header>
  )
}



