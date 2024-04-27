import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request, response) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;
  console.log(role, token);
  if (!token || !role) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  try {
    let data;
    if (role === "111") {
      data = await (
        await fetch("http://127.0.0.1:8000/api/admin/current", {
          headers: {
            Authorization: token,
          },
        })
      ).json();
    } else if (role === "0001") {
      data = await (
        await fetch("http://127.0.0.1:8000/api/gurus/current", {
          headers: {
            Authorization: token,
          },
        })
      ).json();
    } else if (role === "1299") {
      data = await (
        await fetch("http://127.0.0.1:8000/api/siswa/current", {
          headers: {
            Authorization: token,
          },
        })
      ).json();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (data?.errors) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/system/:path*",
    "/scanner/:path*",
    "/download/:path*",
    "/admin/:path*",
    "/siswa/:path*",
  ],
};
