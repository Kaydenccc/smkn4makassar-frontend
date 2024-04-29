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

  console.log(TABLE_ROWS);
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
            <div className="w-full md:w-72">
              <Input
                label="Cari"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
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
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-blue-gray-50 odd:bg-white even:bg-gray-100"
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
                            `/download/${id_mapel?.id}/${id_guru?.id}/${id_kelas?.id}`
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
                            `/download/${id_mapel?.id}/${id_guru?.id}/${id_kelas?.id}`
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
                            `/download/${id_mapel?.id}/${id_guru?.id}/${id_kelas?.id}`
                          )
                        }
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          onClick={() =>
                            route(
                              `/download/${id_mapel?.id}/${id_guru?.id}/${id_kelas?.id}`
                            )
                          }
                        >
                          {tanggal}
                        </Typography>
                      </td>
                      <td className={classes}>
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
