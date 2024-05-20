import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/organization(.*)',
  '/clerk(.*)',
])

const isPublicRoute = createRouteMatcher(['/','/sign-in', '/sign-up'])

export default clerkMiddleware((auth,req) => {

  if (!auth().userId && isProtectedRoute(req)) {
    console.log("redirecting to sign in")
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  if(auth().userId && isPublicRoute(req)) {
    console.log("2nd if")
    let path = "/select-org";
    if(auth().orgId) {
      path = `/organization/${auth().orgId}`
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection)
  }

  if(!auth().userId && !isPublicRoute(req)) {
    console.log("3rd if")
    return auth().redirectToSignIn({ returnBackUrl: req.url })
  }

  if(auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org") {
    console.log("4th if")
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection)
  }
});

export const config = {
  matcher: ["/((?!.*\..*|_next).*)", "/", "/(api|trpc)(.*)",],
};