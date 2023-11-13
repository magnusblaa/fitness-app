import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import { NextResponse } from "next/server";

export const config ={
  session: {
    strategy: "jwt"
  },
  providers: [
    GitHub,
    Credentials({
    
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const LoginDTO = {email: credentials.email, password: credentials.password}
      console.log(LoginDTO)
      const res = await fetch('https://afefitness2023.azurewebsites.net/api/Users/login', {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(LoginDTO)
      });
      if(!res.ok){
        return null;
      }
      const data = await res.json();
      console.log(data);
      return data;
    },
    
  })
  ],
  
  callbacks: {
    async authorized({ request, auth }) {
      // const url = request.nextUrl
      const isLoggedIn = !!auth;
      if (isLoggedIn){
        return true;
      } else{
        return false;
      }
      
      // if(request.method === "POST") {
      //   const { authToken } = (await request.json()) ?? {}
      //   // If the request has a valid auth token, it is authorized
      //   const valid = await validateAuthToken(authToken)
      //   if(valid) return true
      //   return NextResponse.json("Invalid auth token", { status: 401 })
      // }
    
      // // Logged in users are authenticated, otherwise redirect to login page
      // return !!auth?.user
      
    },
    async jwt({token, user}){
      if(user){
        return {...token, ...user};
      }
      return token;
    },
    async session({session, token, user}){
      if (token){
        session.user = token;
      }
      return session;
    }
  }
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)