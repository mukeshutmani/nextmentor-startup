import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET(req: NextRequest) {

    const session = await getServerSession(authOptions)

    if(!session) {
    return NextResponse.json({
        message: "Unauthorized request"
    },
    {status: 401} )}

    try {
     
    const email = session.user?.email
    if(!email) return NextResponse.json({message: "email not found"})
    
    const mentor = await prisma.mentor.findUnique({
        where: {email},
        select: {
            id: true,
            email: true,
            name: true,
            profileUrl: true,
            bio: true
        }
    })

    if(!mentor){
        return NextResponse.json({
            message: "Mentor Not Found"
        },
        {status: 404} )
    }

 
    return NextResponse.json({
        data: mentor
    })

    
   
    } catch (error) {
      console.log("Failed to fetch mentor profile");
      NextResponse.json({
        success: false,
        message: "Failed to fetch mentor profile"
      },
      {status: 500}
    )
    }
}