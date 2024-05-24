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
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TABLE_HEAD = ["No.", "Guru", "Mata Pelajaran", "Kelas", "Action"];

export function TabelMataPelajaranSiswa({ data, idsiswa }) {
  const [TABLE_ROWS, setTABLE_ROWS] = useState(data);
  const navigasi = useRouter();
  const [text, setText] = useState("");

  const route = (rute) => {
    navigasi.push(rute);
  };

  const cari = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.get(`/search/mapel/siswa?cari=${text}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setTABLE_ROWS(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
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
            <form onSubmit={cari} className="w-full md:w-72">
              <Input
                placeholder="Cari by:mapel,guru"
                onChange={(e) => setText(e.target.value)}
                icon={
                  <button type="submit">
                    <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer hover:text-blue-500 hover:scale-150" />
                  </button>
                }
              />
            </form>
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
            {TABLE_ROWS?.length > 0 ? (
              TABLE_ROWS?.map(
                ({ id_mapel, id_kelas, kelas, mapel, siswa, guru }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index} className=" odd:bg-white even:bg-gray-100">
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
                          `sticky left-0 z-10  ${
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
                          {guru?.nama}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {mapel?.mapel}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {kelas?.kelas}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip
                          content={"Statistik Kehadiran " + mapel?.mapel}
                        >
                          <IconButton
                            variant="text"
                            onClick={() =>
                              route(
                                `/siswa/statistik/${id_mapel}/${idsiswa}/${id_kelas}`
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 text-green-500 cursor-pointer"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2.25 13.5a8.25 8.25 0 0 1 8.25-8.25.75.75 0 0 1 .75.75v6.75H18a.75.75 0 0 1 .75.75 8.25 8.25 0 0 1-16.5 0Z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M12.75 3a.75.75 0 0 1 .75-.75 8.25 8.25 0 0 1 8.25 8.25.75.75 0 0 1-.75.75h-7.5a.75.75 0 0 1-.75-.75V3Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </IconButton>
                        </Tooltip>
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
