import { NextRequest, NextResponse } from 'next/server';
import { auth } from './server/auth';

export default async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const session = await auth();

  if (pathname == '/') {
    if (!session)
      return NextResponse.redirect(`${process.env.DOMAIN_URL}/auth/signin`);
  }
  if (pathname.includes('/dashboard')) {
    if (!session)
      return NextResponse.redirect(`${process.env.DOMAIN_URL}/auth/signin`);
  }
  if (pathname == '/auth/signin' || pathname == '/auth/signup') {
    if (session) return NextResponse.redirect(`${origin}`);
  }
}
