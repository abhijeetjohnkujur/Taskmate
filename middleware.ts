import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/organization(.*)',
  '/clerk(.*)',
]);

const isPublicRoute = createRouteMatcher(['/', '/sign-in', '/sign-up']); // Add your sign-in and sign-up routes here

export default clerkMiddleware((auth, req) => {
  // If the user is not logged in and the route is protected, redirect to sign in
  if (!auth().userId && isProtectedRoute(req)) {
    console.log("Redirecting to sign in because the route is protected and the user is not logged in");
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  // If the user is logged in and the route is public, redirect to the appropriate organization page
  if (auth().userId && isPublicRoute(req)) {
    let path = "/select-org";
    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  // If the user is not logged in and the route is not public, redirect to sign in
  if (!auth().userId && !isPublicRoute(req)) {
    console.log("Redirecting to sign in because the user is not logged in and the route is not public");
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }

  // If the user is logged in but has no organization selected and the route is not /select-org, redirect to /select-org
  if (auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org") {
    console.log("Redirecting to /select-org because the user has no organization selected");
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }

  // If none of the above conditions are met, allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
