"use client";
import { AlertSuccess } from "@/components/AlertSuccess";
import { useConfirmation } from "@/context/context.createabsen";
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
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TABLE_HEAD = ["Mata Pelajaran", "Kelas", "Materi", "Tanggal", ""];

export function TabelAbsen({ data, guru, link, current_page, last_page }) {
  const { showConfirmation, hideConfirmation } = useConfirmation();

  const [TABLE_ROWS, setTABLE_ROWS] = useState(data);
  const navigasi = useRouter();
  const idGuru = getCookie("unique");
  const [LINKS, setLINKS] = useState(link);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [idAbsen, setIdAbsen] = useState(null);
  const [PAGE, setPAGE] = useState({
    current_page,
    last_page,
  });

  // async function handlerDataAbsen(api) {
  //   const token = getCookie("token");
  //   console.log(token);
  //   try {
  //     const res = await Axios.get(api, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     setTABLE_ROWS(res.data.data);
  //     setLINKS(res.data.links);
  //     setPAGE({
  //       ...PAGE,
  //       current_page: res.data.meta.current_page,
  //       last_page: res.data.meta.last_page,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const route = (rute) => {
    navigasi.push(rute);
  };
  const deleteAbsen = async (id, id_mapel, id_kelas, tanggal) => {
    setIsSuccess(null);
    setLoading(true);
    setIdAbsen(null);

    const token = getCookie("token");
    console.log(token);
    console.log(id);
    try {
      const res = await Axios.delete(
        "/absens/" +
          id +
          "/" +
          guru?.id +
          "/" +
          id_mapel +
          "/" +
          id_kelas +
          "/" +
          tanggal,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(res);
      setTABLE_ROWS(res?.data?.data);
      setLINKS(res?.data?.links);
      setPAGE({
        ...PAGE,
        current_page: res?.data?.meta.current_page,
        last_page: res?.data?.meta.last_page,
      });
      hideConfirmation();
      setIdAbsen(id);
      setLoading(false);
      setIsSuccess(true);
    } catch (err) {
      setIdAbsen(null);
      hideConfirmation();
      setLoading(false);
      setIsSuccess(false);
      console.log(err);
    }
  };
  console.log("TABEL ROW=", TABLE_ROWS);

  return (
    <Card className="h-screen w-full flex">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-2xl md:text-4xl "
            >
              Daftar Absensi
            </Typography>
            <Typography
              color="gray"
              className="text-sm md:text-base mt-1 font-normal"
            >
              Daftar absensi dibawah merupakan daftar absensi setiap pertemuan.
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row w-full md:w-auto">
            <div className="w-full md:w-72">
              <Input
                label="Cari"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button
              className="flex items-center w-fit md:w-auto  gap-3"
              size="sm"
              onClick={() => route(`/system`)}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Buat Absen
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="w-full flex-1 h-fit pt-0 mx-2 px-0 overflow-x-auto bg-white">
        <table className="mt-4 w-full min-w-max table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`border-y border-blue-gray-100 bg-[#F5F7F8] p-4 ${
                    index === 0 ? "sticky left-0 bg-[#F5F7F8] z-10" : ""
                  }`}
                  style={{
                    position: index === 0 ? "sticky" : "relative",
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
                ({ id, id_mapel, id_kelas, materi, tanggal }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? `p-4`
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <React.Fragment key={index}>
                      <tr
                        key={index}
                        className={`cursor-pointer hover:bg-blue-gray-50 odd:bg-white even:bg-gray-100 `}
                      >
                        <td
                          className={
                            classes +
                            ` sticky left-0 z-10 cursor-pointer hover:bg-blue-gray-50 ${
                              index % 2 === 0 ? "bg-white" : " bg-[#F5F7F8]"
                            }  `
                          }
                          style={{
                            position: "sticky",
                            left: 0,
                          }}
                          onClick={() =>
                            route(
                              `/system/absens/${id_mapel?.id}/${idGuru}/${id_kelas?.id}/${tanggal}`
                            )
                          }
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {id_mapel?.mapel}
                          </Typography>
                        </td>
                        <td
                          className={classes}
                          onClick={() =>
                            route(
                              `/system/absens/${id_mapel?.id}/${idGuru}/${id_kelas?.id}/${tanggal}`
                            )
                          }
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {id_kelas?.kelas}
                          </Typography>
                        </td>
                        <td
                          className={classes}
                          onClick={() =>
                            route(
                              `/system/absens/${id_mapel?.id}/${idGuru}/${id_kelas?.id}/${tanggal}`
                            )
                          }
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {materi}
                          </Typography>
                        </td>
                        <td
                          className={classes}
                          onClick={() =>
                            route(
                              `/system/absens/${id_mapel?.id}/${idGuru}/${id_kelas?.id}/${tanggal}`
                            )
                          }
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {tanggal}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Tooltip content="Hapus Absen">
                            <IconButton
                              variant="text"
                              onClick={() =>
                                showConfirmation(
                                  "Konfirmasi Hapus",
                                  "Apakah Anda yakin ingin menghapus data?",
                                  () =>
                                    deleteAbsen(
                                      id,
                                      id_mapel?.id,
                                      id_kelas?.id,
                                      tanggal
                                    )
                                )
                              }
                            >
                              <TrashIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    </React.Fragment>
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
