"use client";
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
import { useState } from "react";

const TABLE_HEAD = ["Mata Pelajaran", "Kelas", "Tanggal", "Action"];

export function TabelLaporan({ data, guru, link, current_page, last_page }) {
  const [TABLE_ROWS, setTABLE_ROWS] = useState(data);
  const { showConfirmation, hideConfirmation } = useConfirmation();
  const [text, setText] = useState("");

  const navigasi = useRouter();
  // const idGuru = getCookie("unique");
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

  const deleteAbsen = async (id, id_mapel, id_kelas) => {
    const token = getCookie("token");
    console.log(token);
    console.log(id);
    try {
      const res = await Axios.delete(
        "/absens/guru/" +
          id +
          "/" +
          guru?.id +
          "/" +
          id_mapel +
          "/" +
          id_kelas +
          "/laporan",
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
    } catch (err) {
      hideConfirmation();
      console.log(err);
    }
  };

  const cari = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.get("/search/absen/rekap?cari=" + text, {
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
              Daftar Rekap Absensi
            </Typography>
            <Typography
              color="gray"
              className="mt-1 text-sm md:text-base font-normal"
            >
              Pilih salah satu mata pelajaran dibawah untuk melihat rekap
              absensi
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col-reverse gap-2 sm:flex-row w-full md:w-auto">
            <form onSubmit={cari} className="w-full md:w-72">
              <Input
                label="Cari by:mapel,kelas"
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
      <CardBody className="overflow-auto  flex-1 h-fit pt-0 px-2 md:px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
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
                (
                  { id, id_mapel, id_kelas, id_guru, materi, tanggal },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index} className=" odd:bg-white even:bg-gray-100">
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
                          {tanggal}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Rekapitulasi Data Absen">
                          <IconButton
                            variant="text"
                            onClick={() =>
                              route(
                                `/download/${id_mapel?.id}/${id_guru?.id}/${id_kelas?.id}`
                              )
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4 text-green-500"
                            >
                              <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                              <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                            </svg>
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete Absen">
                          <IconButton
                            variant="text"
                            onClick={() =>
                              showConfirmation(
                                "Konfirmasi Hapus",
                                "Apakah Anda yakin ingin menghapus data?",
                                () =>
                                  deleteAbsen(id, id_mapel?.id, id_kelas?.id)
                              )
                            }
                          >
                            <TrashIcon className="h-4 w-4" />
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
