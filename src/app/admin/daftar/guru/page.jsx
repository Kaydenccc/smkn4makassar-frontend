import ListGuru from "@/app/Client/ListGuru";
import { cookies } from "next/headers";
import React from "react";

async function getGuru() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await fetch("http://127.0.0.1:8000/api/gurus", {
    headers: {
      Authorization: token,
    },
  });

  return await res.json();
}

const PageListGuru = async () => {
  try {
    const { data } = await getGuru();
    console.log(data);
    return (
      <div>
        <ListGuru data={data} />
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default PageListGuru;
