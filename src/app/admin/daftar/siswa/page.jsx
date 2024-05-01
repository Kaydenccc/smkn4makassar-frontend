import ListSiswa from "@/app/Client/ListSiswa";
import { cookies } from "next/headers";
import React from "react";

async function getSiswa() {
  const cookie = cookies();
  const token = cookie.get("token")?.value;
  console.log(token);

  try {
    const res = fetch(process.env.NEXT_PUBLIC_API_SEVER + "/admin/siswa/all", {
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
