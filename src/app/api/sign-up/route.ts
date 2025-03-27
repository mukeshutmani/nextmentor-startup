import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/validators/signup-zod";
import { SendMailer } from "@/helper/sendMailer";


export async function POST(req: NextRequest){

    try {

        const body = await req.json();
        // zod validation
        console.log(body);
        
        const result = signUpSchema.safeParse(body)
        if(!result.success){
           return NextResponse.json({
              success: false,
              message: "Invalid Input Message",
              errors: result?.error.format()
            },
            {
                status: 409
            }
        )
        }

        const { email, username, password } = result.data;

        const existingUser = await prisma.users.findUnique({ where: {email}});
         
        // check if email exists
        if(existingUser){
            return NextResponse.json(
                {
                    success: false,
                    message: "Email already exists",
                },
                {status: 409}
            )
        }

        // hash password 
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const digitCode = Math.floor((Math.random()*9000)+1000);
       
        const newUser = await prisma.users.create({
            data: {
                email, 
                username,
                password: hashedPassword,
                isVerified: false,
                otpCode: digitCode,
                expiryDate: new Date(Date.now() + 3600000)
            },
        })
        
         await SendMailer({
            email: email,
            username: username,
            otpCode: digitCode,
        })


       
        return NextResponse.json(
            {
              success: true,
              message: " Please verify your email by OTP",
              user: newUser
            }, 
            {status: 201}
        )


    } catch (error: any) {
        console.error("❌ Signup error:", error);
        return NextResponse.json(
          { success: false, message: "Internal Server Error" },
          { status: 500 }
        );
      
    }

}


