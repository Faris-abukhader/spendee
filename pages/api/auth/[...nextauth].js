import NextAuth from "next-auth"
import CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client"
import('next').NextConfig
import bcrypt from "bcrypt"
import axios from "axios";

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
      //   bcrypt.genSalt(10, async function (err, salt) {
      //     if (err) {
      //         return null
      //     }
      //     bcrypt.hash(credentials.password, salt,async function (err, hashedPassword) {
      //       console.log('err: '+err) 
      //       console.log('hashedPassword: '+hashedPassword) 


      //       if (!err) {
      //           try{
      //             const data = await prisma.user.findFirst({
      //               where:{
      //                 email:credentials.email,
      //                 password:hashedPassword,
      //                 emailVerified:true
      //               }
      //             })
        
      //             console.log(data)
      //             console.log('-----------------------------------------')

      //             if(!data){return null}
        
      //             return data;
        
      //           }catch{
      //             console.log("not working")
      //             return null;
      //           }
                
      //         }
      //         return null
      //     });
      // });




        
        // const request = await axios.post(`${process.env.API_URL}/user/auth`,{email:credentials.email,password:credentials.password})
        // .then((response)=>{
        //   console.log('-----------------------------------------')
        //   console.log(response.data.user)
        //   return{
            
        //       "id": "cl2riurcv0015d0qpl9piozn4",
        //       "firstName": "fares",
        //       "secondName": "raed",
        //       "email": "faresraed2011@yahoo.com",
        //       "password": "$2b$10$0VFN6DsiA2hlbf1cpBogMuGVYgRjCsmMEo/rzhN9bGcQlXVwH2RuC",
        //       "emailVerified": true,
        //       "image": null,
        //       "gender": null,
        //       "age": 0
        //   }          
        //   if(response.data.state){
        //     // return response.data.user
        //     return{
        //       email: 'faresraed2011@yahoo.com',
        //       firstName: 'fares',
        //       secondName: 'raed',
        //       age: 0
        //     }
        //  }else{
        //    return null;
        //  }
 
        // }).catch(()=>{return null})

        // .then((response)=>{
        //   if(response.data.state){
        //     const hara = response.data.user
        //     return hara
        //   }else{
        //     return null;
        //   }
        // }).catch((err)=>{return null})


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
          console.log(user.user)
          return user.user;
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
        jwt:async({token,User})=>{
          if(User){
            token.id = User.id
          }
          return token
        },
        session:async({session,token})=>{
          console.log("token")
          console.log(token)
          if(token){
            session.id = token.id
          }
          return session
        },
      },
      secret:process.env.JWT_SECRET,
      jwt:{
        secret:process.env.JWT_SECRET,
        encryption:true
      },
      debug:true
});

