'use client'
import { Compass, MessagesSquare, Phone, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function MentorConnectSection() {
  return (
    <section className="py-20 bg-gray-900 text-white">
       <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
           <div>
            <h2 className="text-3xl  font-bold mb-10 text-center md:text-start">
                Connect With Mentors, Your Way
            </h2>
            <p className="text-gray-300 mb-6">
                Weather it's through seamless video calls, direct chat, or guided plans - NextMentor helps you build meaningful mentor relationships.
            </p>

            <ul className="space-y-5 text-gray-200 ">
                <li className="flex items-start gap-3">
                     <Video className="text-red-500 w-6 h-6 mt-1" />
                  <span>
                    <strong> 1-on-1 Video Calls </strong>
                     for live interaction and real time problem solving
                  </span>
                </li>

                <li className="flex items-start gap-3">
                    <MessagesSquare  className="text-red-500 w-6 h-6 mt-1"/>
                    <span>
                        <strong> Instant Messaging </strong> 
                        for follow-ups, document sharing and continus support.
                    </span>
                </li>

                <li className="flex items-start gap-3">
                    <Compass  className=" text-red-500 w-6 h-6 mt-1" />
                    <span>
                        <strong> Ongoing Guidance </strong> 
                        to help you reach goals with clearity and direction
                    </span>
                </li>
            </ul>
            
            <div className="mt-8 flex ">
  <Link
    href="/home"
    className="flex gap-5 w-full sm:w-3/4 md:w-1/2 bg-red-600 hover:bg-red-700 transition duration-500 px-6 py-3 rounded-full font-semibold"
  >
    <Phone className="w-6 h-6 mt-1" />
    <span className="text-xl">Book Your First Call</span>
  </Link>
</div>

           </div>
           
        <div className="relative w-full h-80 md:h-full ">
               <Image
                src='/livevideo.jpg'
                alt="Mentor Video Call Illustration"
                width={600}
                height={400}
                className=" rounded-2xl object-contain hover:scale-105 transition duration-1000"
               />
        </div>

       </div>
       
       
    </section>
  )
}

