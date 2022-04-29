import NextAuth from "next-auth"
import axios from "axios";
import CredentialsProvider  from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"
import TwitterProvider from "next-auth/providers/twitter"
import RedditProvider from "next-auth/providers/reddit"


export default NextAuth({
  providers: [
    CredentialsProvider({
      name:"credentials",
      credentials:{
        username:{label:"Email",type:"email",placeholder:"example@something.com"},
        password:{label:"Password",type:"password"}
      },
      authorize:async(credentials)=>{

        const request = await axios.post(`${process.env.API_URL}/user/auth`,{email:credentials.email,password:credentials.password})
        const response = request.data.data

        if(response){
           return response
        }else{
          return null
        }
        
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    AppleProvider({
        clientId: process.env.APPLE_ID,
        clientSecret: process.env.APPLE_SECRET
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    InstagramProvider({
        clientId: process.env.INSTAGRAM_CLIENT_ID,
        clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    }),
    TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID,
        clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    RedditProvider({
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET
    })
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
  }
  
})
