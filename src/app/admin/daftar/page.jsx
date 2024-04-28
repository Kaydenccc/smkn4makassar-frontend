import ListAdmin from "@/app/Client/ListAdmin";
import { cookies } from "next/headers";
import React from "react";
async function getAdmins() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await fetch(process.env.NEXT_PUBLIC_API_SEVER + "/admin", {
    headers: {
      Authorization: token,
    },
  });

  return await res.json();
}

const PageListAdmin = async () => {
  try {
    const { data } = await getAdmins();
    console.log(data);
    return <div>{<ListAdmin TABLE_ROWS={data} />}</div>;
  } catch (err) {
    console.log(err);
  }
};
export default PageListAdmin;
