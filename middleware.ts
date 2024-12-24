import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  // Get the token from cookies
  const token = req.cookies.get("authToken");

  // If token does not exist or is invalid, redirect to login
  if (!token || !verifyToken(token.value)) {
    console.log("No valid token found. Redirecting to login...");
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }

  // Allow the request to proceed to the /dashboard page if token is valid
  return NextResponse.next();  // Continue to the requested page
}

export const config = {
  matcher: ["/dashboard/:path*"],  // Apply middleware to /dashboard and its subpaths
};
