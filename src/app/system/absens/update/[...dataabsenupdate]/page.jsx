import { UdpateAbsenData } from "@/app/Client/UpdateAbsenData";
import { convertUrlParameterFormat } from "@/helper/functionConvertString";
import { cookies } from "next/headers";
import React from "react";

const fetchData = async () => {
  const nextCookies = cookies(); // Get cookies object
  const token = nextCookies.get("token");
  const data = await fetch(process.env.NEXT_PUBLIC_API_SEVER + "/kelasmapel", {
    headers: {
      Authorization: token.value,
    },
  });

  return data.json();
};
const UpdateAbsenPage = async ({ params: { dataabsenupdate } }) => {
  const [id_mapel, id_guru, id_kelas, tanggal, materi] = dataabsenupdate;
  const data = await fetchData();
  return (
    <div className="bg-white flex-1 text-black flex flex-col justify-center items-center">
      <UdpateAbsenData
        kelas={data?.data?.kelas}
        mapel={data?.data?.mapel}
        id_mapel={id_mapel}
        id_guru={id_guru}
        id_kelas={id_kelas}
        tanggal={tanggal}
        materi={convertUrlParameterFormat(materi)}
      />
    </div>
  );
};

export default UpdateAbsenPage;
