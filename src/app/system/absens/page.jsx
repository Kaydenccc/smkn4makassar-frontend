import React from "react";
import { TabelAbsen } from "@/app/Client/TabelAbsen";
import { cookies } from "next/headers";

const getAbsens = async () => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  const id = cookie.get("unique").value;
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_SEVER + "/absens/guru/" + id,
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
const PageAbsens = async () => {
  const data = await getAbsens();
  console.log(data);
  return (
    <div className="w-full flex-1">
      <TabelAbsen
        data={data?.data}
        guru={data?.data[0]?.id_guru}
        link={data?.links}
        current_page={data?.meta?.current_page}
        last_page={data?.meta?.last_page}
      />
    </div>
  );
};

export default PageAbsens;
