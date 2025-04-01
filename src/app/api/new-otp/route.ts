import { SendMailer } from "@/helper/sendMailer";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Input: Email is required",
        },
        { status: 400 }
      );
    }

    const emailExist = await prisma.user.findUnique({ where: { email } });

    if (!emailExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Email Doesn't Exist",
        },
        { status: 404 }
      );
    }
    
   // already verified dont need otp
   if(emailExist.isVerified === true){
    return NextResponse.json(
      {
        success: false,
        message: "User Already Verified",
      },
      { status: 400 }
    );
   }

    // if OTP expired you can request after five minutes of expiry 
    const newDate: any = new Date()
    const lastOtpSentAt: any = emailExist.expiryDate;
    if (lastOtpSentAt && (newDate - lastOtpSentAt.getTime() < 300000)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please wait 5 minute before requesting a new OTP",
        },
        { status: 429 }
      );
    }
  

    
    const digitCode = Math.floor(Math.random() * 9000 + 1000);
    const expDate = new Date(Date.now() + 3600000);

    const userUpdated = await prisma.$transaction(async (prisma) => {
      const userUpdatedWithNewOTP = await prisma.user.update({
        where: { email },
        data: { otpCode: digitCode, expiryDate: expDate },
      });

      const emailRes = await SendMailer({
        email,
        username: emailExist.username,
        otpCode: digitCode,
      });

      if (!emailRes) {
        throw new Error("Email failed to send");
      }

      return userUpdatedWithNewOTP;
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP has been sent to your Email Address",
        updatedUser: userUpdated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Something went wrong while sending new OTP:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Something went wrong while sending new OTP",
      },
      { status: 500 }
    );
  }
}
