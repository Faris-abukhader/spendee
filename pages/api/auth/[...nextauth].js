import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"
import('next').NextConfig
import EventEmitter from "../../../utils/EventEmitter";

const prisma = new PrismaClient()

let newUserData = null
EventEmitter.addListener('reloadSession',(data)=>{
  console.log('got event')
  newUserData.email = data.email
  newUserData.name = data.firstName+' '+data.secondName
  newUserData.image = data.image
})

export default NextAuth({
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: "/auth/signIn",
    // signOut: "/auth/logout",
    // error: "/auth/signIn", // Error code passed in query string as ?error=
  },
  providers: [
    CredentialsProvider({
      credentials: {
        id: 'credentials',
        name: 'Credentials',  
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
      
        const res = await fetch(`${process.env.API_URL}/user/auth`, {
          method: 'POST',
          body: JSON.stringify({email:credentials.email,password:credentials.password}),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const user = await res.json();
        if (!user.state) {
          throw new Error('something wrong');
        }
        // If no error and we have user data, return it
        if (user.user) {
          // return user.user
          return{
            email:user.user.email,
            name:user.user.firstName+' '+user.user.secondName,
            image:user.user.image
          }
        }

        // Return null if user data could not be retrieved
        return null;


      },
    }),
  ],
  callbacks:{
        redirect:async({baseUrl})=>{
          return baseUrl+'/'
        },
        jwt:async({token,user})=>{
          if(user){
            token.id = user.id
          }
          return token
        },
        session:async({session,token,user})=>{
          // if(token){
          //   session.id = token.id
          // }
          // return session
          if(user){
            session.user = user
          }
          if (token){
            session.token = token
          }

          if(newUserData){
            console.log('got data from event')
            session.user = newUserData
          }


          console.log('from sesion ')
          console.log(session)
          return session


        },
        jwt:async({token,user,account,profile})=>{
          if(account){
            token.accessToken = account.access_token
          }
          return token
        }
      },
      secret:process.env.JWT_SECRET,
      jwt:{
        secret:process.env.JWT_SECRET,
        encryption:true
      },
      debug:true
});

