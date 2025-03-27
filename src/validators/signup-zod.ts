import {z} from  'zod';


export const usernameValidations =  z
.string()
.min(3, "username must be atleast three charcters")
.max(20, "username must be no more than 20 charcters")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")


export const signUpSchema = z.object({
    username: usernameValidations,
    email: z.string().email({message: "Invalid email format"}),
    password: z.string().min(6, {message: "password must be ast least 6 characters"}).max(20)
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter (A-Z)")
    // .regex(/\d/, "Password must contain at least one number (0-9)")
    // .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character (!@#$%^&*)")
})