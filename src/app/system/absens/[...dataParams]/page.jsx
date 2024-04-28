import Scanner from "@/components/Scanner";
import TableWithStripedRows from "@/app/Client/TabelAbsenId";
import React, { Suspense } from "react";
import { cookies } from "next/headers";

const getAbsenById = async (params) => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SEVER}/absens/${params[0]}/${params[1]}/${params[2]}/${params[3]}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const page = async ({ params: { dataParams } }) => {
  console.log(dataParams);
  const [id_mapel, id_guru, id_kelas, tanggal] = dataParams;
  const { data } = await getAbsenById(dataParams);
  console.log(id_mapel);
  console.log(data);
  return (
    <div className="w-full flex-1 flex  md:pb-0">
      <Suspense fallback={<h1>Loading...</h1>}>
        <TableWithStripedRows
          TABLE_ROWS={data}
          id_mapel={id_mapel}
          id_guru={id_guru}
          id_kelas={id_kelas}
          kelas={data[0]?.id_kelas?.kelas}
          tanggal={tanggal}
          materi={data[0]?.materi}
          mapel={data[0]?.id_mapel.mapel}
        />
      </Suspense>
    </div>
  );
};

export default page;
