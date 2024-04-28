import React from "react";
import { cookies } from "next/headers";
import { TabelLaporan } from "@/app/Client/TabelLaporan";

const getAbsens = async () => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  const id = cookie.get("unique").value;
  console.log(id);
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SEVER + "/absens/guru/" + id + "/laporan",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
const page = async () => {
  const data = await getAbsens();
  console.log(data);
  return (
    <div className="w-full flex-1">
      <TabelLaporan
        data={data?.data}
        guru={data?.data[0]?.id_guru}
        link={data?.links}
        current_page={data?.meta?.current_page}
        last_page={data?.meta?.last_page}
      />
    </div>
  );
};

export default page;
