"use client";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Chip,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TABLE_HEAD = [
  "Guru",
  "Mata Pelajaran",
  "Kelas",
  "Materi",
  "Status",
  "Keterangan",
  "Tanggal",
];

export function TabelAbsenSiswa({
  data,
  siswa,
  link,
  current_page,
  last_page,
}) {
  console.log(data);
  const [TABLE_ROWS, setTABLE_ROWS] = useState(data);
  const navigasi = useRouter();
  const idGuru = getCookie("unique");
  const [LINKS, setLINKS] = useState(link);
  const [PAGE, setPAGE] = useState({
    current_page,
    last_page,
  });

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
      setPAGE({
        ...PAGE,
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
      });
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
              Status Absen
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-sm md:text-base"
            >
              Jurusan Teknik Komputer dan Jaringan
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal capitalize text-sm md:text-base"
            >
              {siswa?.nama ? siswa?.nama : "-"}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <div className="flex min-h-fit flex-col items-center justify-between gap-4  md:flex-row">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
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
            {TABLE_ROWS?.length > 0 ? (
              TABLE_ROWS?.map(
                (
                  {
                    id,
                    id_guru,
                    id_mapel,
                    id_kelas,
                    materi,
                    status,
                    keterangan,
                    tanggal,
                  },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr
                      onClick={() =>
                        route(
                          `/system/absens/${id_mapel?.id}/${idGuru}/${id_kelas?.id}/${tanggal}`
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
                          {id_guru.nama}
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
                          {id_mapel.mapel}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {id_kelas.kelas}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {materi}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Chip
                          variant="small"
                          color={`${
                            status === "Hadir"
                              ? "green"
                              : status === "Alpa"
                              ? "red"
                              : !status
                              ? "blue"
                              : status === "Sakit" ||
                                (status === "Izin" && "orange")
                          }`}
                          className="w-fit"
                          value={!status ? "Belum absen" : status}
                        ></Chip>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {!keterangan ? "-" : keterangan}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {tanggal}
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td>
                  <Typography>Data tidak ada.</Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {PAGE?.current_page} of {PAGE?.last_page}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => handlerDataAbsen(LINKS?.prev)}
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => handlerDataAbsen(LINKS?.next)}
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
