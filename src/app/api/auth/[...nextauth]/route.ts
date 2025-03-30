
import NextAuth, { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";



export const authOptions:NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),

        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),

        CredentialsProvider({
            id: "credentials",
           name: "credentials",

            credentials: { 
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            
          async authorize (credentials: any): Promise<any> {

                try {
                    
                  if( !credentials.email || !credentials.password) {
                      throw new Error("Email and password are required")
                  }

                  // check user exists 
                 const user = await prisma.users.findUnique({where: {email: credentials.email}})

                 if (!user) {
                    throw new Error("No user found with this email")
                 }

                 if(!user.isVerified){
                    throw new Error("Please verify your account first before login")
                 }

                // check password
                 
               const isPasswordCorrect = await bcrypt.compare(credentials.password, user?.password as string);

                if (!isPasswordCorrect) {
                    throw new Error("Incorrect Password")
                }
               
                // console.log("user printed",user);
               

                return user;
                

                } catch (error: any) {
                   console.error("Login error:", error);
                   throw new Error("Something went wrong");
                }
            },
        
            
        }),




    ],

    callbacks: {
         async signIn({user, account}){

            if(account?.provider === "google" || account?.provider === "github" ){
                try {
                     
                    let existingUser = await prisma.users.findUnique({
                        where: { email: user.email as string },
                      });
                      
                      if (!existingUser) {
                        // ✅ Create user without name & image
                        existingUser = await prisma.users.create({
                          data:  {
                            email: user.email as string,
                            isVerified: true,
                          },
                        });
                      }
                    

                } catch (error) {
                    console.error("Error signing in:", error);
                    return false; // Prevent sign-in
                }

            }

            return true;
         },

         async jwt({ token, user }) {
            if (user) {
              token.id = user.id;
              token.isVerified = user.isVerified
              token.email = user.email;
            }
            console.log("Tokens",token);
            
            return token;
          },

          async session({ session, token }) {
            if (token) {
              session.user.id = token.id;
              session.user.email = token.email;
              session.user.isVerified = token.isVerified
            } 

            console.log("Sessions", session);
            
            return session;
          },
    },

    session: {
        strategy: "jwt",
        maxAge: 60*60*24*7
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/sign-in",
    },
 
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
