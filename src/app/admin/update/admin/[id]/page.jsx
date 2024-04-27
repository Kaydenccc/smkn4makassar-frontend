import UpdateAdmin from "@/app/Client/UpdateAdmin";
import { cookies } from "next/headers";

const getAdmin = async (id) => {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  try {
    const res = fetch("http://127.0.0.1:8000/api/admin/" + id + "/get", {
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
  const { data } = await getAdmin(id);
  console.log("admin =", data);
  return (
    <>
      <UpdateAdmin data={data} id_admin={id} />
    </>
  );
}

export default page;
