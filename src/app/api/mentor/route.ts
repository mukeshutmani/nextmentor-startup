import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs'
import path from "path";
import { upload } from "@/lib/multer";
import { UploadOnCloudinary } from "@/helper/cloudinary";
import { MentorFormSchema } from "@/validators/mentor-zod";
const nextConnect = require('next-connect').default; 



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
  
  const uploadDir = './uploads'

  const handler = nextConnect();
  handler.use(upload.array('images'))

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

        const files = formData.getAll("images") as File[];

        const imageUrl: string[] = [];

        for(let file of (req as any).files ) {

            const filepath = path.join(uploadDir, file.filename )

            const uploadResult = await UploadOnCloudinary(filepath)
            if(uploadResult) imageUrl.push(uploadResult)
        }

        
         const { email }  = data
         const user = prisma.user.findUnique({where: {email}})

        



        
        
      

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