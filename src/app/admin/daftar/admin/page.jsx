import ListAdmin from "@/app/Client/ListAdmin";
import { cookies } from "next/headers";
import React from "react";

async function getAdmin() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await fetch("http://127.0.0.1:8000/api/admin", {
    headers: {
      Authorization: token,
    },
  });

  return await res.json();
}
const PageListAdmin = async () => {
  try {
    const { data } = await getAdmin();
    console.log(data);
    return (
      <div>
        <ListAdmin data={data} />
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default PageListAdmin;
