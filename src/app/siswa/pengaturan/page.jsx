import { cookies } from "next/headers";
import Pengaturan from "./Pengaturan";

const getClass = async () => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const id = cookie.get("unique")?.value;
  try {
    const res = fetch(
      process.env.NEXT_PUBLIC_API_SEVER + "/kelas/siswa/" + id + "/bysiswa",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return await (await res).json();
  } catch (err) {
    console.log(err);
  }
};

async function page() {
  const { data } = await getClass();
  console.log(data);
  return (
    <>
      <Pengaturan kelas={data?.kelas} datasiswa={data?.siswa} />
    </>
  );
}

export default page;
