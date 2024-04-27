import ListClass from "@/app/Client/ListClass";
import { cookies } from "next/headers";
import React from "react";

async function getClasses() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  const res = await fetch("http://127.0.0.1:8000/api/kelas", {
    headers: {
      Authorization: token,
    },
  });

  return await res.json();
}

const PageListClass = async () => {
  try {
    const { data } = await getClasses();
    console.log(data);
    return <div>{<ListClass data={data} />}</div>;
  } catch (err) {
    console.log(err);
  }
};

export default PageListClass;
