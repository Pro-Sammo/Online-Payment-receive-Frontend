// import { NextResponse } from "next/server";

// export async function POST(req) {
//   let reqBody = await req.json();
//   const { email, password } = reqBody;
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/login`, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify({
//       email: email,
//       password: password,
//     }),
//   });
//   const data = await res.json();
//   NextResponse.json({ data: data });
// }
