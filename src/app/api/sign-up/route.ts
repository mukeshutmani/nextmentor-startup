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

        const existingUser = await prisma.user.findUnique({ where: {email}});
         
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


        
        const createdUser = await prisma.$transaction( async (prisma) => {
        
            // create user in db
         try {
               const newUser = await prisma.user.create({
                   data: {
                       email, 
                       username,
                       password: hashedPassword,
                       isVerified: false,
                       otpCode: digitCode,
                       expiryDate: new Date(Date.now() + 120000)
                   },
               });
                
               const emailRes = await SendMailer({
                   email: email,
                   username: username,
                   otpCode: digitCode,
               });
           
               if (!emailRes) {
                   throw new Error("Email failed to send"); 
               }
   
               return newUser;

         } catch (error:any) {
             console.log("Transactions Error",error.message);
             
         }
        })
       

        
        return NextResponse.json(
            {
              success: true,
              message: "Account created successfully. Please verify your email using the OTP sent to your email address.",
              user: createdUser,
            }, 
            {status: 201}
        )


    } catch (error: any) {
        console.error("❌ Signup error:", error);
        return NextResponse.json(
          { success: false, message: "Registration Failed: Internal Server Error" },
          { status: 500 }
        );
      
    }

}


