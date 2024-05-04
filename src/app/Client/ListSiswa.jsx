"use client";
import { AlertFailed } from "@/components/AlertFailed";
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
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
const TABLE_HEAD = [
  "ID",
  "Nama Siswa",
  "NISN",
  "Kelas",
  "Jenis Kelamin",
  "Kontak",
  "Kontak Orang Tua",
  "Alamat",
  "",
];
const ListSiswa = ({ data, link, current_page, last_page }) => {
  const { showConfirmation, hideConfirmation } = useConfirmation();

  const [TABLE_ROWS, setTABLE_ROWS] = useState(data);
  const navigate = useRouter();
  const [LINKS, setLINKS] = useState(link);
  const [text, setText] = useState("");

  const [PAGE, setPAGE] = useState({
    current_page,
    last_page,
  });
  const [isSuccess, setIsSuccess] = useState(null);

  async function handlerDataAbsen(api) {
    const token = getCookie("token");
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
    navigate.push(rute);
  };

  const deleteSiswa = async (idsiswa) => {
    setIsSuccess(null);
    try {
      const res = await Axios.delete("/siswa/" + idsiswa, {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      hideConfirmation();
      setTABLE_ROWS(res.data.data);
      setLINKS(res.data.links);
      setPAGE({
        ...PAGE,
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
      });
      setIsSuccess(true);
    } catch (err) {
      hideConfirmation();
      setIsSuccess(false);
      console.log(err);
    }
  };

  const cari = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.get(`/search/siswa/admin?cari=${text}`, {
        headers: {
          Authorization: getCookie("token"),
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
  };
  return (
    <Card className="h-screen w-full flex">
      <CardHeader floated={false} shadow={false} className="rounded-none ">
        <div className="mb-6 flex md:items-center flex-col md:flex-row justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-2xl md:text-4xl"
            >
              Daftar Siswa
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-sm md:text-base "
            >
              Jurusan Teknik Komputer dan Jaringan
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3 w-fit md:w-auto"
              size="sm"
              onClick={() => route(`/admin/upload/siswa`)}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Tambah Siswa
            </Button>
            <div className="flex min-h-fit flex-col items-center justify-between gap-4  md:flex-row">
              <form onSubmit={cari} className="w-full md:w-72">
                <Input
                  label="Cari by:nama,nis,kelas,kontak"
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
              {TABLE_HEAD?.map((head, index) => (
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
            {TABLE_ROWS?.length > 0 &&
              TABLE_ROWS?.map(
                (
                  {
                    id,
                    nama,
                    id_kelas,
                    nis,
                    jenis_kelamin,
                    kontak,
                    kontak_orang_tua,
                    alamat,
                  },
                  index
                ) => {
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
                          {nis}
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
                          {jenis_kelamin}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {kontak}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {kontak_orang_tua}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {alamat}
                        </Typography>
                      </td>
                      <td
                        className={classes}
                        // onClick={() => route("/admin/update/siswa/" + id)}
                      >
                        <Tooltip content="Edit">
                          <IconButton
                            variant="text"
                            onClick={() => route("/admin/update/siswa/" + id)}
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
                                () => deleteSiswa(id)
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
};

export default ListSiswa;
