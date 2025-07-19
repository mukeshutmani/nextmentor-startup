'use client'
import { Cross, Minus, Plus, X } from 'lucide-react'
import { useState } from 'react'


const Faqs = [
    {
        question:"Is there a trial session?",
        answer: "Yes, we provide a free trial session for students. after reviews of student you can get a your desire session."
    },
    {
        question:"What kind of support can I expect from a college counseling mentor?",
        answer: "Our college counseling mentors guide you through every step of the application process—from selecting the right colleges to building your resume and perfecting your essays. They’ve been through it themselves, so they bring firsthand insights and updated information to help you succeed."
    },
    {
        question:"How do your mentors differ from traditional counselors?",
        answer: "Our passion project mentors are experts in their fields, ranging from marketing to web development to starting a startup. They guide students in pursuing personal interests, whether it’s starting a podcast, writing a book, or launching a community initiative."
    },
    {
        question:"Can i become a mentor?",
        answer: "Yes! if you have industry experience and a passion to guide others, you can apply through the 'Become a Mentor' section"
    },
]


export default function FaqAccordion  ()  {

   const [openIndex, setOpenIndex] = useState <number | null> (null)

  const toggleAccordion = (index: number) => {
      setOpenIndex(openIndex === index ? null : index)
  }


  return (
    <section className='py-20 bg-gray-900 text-gray-100 px-4'>
       <div className='max-w-3xl mx-auto '>
         <h2 className=' text-2xl md:text-5xl  font-bold mb-3 text-center'>
           ↻ Burning Questions
         </h2>
         <p className='text-gray-300 mb-10 text-center'>
             Here are the most common questions we get about how NextMentor works.
         </p>

         <div className='space-y-4'>
           {Faqs.map((faq, index) => (
               <div
               key={index}
               className='border border-gray-200 rounded-xl shadow-sm'
               >
                 <button
                 onClick={() => toggleAccordion(index)}
                 className='w-full flex items-center justify-between p-4 font-semibold text-left'
                 >
                   <span> {faq.question} </span>  
                   {openIndex === index ? 
                     ( <X className='w-5 h-5 text-orange-500' /> ) : 
                     ( <Plus className='w-5 h-5 text-gray-200' /> )
                   }
                 </button>

                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${ openIndex === index ? "max-h-40 p-4 pt-0 ": "max-h-0"}`}>

                    <p className='text-gray-300 text-sm '>
                        {faq.answer}
                    </p>

                 </div>
               </div>
           ))}
         </div>
       </div>
    </section>
  )
}

