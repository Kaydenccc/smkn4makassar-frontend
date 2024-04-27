import UpdateSiswa from "@/app/Client/UpdateSiswa";
import { cookies } from "next/headers";

const getClass = async (id) => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  try {
    const res = fetch("http://127.0.0.1:8000/api/kelas/siswa/" + id, {
      headers: {
        Authorization: token,
      },
    });
    return await (await res).json();
  } catch (err) {
    console.log(err);
  }
};

async function page({ params: { id } }) {
  console.log(id);

  const { data } = await getClass(id);
  // console.log(data);
  return (
    <>
      <UpdateSiswa kelas={data?.kelas} datasiswa={data?.siswa} />
    </>
  );
}

export default page;
