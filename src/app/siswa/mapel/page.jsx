import React from "react";
import { cookies } from "next/headers";
import { TabelMataPelajaranSiswa } from "@/app/Client/TabelMataPelajaranSiswa";

const getAbsens = async () => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  const id = cookie.get("unique").value;
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SEVER + "/absens/siswa/" + id + "/laporan",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
const page = async () => {
  const data = await getAbsens();
  return (
    <div className="w-full flex-1">
      <TabelMataPelajaranSiswa
        data={data?.data}
        idsiswa={data?.data[0]?.id_siswa}
      />
    </div>
  );
};

export default page;
