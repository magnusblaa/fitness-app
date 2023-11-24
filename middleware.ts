import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware (req, event) {
    const token = await getToken({req});
    const url = req.nextUrl.clone()
    console.log(url.pathname)
    if(token?.role === 'Manager') {
      if(!url.pathname.startsWith('/manager')){
        return NextResponse.redirect(new URL('/manager', req.url))
      }
    }
    else if (token?.role === 'PersonalTrainer'){
      if(!url.pathname.startsWith('/personalTrainer')){
        return NextResponse.redirect(new URL('/personalTrainer/workoutProgram', req.url))
      }
    }
    else if (token?.role === 'Client'){
      if(!url.pathname.startsWith('/client')){
        return NextResponse.redirect(new URL('/client/workoutProgram', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        return token != null;
      }
    }
  }
)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.png).*)'],
}
