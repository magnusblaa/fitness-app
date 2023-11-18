import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      jwtToken: string;
      role: string;
      name: string;
      id: string;
    }
  }
  interface User {
    jwtToken: string;
    role: string;
    name: string;
    id: string;
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    jwtToken: string;
    role: string;
    name: string;
    userId: string;
  }
}