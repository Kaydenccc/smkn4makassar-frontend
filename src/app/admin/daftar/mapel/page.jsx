import ListMapel from "@/app/Client/ListMapel";
import { cookies } from "next/headers";
import React from "react";

async function getMapel() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await fetch("http://127.0.0.1:8000/api/mapels", {
    headers: {
      Authorization: token,
    },
  });

  return await res.json();
}

const PageListMapel = async () => {
  try {
    const { data } = await getMapel();
    console.log(data);
    // Gunakan CSR untuk logika yang memerlukan cookie
    return (
      <div>
        <ListMapel data={data} />
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default PageListMapel;
