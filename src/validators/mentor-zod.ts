import { z }from 'zod'




export const MentorFormSchema = z.object({
    
    name: z.string(),
    email: z.string().email(),
    phonenumber: z.string(),
    bio: z.string(),
    country: z.string(),
    schoolName: z.string(),
    graduationYear: z.coerce.number(),
    company: z.string(),
    guidefor: z.string(),
    readyForMentorship: z.enum(["YES", "NO"]),
    skills: z.string().optional(),
    linkedInUrl: z.string().url().optional(),
    xUrl: z.string().url().optional()

})