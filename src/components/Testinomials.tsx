"use client";

import Image from "next/image";

const reviews = [
  {
    name: "MUskan Tewatia",
    image: "/Mentors/fatima.jpg",
    review: "I had a fantastic session with Priya Shukla!She not only explained JavaScript concepts clearly but also gave real-world examples that helped me understand deeply.Her friendly attitude made it super easy to ask even the most basic questions.I feel more confident now to build my own projects. Highly recommended!",
  },
  {
    name: "Ali Raza",
    image: "/Mentors/piyush.jpg",
    review: "Aisha Noor is not just a mentor, she’s a motivator.Her way of breaking down complex Python problems into simple steps is amazing.She reviewed my code and pointed out improvements I never thought of.I’d definitely book more sessions with her in the future.",
  },
  {
    name: "Mehak Tariq",
    image: "/Mentors/rahul.jpg",
    review: "Rahul guided me through Node.js backend APIs and explained every little detail with patience.His one-on-one mentorship saved me hours of frustration.I liked how he gave me small tasks to practice after the session.It was a game-changer for my final-year project.",
  },
  {
    name: "Joti Sharma",
    image: "/Mentors/ragni.jpg",
    review: "The 1-on-1 calls helped me solve real dev problems. Highly recommended!",
  },
  {
    name: "Sana Mir",
    image: "/Mentors/fatima.jpg",
    review: "I improved my portfolio and landed 2 freelance projects through mentor guidance.",
  },
];

export default function TestimonialsWall() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6"> Do not believe us.
Believe them ↷</h2>
        <p className="text-gray-300 mb-10 max-w-xl mx-auto text-sm">
          These reviews are shared by real users who have grown with NextMentor.
        </p>

        {/* Scrollable vertical card container */}
        <div className="scrollbar-custom max-h-[550px] overflow-y-auto snap-y snap-mandatory space-y-4 px-5 py-5 scroll-smooth border-1 border-gray-400 rounded-lg ">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="snap-start bg-gray-700 rounded-xl shadow-md p-6 flex gap-4 "
            >
            
            <div className="w-10 h-10 relative rounded-full overflow-hidden shrink-0">
              <Image
                src={r.image}
                alt={r.name}
                fill
                className="object-cover"
              />
            </div>
        
              <div className="text-left">
                <p className="mt-2  font-semibold text-sm text-gray-50">{r.name}</p>
                <p className=" text-gray-200 ">{r.review}</p>
              </div>
              

              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}