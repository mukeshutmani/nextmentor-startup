'use client'
import Image from 'next/image'
import React from 'react'

export default function WhyChoseSection ()  {

    const cards = [
        {
            title: "1-on-1 Mentorship",
            description: "Get personalized guidance directly from industry experts for your carreer and skills",
            image: "/whychosecards/mentorship.png"
        },
        {
            title: "Carrer Roadmaps",
            description: "We help you create a clear, actionable path toward your dream university or goal",
            image: "/whychosecards/careermap.png" 
        },
        {
            title: "University Support",
            description: "Partnered with top universities for workshops, sessions, and real-world exposure",
            image: "/whychosecards/support.png"
        }

    ]

  return (
     <section className='py-20 bg-white'>
        <div className='max-w-7xl mx-auto px-6
         text-center'>
             <h2 className='text-4xl font-bold mb-4 text-orange-600'>
                Why Choose NextMentor?
             </h2>
             <p className='text-gray-800 mb-12 max-w-2xl mx-auto'>
                Discover the unique advantages of using NextMentor to grow your carrer and get expert support.
             </p>

             <div className='grid grid-cols-1 md:grid-cols-3 gap-8 '>
                { cards.map((card, idx) => (
                    <div 
                    key={idx}
                    className='bg-slate-800 shadow-slate-900 shadow-xl duration-300 rounded-xl p-6 text-left group border border-gray-700'
                    > 
                      <div className='w-full h-60 relative mb-4 rounded-xl overflow-hidden'>
                        <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className='  object-cover border-2 rounded-xl border-orange-500 group-hover:scale-105  transition-transform duration-300 '
                        />
                      </div>

                      <h3 className='text-xl font-semibold text-white'>
                         {card.title}
                      </h3>

                      <p className='text-gray-300'>
                        {card.description}
                      </p>
                    
                    </div>
                ))}
             </div>
        </div>
     </section>
  )
}


