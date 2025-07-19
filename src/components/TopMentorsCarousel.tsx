'use client'

import Image from "next/image"

const mentors = [
    {
        name:'Rahul Kumar',
        company:'Google',
        bio: 'Frontend Engineer | React & Design System',
        image: '/Mentors/rahul.jpg'
    },
    {
        name:'Piyush Rathore',
        company:'Nust University',
        bio: 'Electrical Engineer',
        image: '/Mentors/piyush.jpg'
    },
    {
        name:'Ragni Mehta ',
        company:'IIT Bombay',
        bio: 'Architec Engineer ',
        image: '/Mentors/ragni.jpg'
    },
    {
        name:'Fatima ',
        company:'Turning',
        bio: 'FullStack Developer',
        image: '/Mentors/fatima.jpg'
    }
]


export default function TopMentorsCarousel() {
  return (
    <section className=" py-20 bg-white">
       <div className="max-w-7xl mx-auto ">
         <h2 className="text-3xl md:text-5xl font-bold text-gray-800 text-center mb-4">
            Our Top Mentors
         </h2>
         <p className="  text-gray-500 text-center px-4">
            These mentors are ranked based on the highest student review and performance.
         </p>

         <div className="overflow-hidden py-16 ">
            <div className=" flex animate-scroll gap-8 whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer ">
                {[...mentors, ...mentors].map((mentor, idx) => (
                     <div
                     key={idx}
                     className="relative w-64 h-80 rounded-xl overflow-hidden shrink-0 group border border-gray-700  shadow-accent-foreground shadow-2xl"
                     >
                        <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 "
                        />

                        <div className="absolute bottom-0 w-full bg-black opacity-60 text-white p-4">
                            <h3 className="text-lg font-semibold text-white ">
                              {mentor.name}
                            </h3>
                            <p className=" text-sm text-red-500 font-semibold">
                               {mentor.company}
                            </p>
                            <p className="text-xs mt-1 text-gray-100">
                               {mentor.bio}
                            </p>
                        </div>

                     </div>
                ))}
            </div>

         </div>
       </div>
    </section>
    
  )
}

