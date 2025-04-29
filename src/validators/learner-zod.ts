import z from 'zod'

export const LearnerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phonenumber: z.string(),
    country: z.string(),
    educationLevel: z.string(),
    schoolName : z.string(),
    schoolCardUrl: z.string(),
    profileUrl: z.string(),
    mentorshipType: z.string(),
    bio: z.string(),
}) 