import Example from "@/components/Chart";
// import Styles from '@/app/Client/Styles';
import { cookies } from "next/headers";

const getDataRekap = async (idmapel, idsiswa, idkelas) => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SEVER}/guru/absens/siswa/${idsiswa}/${idmapel}/${idkelas}/statistik`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("response data =", res);
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export default async function Page({ params: { rekap } }) {
  console.log(rekap);
  const [idmapel, idsiswa, idkelas] = rekap;
  const { statistik } = await getDataRekap(idmapel, idsiswa, idkelas);
  console.log(statistik);
  return (
    <div className="py-8 px-0 md:p-8 w-full">
      <Example statistik={statistik ? statistik : []} />
    </div>
  );
}
