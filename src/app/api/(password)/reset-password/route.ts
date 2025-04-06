import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";







export async function POST(req: NextRequest) {

    try {
        
        const {email, token, newPassword}  =  await req.json();

        if(!email && !token){
            return NextResponse.json({
                success: false,
                message: "Unauthorized access. Token and email is required"
            },
            {status: 401})
        }

        if(!newPassword){
            return NextResponse.json({
                success: false,
                message: " reset password is required! "
            },
            {status: 400})
        }

        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            return NextResponse.json({
                success: false,
                message: "User not found"
            },
            {status: 404})
        }

        // check token is valid 
        const resetToken = await prisma.passwordResetToken
        .findFirst({where: {token}})
       
        if(!resetToken){
            return NextResponse.json({
                success: false,
                message: "Unauthorized request: Invalid Token"
            },
            {status: 401})
        } 

        // check token is expired or not
        const currentTime = new Date();

        if(currentTime > resetToken.expiresAt){
            return NextResponse.json({
                success: false,
                message: "This link has expired ☹ request a new one to continue."
            },
            {status: 401})
        }

        const hasedPassword = await bcrypt.hash(newPassword, 10) 


        const updatedUser = await prisma.user.update({
            where: {email},
            data: { password: hasedPassword}
        });

        await prisma.passwordResetToken.delete({ where: {token}})

        
        return NextResponse.json({
            success: true,
            message:"password updated successfully 😊",
            data: updatedUser
        }, 
        {  status: 201 })

         
    } catch (error: any) {

        console.log("Server Error while reset new password", error);
        return NextResponse.json({
            sucess: false,
            message: `Server Error while reset new password ${error.message}`, 
        },
        {status: 500}
    )
         
    }
}