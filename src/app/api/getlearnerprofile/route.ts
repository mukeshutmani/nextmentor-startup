import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET() {
    
  try {

        const session = await getServerSession(authOptions)

        if(!session) {
        return NextResponse.json({
            message: "Unauthorized request"
        },
        {status: 401} )}

        const email = session.user?.email
        if(!email) return NextResponse.json({message: "email not found"})

       const learner = await prisma.learner.findUnique({
        where: {email},
        select: {
            name: true,
            bio: true,
            mentorshipType: true,
            country: true
        }
        })

        if(!learner){
            return NextResponse.json({
                message: "Learner not found"
            },
            {status: 404} )
        }

        return NextResponse.json({
             data: learner
        })

    
    } catch (error: any) {
        console.log("Failed to fetch learner profile");
        NextResponse.json({
          success: false,
          message: "Failed to fetch learner profile"
        },
        {status: 500}
      )
    }

}