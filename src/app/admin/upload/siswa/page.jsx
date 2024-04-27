import PostSiswa from "@/app/Client/PostSiswa";
import { cookies } from "next/headers";

const getClass = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  try {
    const res = fetch("http://127.0.0.1:8000/api/kelas", {
      headers: {
        Authorization: token,
      },
    });
    return await (await res).json();
  } catch (err) {
    console.log(err);
  }
};

async function page() {
  const { data } = await getClass();
  return (
    <>
      <PostSiswa kelas={data} />
    </>
  );
}

export default page;
