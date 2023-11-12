import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"

export const config ={
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
    }
  })
  ],
  callbacks: {
    authorized({ request, auth }) {
      return !!auth
      // return false;
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