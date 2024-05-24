"use client";
import { AlertSuccess } from "@/components/AlertSuccess";
import Edit from "@/components/Edit";
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
  button,
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
  const [text, setText] = useState("");
  const [PAGE, setPAGE] = useState({
    current_page,
    last_page,
  });

  const route = (rute) => {
    navigasi.push(rute);
  };
  const deleteAbsen = async (id, id_mapel, id_kelas, tanggal) => {
    setIsSuccess(null);
    setLoading(true);
    setIdAbsen(null);

    const token = getCookie("token");

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

  const cari = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.get("/search/absen?cari=" + text, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setTABLE_ROWS(res?.data?.data);
      setLINKS(res?.data?.links);
      setPAGE({
        ...PAGE,
        current_page: res?.data?.meta.current_page,
        last_page: res?.data?.meta.last_page,
      });
    } catch (err) {
      console.log(err);
    }
  };
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
            <form onSubmit={cari} className="w-full md:w-72">
              <Input
                label="Cari by:mapel,kelas,tanggal"
                onChange={(e) => setText(e.target.value)}
                icon={
                  <button type="submit">
                    <MagnifyingGlassIcon className="h-5 w-5 cursor-pointer hover:text-blue-500 hover:scale-150" />
                  </button>
                }
              />
            </form>
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
                        className={` odd:bg-white even:bg-gray-100 `}
                      >
                        <td
                          className={
                            classes +
                            ` sticky left-0 z-10  ${
                              index % 2 === 0 ? "bg-white" : " bg-[#F5F7F8]"
                            }  `
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
                            {id_mapel?.mapel}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {id_kelas?.kelas}
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
                        <td
                          className={
                            classes + " flex justify-center items-center"
                          }
                        >
                          <Tooltip content="Buka Absen">
                            <IconButton
                              variant="text"
                              onClick={() =>
                                route(
                                  `/system/absens/${id_mapel?.id}/${idGuru}/${id_kelas?.id}/${tanggal}`
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4 text-green-300"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
                                  clipRule="evenodd"
                                />
                                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                              </svg>
                            </IconButton>
                          </Tooltip>
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
                          <Tooltip content="Edit Absen">
                            <IconButton
                              variant="text"
                              onClick={() =>
                                route(
                                  `/system/absens/update/${id_mapel?.id}/${idGuru}/${id_kelas?.id}/${tanggal}/${materi}`
                                )
                              }
                            >
                              <Edit className="h-4 w-4" />
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
