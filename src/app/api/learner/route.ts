import { UploadOnCloudinary } from "@/helper/cloudinary";
import { prisma } from "@/lib/prisma";
import { SaveFilesLocally } from "@/utils/saveFileLocally";
import { LearnerSchema } from "@/validators/learner-zod";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from 'fs'

function formDataToObject(formData: FormData): Record < string, any > {
       const data: Record<string, any> = {}
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
      return data
}


export async function POST(req: NextRequest) {

    try {
       
       const formData = await req.formData()
       const data =  formDataToObject(formData)
       const result = LearnerSchema.safeParse(data)
       
       if(!result.success){
         return NextResponse.json({
               error: result.error
          })
       }

      const {email} = data
      const userExists = await prisma.user.findUnique({where: {email}})

      if(!userExists){
        return NextResponse.json({
            message: "user not found with this email please try again with your login email! "
          })
      }


      // file handling 

      const files = []
      const profile = formData.get("profileUrl") as File
      const schoolCard = formData.get("schoolCardUrl") as File
      
      profile && files.push(profile)
      schoolCard && files.push(schoolCard)
      
      const imageUrls: string [] = []

      if(files.length > 0){
         for(let file of files){

            const { filePath } = await SaveFilesLocally(file)
            if(!filePath) return console.log("file path is required");
            
            const cloudinaryUrl = await UploadOnCloudinary(filePath)

            if(!cloudinaryUrl) {
               fs.unlinkSync(filePath)
               return console.log("image not upload on cloudinary")
            }

            imageUrls.push(cloudinaryUrl)
            
         }
      }


    const learnerData = await prisma.learner.create({
        data: {
           userId: userExists?.id,
           name: result.data.name,
           email: result.data.email,
           phonenumber: result.data.phonenumber,
           country: result.data.country,
           schoolName: result.data.schoolName,
           educationLevel: result.data.educationLevel,
           mentorshipType: result.data.mentorshipType,
           bio: result.data.bio,
           profileUrl: imageUrls[0] || '',
           schoolCardUrl: imageUrls[1] || '',
        }
      })

      if(!learnerData) return console.log("Learner is not created");
      
    return NextResponse.json({
          success: true,
          message: "Form sumitted successfully",
          data: learnerData,
        },
        {status: 201}
    )


    
    } catch (error: any) {
        console.log("Learner route error",error);
        NextResponse.json({
            success: false,
            message: "smething went wrong in learner route" 
         },
         {status: 500}
        )
    }
}
