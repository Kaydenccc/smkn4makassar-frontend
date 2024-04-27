import UpdateGuru from "@/app/Client/UpdateGuru";
import { cookies } from "next/headers";

const getGuru = async (id) => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  try {
    const res = fetch("http://127.0.0.1:8000/api/gurus/" + id, {
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
  const { data } = await getGuru(id);
  console.log("Guru =", data);
  return (
    <>
      <UpdateGuru data={data} id_guru={id} />
    </>
  );
}

export default page;
