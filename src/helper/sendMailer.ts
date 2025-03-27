import nodemailer from "nodemailer"

export const SendMailer = async({
    email,
    username,
    otpCode,
}: any) => {
     try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "a991895ee5955b",
              pass: "96782a21bcbd76"
            }
          });
          
          const mailOptions = {
              from: "mukeshkgm786@gmail.com",
              to: email,
              subject: " Your OTP Code ",
              text: `Your OTP is ${otpCode}`,
              html: `<p> ${username} your OTP is: <strong> ${otpCode} </strong> </p>`
          }

         const mailRes = await transporter.sendMail(mailOptions);

         return mailRes
         

     } catch (error) {
          console.log("Error Sending OTP");
     }
}