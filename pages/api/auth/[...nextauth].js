import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export default NextAuth({
  secret: process.env.JWT_SECRET,
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/auth/signIn",
    // signOut: "/auth/logout",
    // error: "/auth/signIn", // Error code passed in query string as ?error=
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        const data = await prisma.user.findFirst({
        where:{
          email:credentials.email,
          password:credentials.password,
          emailVerified:true
        }
      })
      console.log(data)
      if(data){
          return data
      }else{
        throw new Error("user is not found");
      }
     },
    }),
  ],
  callbacks:{
        redirect:async({baseUrl})=>{
          return baseUrl+'/'
        },
        jwt:async({token,User})=>{
          if(User){
            token.id = User.id
          }
          return token
        },
        session:async({session,token})=>{
          if(token){
            session.id = token.id
          }
          return session
        }
      },
      secret:process.env.JWT_SECRET,
      jwt:{
        secret:process.env.JWT_SECRET,
        encryption:true
      },
      debug:true
});

