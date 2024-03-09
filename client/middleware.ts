import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from "jose";

export const middleware = async (req: NextRequest) => {

  const token = req.cookies.get('Jwt_login_token')?.value

  // if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') {
  //   return NextResponse.next(); // Allow access to login and register pages
  // }

  if (!token) {
    // return NextResponse.redirect('/login');
    return NextResponse.redirect(new URL('/login', req.url))
  }
  try {
  const hasVerifiedToken = token && await jwtVerify(token, new TextEncoder().encode("JWT_SECRET_KEY"));

    if (hasVerifiedToken) {
      return NextResponse.next();
    }

  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.redirect('/login');
  }
};


export const config = {
  matcher: ["/profile/view-profile"],
}
