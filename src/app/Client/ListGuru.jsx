"use client";
import { AlertFailed } from "@/components/AlertFailed";
import { AlertSuccess } from "@/components/AlertSuccess";
import Edit from "@/components/Edit";
import { useConfirmation } from "@/context/context.createabsen";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const TABLE_HEAD = ["ID", "Nama Guru", "NIP", "Email", "Nomor Handphone"];
const ListGuru = ({ data }) => {
  const route = useRouter();
  const { showConfirmation, hideConfirmation } = useConfirmation();
  const [TABLE_ROWS, setTABLE_ROWS] = useState(data);
  const [isSuccess, setIsSuccess] = useState(null);

  const deleteGuru = async (idguru) => {
    setIsSuccess(null);
    try {
      const res = await Axios.delete("/gurus/" + idguru, {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      hideConfirmation();
      setTABLE_ROWS(res?.data.data);
      setIsSuccess(true);
    } catch (err) {
      hideConfirmation();
      setIsSuccess(false);
      console.log(err);
    }
  };
  return (
    <Card className="h-auto w-full flex">
      <CardHeader floated={false} shadow={false} className="rounded-none ">
        <div className="mb-6 flex md:items-center flex-col md:flex-row justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-2xl md:text-4xl"
            >
              Daftar Guru
            </Typography>
            <Typography
              color="gray"
              className="mt-1 text-sm md:text-base font-normal"
            >
              Jurusan Teknik Komputer dan Jaringan
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3 w-fit md:w-auto"
              size="sm"
              onClick={() => route.push(`/admin/upload/guru`)}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Tambah Guru
            </Button>
          </div>
        </div>
        {isSuccess ? (
          <AlertSuccess message={"Data berhasil dihapus."} />
        ) : isSuccess === false ? (
          <AlertFailed message={"Data gagal dihapus."} />
        ) : null}
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
              <th className="border-y text-center border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.length > 0 &&
              TABLE_ROWS?.map(({ id, nama, nip, email, no_hp }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index} className=" even:bg-blue-gray-50/50">
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {id}
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
                        {nama}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {nip}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {no_hp}
                      </Typography>
                    </td>
                    <td className={classes + " text-center"}>
                      <Tooltip content="Edit">
                        <IconButton
                          variant="text"
                          onClick={() => route.push("/admin/update/guru/" + id)}
                        >
                          <Edit className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Hapus siswa">
                        <IconButton
                          variant="text"
                          onClick={() =>
                            showConfirmation(
                              "Konfirmasi Hapus",
                              "Apakah Anda yakin ingin menghapus data?",
                              () => deleteGuru(id)
                            )
                          }
                        >
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default ListGuru;
