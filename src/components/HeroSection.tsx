import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center py-24 px-6 text-white " style={{ backgroundImage:"url('https://images.pexels.com/photos/5011647/pexels-photo-5011647.jpeg')" }}>
        <div className=" absolute inset-0 bg-black opacity-50"> </div>
            <div className="relative max-w-6xl mx-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-lg p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                    Find Your <span className="text-red-500"> Ideal Mentor</span>
                </h1>

               <p className="mt-4 text-lg text-gray-200 max-w-lg mx-auto md:mx-0">
                Unlock Expert Guidance, career growth, and real world insight from experienced mentors around the world
               </p>

               <div className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <Link
                  href='/mentors'
                  className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-full font-semibold"
                  >
                    🔍 Explore Mentors
                  </Link>
                  <Link
                  href='/signup'
                  className="border border-white hover:bg-white hover:text-black transition px-6 py-3 rounded-full font-semibold"
                  >
                   🚀 Get Started
                  </Link>
               </div>
            </div>

            <div className="flex-1">
                <img 
                src="https://images.pexels.com/photos/5877661/pexels-photo-5877661.jpeg" 
                alt="Mentorship"
                className="w-full max-w-md mx-auto md:mx-0 rounded-lg"
                />
            </div>
        </div>
    </section>
  )
}
