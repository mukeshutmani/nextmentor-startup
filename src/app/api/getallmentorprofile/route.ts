import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest) {
       try {

       const session = await getServerSession();

       if(!session?.user) {
        return NextResponse.json(
           { error: "unauthorized" },
           {status: 401}
         )
        }

      const { searchParams } = new URL(req.url);

      const page = Math.max(1, parseInt(searchParams.get("page") || "1"))
      const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")))
      const skip = (page - 1) * limit


      const [mentors, total] = await Promise.all([
         prisma.mentor.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                name: true,
                bio: true,
                country: true,
                graduationYear: true,
                rating: true,
                skills: true,
            }
         }),
         prisma.mentor.count()
      ])
       

        if(!mentors){
            NextResponse.json(
                { message: "No any mentor found" },
                { status: 404 }
            )
        }

        const res = NextResponse.json({
            mentors: mentors,
            page: page,
            total: total
        })
        res.headers.set("Cache-Control", "private, max-age = 60")
        return res
        

       } catch (error: any) {

        console.log("failed to fetch Mentors profiles");
        return NextResponse.json({
            success: false,
            message: "failed to fetch mentors profiles"
        },
        { status:500 })
       }
}











