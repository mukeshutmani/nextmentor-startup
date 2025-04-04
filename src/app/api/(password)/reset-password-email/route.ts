import { prisma } from "@/lib/prisma";
import crypto from 'crypto';
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { SendMailer } from "@/helper/sendMailer";


export async function POST(req: NextRequest){

     try {

         const {email} = await req.json();
         console.log(email);
         
         if(!email){
            return NextResponse.json({
                succees: false,
                message: "email is required",
            },
            {status: 400}
         )}

        const userExists = await prisma.user.findUnique({where: {email}});

            if(!userExists){
                return NextResponse.json({
                    succees: false,
                    message: "user not found with given email",
                },
                {status: 404}
            )}

        const account = await prisma.account.findFirst({where: {userId: userExists.id}});
            if(account && account.provider){
                return NextResponse.json({
                    succees: false,
                    error: `You Signed up using ${account.provider}, please login using ${account.provider}, instead you can register your account`,
                },
                {status: 400}
            )}
          

        // check is user verified?
        if(!userExists.isVerified){
            return NextResponse.json({
                succees: false,
                message: "User is not verified. first verfy your email",
            },
            {status: 400}
        )}



        // reset token 
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = (await bcrypt.hash(resetToken, 10)).toString();
        
        const expiryTokenTime = new Date(Date.now() + 15*60*1000);
        
        const tokenEntry = await prisma.passwordResetToken.findFirst({
            where: { userId: userExists.id}
         })

        await prisma.passwordResetToken.upsert({
               where: {id: tokenEntry?.id || "dummy-id"},
               update: {token: hashedToken, expiresAt: expiryTokenTime},
               create: {userId: userExists.id, token: hashedToken, expiresAt: expiryTokenTime}
        })

        const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${hashedToken}&email=${email}`
         
       const emailsent = await SendMailer({email, username: userExists.username, link: resetUrl })   
       
       if(!emailsent){
        return NextResponse.json({
            succees: false,
            message: "something went wrong while sending verification email",
        },
        {status: 400}
       )}

       return NextResponse.json({
        succees: true,
        message: "Password reset email sent successfully",
           },
           {status: 200}
        )

     } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            succees: false,
            message: "password reset error",
               },
               {status: 500}
            )
         
     }
}
