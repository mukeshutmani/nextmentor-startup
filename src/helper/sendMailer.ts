import nodemailer from "nodemailer"

export const SendMailer = async({
    email,
    username,
    otpCode,
}: any) => {
     try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),  
            secure: false,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
            tls: {
              rejectUnauthorized: true,
            }
          });
          
          const mailOptions = {
              from: process.env.SMTP_FROM,
              to: email,
              subject: " Your OTP Code ",
              text: `Your OTP is ${otpCode}`,
              html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
                    <h2 style="color: #333;">Hello, ${username} 👋</h2>
                    <p>Your One-Time Password (OTP) is:</p>
                    <div style="font-size: 24px; font-weight: bold; background: #f4f4f4; padding: 10px; display: inline-block;">
                        ${otpCode}
                         
                    </div>
                    <p>This OTP is valid for 1 Hour. Do not share it with anyone.</p>
                    <hr/>
                    <small>If you did not request this OTP, please ignore this email.</small>
                </div>
              `
          }

         const mailRes = await transporter.sendMail(mailOptions);

         return mailRes
         

     } catch (error) {
          console.log("Error Sending OTP");
     }
}