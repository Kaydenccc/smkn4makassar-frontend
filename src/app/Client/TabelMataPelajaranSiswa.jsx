"use client";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TABLE_HEAD = ["No.", "Pengampuh", "Mata Pelajaran", "Kelas"];

export function TabelMataPelajaranSiswa({ data, idsiswa }) {
  const [TABLE_ROWS, setTABLE_ROWS] = useState(data);
  const navigasi = useRouter();

  async function handlerDataAbsen(api) {
    const token = getCookie("token");
    console.log(token);
    try {
      const res = await Axios.get(api, {
        headers: {
          Authorization: token,
        },
      });
      setTABLE_ROWS(res.data.data);
      setLINKS(res.data.links);
    } catch (err) {
      console.log(err);
    }
  }

  const route = (rute) => {
    navigasi.push(rute);
  };
  console.log(TABLE_ROWS);

  return (
    <Card className="h-screen w-full flex">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-6 flex md:items-center flex-col md:flex-row justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-2xl md:text-4xl"
            >
              Daftar Mata Pelajaran
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-sm md:text-base"
            >
              Pilih salah satu mata pelajaran dibawah untuk melihat statistik
              kehadiran
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Cari"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-auto  flex-1 h-fit pt-0 px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`border-y border-blue-gray-100 bg-[#F5F7F8] p-4 ${
                    index === 1 ? "sticky left-0 bg-[#F5F7F8] z-10" : ""
                  }`}
                  style={{
                    position: index === 1 ? "sticky" : "relative",
                    left: 0,
                  }}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.length > 0 ? (
              TABLE_ROWS?.map(
                ({ id_mapel, id_kelas, kelas, mapel, siswa, guru }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      onClick={() =>
                        route(
                          `/siswa/statistik/${id_mapel}/${idsiswa}/${id_kelas}`
                        )
                      }
                      key={index}
                      className="cursor-pointer hover:bg-blue-gray-50 odd:bg-white even:bg-gray-100"
                    >
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </td>
                      <td
                        className={
                          classes +
                          `sticky left-0 z-10 cursor-pointer ${
                            index % 2 === 0 ? "bg-white" : " bg-[#F5F7F8]"
                          } p-4`
                        }
                        style={{
                          position: "sticky",
                          left: 0,
                        }}
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {guru.nama}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {mapel.mapel}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {kelas.kelas}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Data tidak ada.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
