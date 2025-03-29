import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";



export async function POST(req: NextRequest){
    try {

       const {email, otp} = await req.json();

       // check if user exists
       const existingUser = await prisma.users.findUnique({where: {email}});

       if(!existingUser){
            return NextResponse.json({
                success: false,
                message: "User Not Found"
            },
            {status: 404}
        )
        }

      
       // otp verified 
        if(existingUser.otpCode !== otp){
                return NextResponse.json({
                    success: false,
                    message: "Invalid OTP"
                },
                {status: 400}
            )
        }

       // check if otp is expired...
       const currentTime = new Date();

       if (existingUser.expiryDate && existingUser.expiryDate < currentTime){
        return NextResponse.json({
            success: false,
            message: "OTP has expired. Please request a new one."
        },
        {status: 404})
       }

      const updated = await prisma.users.update({
           where: {email},
           data: {isVerified: true, otpCode: undefined , expiryDate: undefined}
       })

       console.log(updated);
       


       return NextResponse.json({
            success: true,
            Message: "Email Verified Successfully"
        },
        {status: 200}
        
        )


    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({
            success: false,
            message: "Error verifying OTP"
        },
        {status: 500}
    )    
    }

}