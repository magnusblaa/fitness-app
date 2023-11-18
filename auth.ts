import NextAuth from "next-auth"
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthOptions, User } from "next-auth"
import { getToken } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      const LoginDTO = {email: credentials?.email, password: credentials?.password}
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

      const userDataFromToken = decodeToken(data.jwt);

      const newUser: User = {
        jwtToken: data.jwt,
        role: userDataFromToken.Role,
        name: userDataFromToken.Name,
        id: userDataFromToken.UserId
      }

      return newUser;

    },
    
  })
  ],
  
  callbacks: {
    async jwt({token, user}){
      // token.jwtToken = user.jwtToken;
      // token.name = user.name;
      // token.role = user.role;
      // token.userId = user.id
      return {...token, ...user};
    },
    async session({session, token, user}){
      session.user = token as any;
      return session;
    },
  }
}

function decodeToken(token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = Buffer.from(base64, 'base64').toString('utf-8')
  console.log(JSON.parse(jsonPayload))  
  return JSON.parse(jsonPayload);
}

export const handler = NextAuth(authOptions)
