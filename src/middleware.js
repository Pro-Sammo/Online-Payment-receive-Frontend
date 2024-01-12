import { NextResponse } from "next/server";

export default async function middleware(req, res) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    try {
      const token = req.cookies.get("AdminAuthToken");
      console.log("token", token);
      console.log(req.cookies)

      if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      if (token.name === "AdminAuthToken") {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/verifytoken`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            cache: "no-store",
            body: JSON.stringify({
              token: token.value,
            }),
          }
        );
        const verifedUser = await user.json();
        if (verifedUser.user.role === "user") {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/login")) {
    const admintoken = req.cookies.get("AdminAuthToken");
    const studenttoken = req.cookies.get("StudentAuthToken");
    if (admintoken || studenttoken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith("/profile")) {
    const studenttoken = req.cookies.get("StudentAuthToken");
    if (!studenttoken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
