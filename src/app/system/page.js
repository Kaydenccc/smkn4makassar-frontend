import { SimpleRegistrationForm } from "@/app/Client/SimpleRegistrationForm";
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
const Dashboard = async () => {
  const data = await fetchData();
  return (
    <div className="bg-white flex-1 text-black flex flex-col justify-center items-center">
      <SimpleRegistrationForm kelas={data.data.kelas} mapel={data.data.mapel} />
    </div>
  );
};

export default Dashboard;
