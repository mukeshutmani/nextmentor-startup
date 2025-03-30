import 'next-auth';
import { DefaultSession } from 'next-auth';


// id         String   @id @default(uuid()) // Unique UUID for better security
//   email      String   @unique // Unique email
//   username   String   @unique // Unique username
//   password   String   // Hashed password will be stored
//   isVerified Boolean  @default(false)
//   otpCode        Int?
//   expiryDate DateTime?  

declare module 'next-auth' {
    interface User {
        id?: string,
        email?: string,
        username?: string,
        isVerified?: boolean,
    }
    interface Session {
        user : {
            id?: string,
            email?: string,
            username?: string,
            isVerified?: boolean,
        } & DefaultSession['user']
    }
    
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string,
        email?: string,
        username?: string,
        isVerified?: boolean,
    }
}