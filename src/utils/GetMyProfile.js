export async function getmyprofile() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getmyprofile`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return res.json();
}
