import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { UploadOnCloudinary } from "@/helper/cloudinary";
import { MentorFormSchema } from "@/validators/mentor-zod";
import { SaveFilesLocally } from "@/utils/saveFileLocally";
import fs from "fs"

 

function formDataToObject(formData: FormData): Record<string, any> {
    const data: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
      if (key in data) {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      } else {
        data[key] = value;
      }
    }
    return data;
  }
  

const UPLOAD_DIR = path.join(process.cwd(), './uploads')


export async function POST(req: NextRequest) {

     try {

        const formData = await req.formData()
        const data = formDataToObject(formData)
        const result = MentorFormSchema.safeParse(data)
        
        if(!result.success){
          return NextResponse.json({
                error: result.error
           })
        }


        const { email }  = data
        const userExists = await prisma.user.findUnique({ where: {email}})
        
        if(!userExists){
              return NextResponse.json({
                message: "user not found with this email please try again with your login email! "
              },
              {status: 404}
            )
        }

        const formExists = await prisma.mentor.findFirst({where: {email}}) 
        if(formExists ){
           return NextResponse.json({
               message: "form already sibmitted with given email"
           },
           {status: 409}
          )
        }
      
        
        const files = []
        const idCard = formData.get("idcardUrl") as File;
        const profileCard = formData.get("profileUrl") as File
        profileCard && files.push(profileCard)
        idCard && files.push(idCard)

        // console.log(`Idcard: ${idCard} and profileCard: ${profileCard}`);
        
       
        const imageUrls: string[] = [];

        if(files.length > 0) {
          for(const file of files) {
           
          const {filePath} = await SaveFilesLocally(file)
          if(!filePath) return console.log("file path is required");
          
          // console.log("filePath", filePath);
          
          const cloudinaryUrl =  await UploadOnCloudinary(filePath)

          if(!cloudinaryUrl) {
           fs.unlinkSync(filePath)
           return console.log("image not upload on cloudinary")
          }

          imageUrls.push(cloudinaryUrl)

          }
        }


        //  console.log("Image urls", imageUrls);
         
          const res = await prisma.mentor.create({
              data: {
                  userId: userExists?.id,
                  name: result.data.name,
                  email: result.data.email,
                  bio: result.data.bio,
                  phonenumber: result.data.phonenumber,
                  company: result.data.company,
                  country: result.data.country,
                  graduationYear: result.data.graduationYear,
                  profileUrl: imageUrls[0] || '',
                  idcardUrl: imageUrls[1] || '',
                  guidefor: result.data.guidefor,
                  schoolName: result.data.schoolName,
                  readyForMentorship: "NO",
                  skills: result.data.skills,
                  linkedInUrl: result.data.linkedInUrl,
                  xUrl: result.data.xUrl,
              }
        })


       if(!res) return console.log("Mentor is not created");

       await prisma.user.update({
          where: {email},
          data: {role: "MENTOR"}
        })

        return NextResponse.json({
          success: true,
          message: "Form Submitted Successfully",
          Data: res,     
          },
        { status: 201 }
        )
        

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