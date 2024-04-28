// import React, { Suspense } from "react";
import { cookies } from "next/headers";
import { TabelAbsenSiswa } from "../Client/TabelAbsenSiswa";

const getAbsens = async () => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  const id = cookie.get("unique").value;
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SEVER + "/absens/siswa/" + id,
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
      {/* <Suspense fallback={<>Loading...</>}> */}
      <TabelAbsenSiswa
        data={data?.data}
        siswa={data?.data[0]?.id_siswa}
        link={data?.links}
        current_page={data?.meta?.current_page}
        last_page={data?.meta?.last_page}
      />
      {/* </Suspense> */}
    </div>
  );
};

export default page;
