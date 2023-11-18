// export { auth as middleware } from "./auth"
// export { auth as default } from "./auth"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { decode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// export { default } from "next-auth/middleware"

export default withAuth(
  function middleware (req) {
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        console.log('middleware',token)
        if (
          // req.nextUrl.pathname.startsWith('/manager') &&
          token != null &&
          token.role === 'Manager'
        ) {
          NextResponse.redirect('/Manager');
          return true
        }
        if (
          // req.nextUrl.pathname.startsWith('/test') &&
          token != null &&
          token.role === 'PersonalTrainer'
        ) {
          return true
        }
        return false;
      }
    }
  }
)
// export const config = {
//   matcher: ["/test"],
// }
