import { NextResponse } from 'next/server'

export default function middleware() {
  // Allow all routes (create, editor, dashboard, published experiences) without login requirements
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
