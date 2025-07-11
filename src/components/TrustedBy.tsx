'use client'
import Image from "next/image"

export default function TrustedBy() {

    const logos = [
       "/logos/oxford.png",
       "/logos/nust.png",
       "/logos/princeton.png",
       "/logos/cambridge.png",
       "/logos/amazon.png",
       "/logos/google.png",
       "/logos/iitmadras.png",
       "/logos/nanyang.png"
    ]

  return (
     <section className="py-10 bg-gray-100">
        <div className="max-w-7xl mx-auto text-center mb-10">
           <h2 className="text-3xl font-bold text-gray-800">
              Students Of Top Universities & Companies 
           </h2>
           {/* <p className=" text-gray-500 mt-2">
            Across the world & especially in Pakistan
           </p> */}
        </div>

        <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap gap-16">
               {[...logos, ...logos].map((logo, idx) => (
                   <Image
                   key={idx}
                   src={logo}
                   alt={`University logo ${idx}`}

                   width={120}
                   height={64}
                   className="h-16 w-auto object-contain"
                   />
               ))}
            </div>

        </div>
     </section>
  )
}

