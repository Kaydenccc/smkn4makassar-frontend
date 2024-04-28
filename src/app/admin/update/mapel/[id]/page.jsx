import UpdateKelas from "@/app/Client/UpdateKelas";
import UpdateMapel from "@/app/Client/UpdateMapel";
import { cookies } from "next/headers";

const getMapel = async (id) => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  try {
    const res = fetch(process.env.NEXT_PUBLIC_API_SEVER + "/mapels/" + id, {
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
  const { data } = await getMapel(id);
  console.log(data);
  return (
    <>
      <UpdateMapel data={data} id_mapel={id} />
    </>
  );
}

export default page;
