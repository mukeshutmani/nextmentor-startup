import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

     try {

         const {name, email,  phonenumber, bio, country, schoolName, graduationYear, company, guidefor, readyForMentorship, skills, linkedInUrl, xUrl} = await req.json();
         

         

        

     } catch (error: any) {
         console.log("Mentor Route Error",error.message);
        return NextResponse.json({
            success: false,
            message: "Something went wrong in mentor route"
        },
        {status: 500}
     )
     }
}