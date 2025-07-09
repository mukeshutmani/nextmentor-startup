import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'


type Props = {
    params: {username: string};
};


export default async function UserProfile( {params}: Props) {
   
    const user = await prisma.user.findUnique({
        where: {username: params.username}
    })

    if(!user) return notFound();
    
  return (
    <div className='max-w-3xl mx-auto mt-10 p-4'  >
          <h1 className='text-3xl font-bold text-blue-600'>
               @{user.username}
          </h1>
          <p>
            {user.email}
          </p>
    </div>
  )
}


// 




