

const testimonials = [
    {
      image: "https://ph-avatars.imgix.net/1284489/original.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&frame=1&dpr=2",
      fullName: "Tyler Bell",
      username: "Cofounder of MemberStack",
      content:
        "Mukesh is an exceptional developer! His expertise in Node.js, Express, and Mongoose truly impressed me. He writes clean, efficient code and handles databases seamlessly. His problem-solving skills and communication were top-notch.",
    },
    {
      image: "https://ph-avatars.imgix.net/3678901/original.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&frame=1&dpr=2",
      fullName: "Pallavi Jindal",
      username: "SoftwareEngineer @Log2base2",
      content: "Mukesh is a highly skilled React.js developer with deep knowledge of modern frontend technologies like React, Redux, Tailwind CSS, Next.js, and component-based development.",
    },
    {
      image: "https://ph-avatars.imgix.net/5067170/34860eac-6add-4a20-858e-2255e2ca76f6.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&frame=1&dpr=2",
      fullName: "Chirag Lathiya",
      username: "Senior SoftwareEngineer @feedspace",
      content: "I worked with Mukesh He is an outstanding full-stack developer with a deep understanding of backend optimization and modern web technologies. He optimizes databases efficiently, ensures fast API responses, and writes clean, scalable code."},
    {
      image: "https://ph-avatars.imgix.net/7526329/9e788e47-771f-48fb-9fed-cf2f8015387f.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&frame=1&dpr=2",
      fullName: "Vanshika Kalshetti",
      username: "Founder & Leadership @Gemburg",
      content: "Your attention to detail and commitment to writing clean, maintainable code is commendable. The modular structure of your Express.js backend and the reusable components you built in React demonstrate your focus on scalability and best practices."},
    {
      image: "https://ph-avatars.imgix.net/7880945/original.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&frame=1&dpr=2",
      fullName: "Jiya Shukla",
      username: "Software Developer @Depict",
      content: "You consistently deliver robust APIs with clean endpoints, efficient error handling, and scalable architecture, ensuring reliability and ease of use for developers. technical depth and a user-focused approach."
    },
    
  ];
  
  // Duplicate testimonials for smooth infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  
  export default function TopMentors() {
    return (
    <> 
     
      
      <div className="bg-slate-900 text-white py-16">
         <h1 className="text-4xl text-center">
         Here's what My Clients are saying
         </h1>
         <p className="text-center text-xl p-2 pt-6">They think Mukesh is cool, maybe you will too!</p>
      </div>
      <div className="overflow-hidden bg-slate-900 py-10 ">
        <div className="flex gap-6 feedback-animation hover:[animation-play-state:paused]">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-[300px] h-[210px] lg:w-[370px] lg:h-[200px] p-4 cursor-pointer shadow-lg rounded-md bg-gray-900 border border-gray-600 flex flex-col justify-between shrink-0 hover:bg-slate-800 duration-1000 hover:scale-110   "
              
              >
                
              {/* Profile Section */}
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <p className="font-bold text-white">{testimonial.fullName}</p>
                  <p className="text-sm text-gray-400">@{testimonial.username}</p>
                </div>
              </div>
  
              {/* Content Section */}
              <p className="mt-2 text-gray-300 text-sm break-words whitespace-normal text-left overflow-hidden h-32">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
     
      </>
    );
  }
  
  
  
  
  

  