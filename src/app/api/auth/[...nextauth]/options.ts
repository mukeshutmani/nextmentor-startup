
import  { NextAuthOptions } from "next-auth"
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
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
              console.log("Google Profile: ", profile);
              return {
                id: profile.sub, 
                name: profile.name, 
                email: profile.email, 
                image: profile.picture, 
              }},
              authorization: {
                params: {
                  prompt: "consent",
                  response_type: "code",
                  redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
                  access_type: "offline",
                }
              }
            
        }),
          
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            profile(profile){
              console.log("Github", profile);
              return {
                id: profile.id,
                name: profile.name,
                email: profile.email
              }
            },

            authorization: {
              params: {
                prompt: "consent",
                response_type: "code",
                redirect_uri: process.env.NEXTAUTH_URL + "/api/auth/callback/github",
                access_type: "offline",
              }
            }
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
                 const user = await prisma.user.findUnique({where: {email: credentials.email}})
                 
                 console.log(user);
                 
                 
          
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

        
          async signIn({ user, account }) {
           
            try {
              if (account?.provider !== 'credentials' && user.email) {
  
                if(account?.provider === 'google' || account?.provider === 'github'){
                  
                  const existed = await prisma.user.findUnique({
                    where: {email: user.email}
                   })

                   if(existed){
                        return true
                   } 
                   
                  

                  const newUser = await prisma.user.create({
                    data: { 
                      id: String(user.id),
                      email: user.email as string,
                      username: user.name as string,  
                      isVerified: true,
                    }
                  })
 
                }
                
              } 
             return true
              
            } catch (error: any) {  
              console.log(error.message);  
              return false 
            }
            // For OAuth providers, ensure user is verified
          },
            
  
         async jwt({ token, user, account }) {
            if (user && user.id) {
              token.id = user.id;
              token.isVerified = user.isVerified ?? true
              token.email = user.email;
              token.accessToken = account?.access_token
            }
            // console.log("Tokens",token);
            
            return token;
          },

          async session({ session, token }) {
            if (token) {
              session.user.id = token.id;
              session.user.email = token.email;
              session.user.isVerified = token.isVerified ?? true
            } 

            // console.log("Sessions", session);
            
            return session;
          },
    },

    session: {
        strategy: "jwt",
        maxAge: 60*60*24*7
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: `${process.env.NEXTAUTH_URL}/signin`,
    },
 
}

