import React, { Suspense } from "react";
import { cookies } from "next/headers";
import TabelSiswaPerKelas from "@/app/Client/TabelSiswaPerKelas";

const getAbsenById = async (params) => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SEVER}/siswa/${params}/all`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const SiswaKelas = async ({ params: { id_kelas } }) => {
  const { data } = await getAbsenById(id_kelas);
  return (
    <div className="w-full flex-1 flex  md:pb-0">
      <Suspense fallback={<h1>Loading...</h1>}>
        <TabelSiswaPerKelas
          data={data}
          kelas={data[0]?.id_kelas?.kelas}
          id_kelas={data[0]?.id_kelas?.id}
        />
      </Suspense>
    </div>
  );
};

export default SiswaKelas;
