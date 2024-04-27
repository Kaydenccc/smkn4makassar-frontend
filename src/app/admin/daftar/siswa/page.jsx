import ListSiswa from "@/app/Client/ListSiswa";
import { cookies } from "next/headers";
import React from "react";

async function getSiswa() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  console.log(token);

  try {
    const res = fetch("http://127.0.0.1:8000/api/admin/siswa/all", {
      headers: {
        Authorization: token,
      },
    });
    return await (await res).json();
  } catch (err) {
    console.log(err);
  }
}

const PageListStudents = async () => {
  const data = await getSiswa();
  console.log(data);
  return (
    <div>
      <ListSiswa
        data={data?.data}
        link={data?.links}
        current_page={data?.meta?.current_page}
        last_page={data?.meta?.last_page}
      />
    </div>
  );
};

export default PageListStudents;
