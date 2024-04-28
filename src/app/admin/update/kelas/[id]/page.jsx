import UpdateKelas from "@/app/Client/UpdateKelas";
import { cookies } from "next/headers";

const getClass = async (id) => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  try {
    const res = fetch(process.env.NEXT_PUBLIC_API_SEVER + "/kelas/" + id, {
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
  const { data } = await getClass(id);
  return (
    <>
      <UpdateKelas data={data} id_kelas={id} />
    </>
  );
}

export default page;
