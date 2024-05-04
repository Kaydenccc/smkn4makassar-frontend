"use client";
import Edit from "@/components/Edit";
import { DefaultSpinner } from "@/components/Spinner";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import { convertTime, createTime } from "@/helper/time";
import { FilmIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TABLE_HEAD = [
  "No.",
  "NIS",
  "Nama Siswa",
  "Jenis Kelamin",
  "Status",
  "Jam",
  "Keterangan",
  "",
];

function TableWithStripedRows({
  TABLE_ROWS,
  kelas,
  mapel,
  tanggal,
  materi,
  id_mapel,
  id_guru,
  id_kelas,
}) {
  const router = useRouter();
  const [data, setdata] = useState(TABLE_ROWS);
  const [loading, setLoding] = useState(false);
  const [open, setOpen] = useState(false);
  const [openPerSiswa, setOpenPersiswa] = useState(false);
  const [newData, setNewData] = useState([]);

  const [idSiswa, setIdSiswa] = useState(null);
  const [updateSiswa, setUpdateSiswa] = useState(null);
  const [text, setText] = useState("");

  const handlerSetUpdate = (event, id, identity) => {
    if (identity === "keterangan") event.preventDefault();
    const isExist = newData.find((x) => x?.id == id);
    if (!isExist) {
      setNewData([
        ...newData,
        data.find((e) => {
          if (e.id === id) {
            if (identity === "keterangan") e[identity] = event.target.value;
            if (identity === "status") {
              e[identity] = event;
              e["jam"] = createTime();
            }
            return e;
          }
        }),
      ]);
    } else {
      console.log("testt2");
      setNewData(
        newData.map((e) => {
          if (e.id === id) {
            if (identity === "keterangan") e[identity] = event.target.value;
            if (identity === "status") {
              e[identity] = event;
              e["jam"] = createTime();
            }
          }
          return e;
        })
      );
    }
  };

  const handlerPut = async () => {
    setLoding(true);
    const token = getCookie("token");
    try {
      await Axios.put(
        "/absen/array",
        {
          absens: newData,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      router.refresh();
      setLoding(false);
      setNewData([]);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handlerPutPerSiswa = async (
    id_siswa,
    id_mapel,
    id_guru,
    id_kelas,
    tgl
  ) => {
    setLoding(true);
    const token = getCookie("token");
    try {
      await Axios.patch(
        `/absens/${id_siswa}/${id_mapel}/${id_guru}/${id_kelas}/${tgl}`,
        updateSiswa,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      setLoding(false);
      setUpdateSiswa(null);
      setOpenPersiswa(false);
    } catch (err) {
      setLoding(false);
      console.log(err);
    }
  };
  const handlerCencel = () => {
    setdata(data);
    setNewData([]);
    setOpen(false);
    setOpenPersiswa(false);
  };

  // update persiswa
  const updatePerSiswa = (event, id, identity) => {
    if (identity === "keterangan") event.preventDefault();
    const isExist = data.find((x) => x?.id == id);
    if (isExist.id === id) {
      if (identity === "keterangan") isExist[identity] = event.target.value;
      if (identity === "status") {
        isExist[identity] = event;
        isExist["jam"] = createTime();
      }
      setUpdateSiswa({
        jam: isExist["jam"],
        keterangan: isExist["keterangan"],
        status: isExist["status"],
      });
    }
  };

  function openEdit(idSiswa) {
    setIdSiswa(idSiswa);
    setOpenPersiswa(true);
  }

  const cari = async (e) => {
    e.preventDefault();
    try {
      const res = await Axios.get(
        `/search/siswa?mapel=${id_mapel}&guru=${id_guru}&kelas=${id_kelas}&tgl=${tanggal}&cari=${text}`,
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      setdata(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card className="flex-1  flex  mb-4 w-full overflow-hidden ">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none min-h-[105px] !z-0 relative"
      >
        <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="">
            <Typography
              variant="h5"
              color="blue-gray"
              className="text-2xl md:text-4xl"
            >
              Data Absensi Siswa
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal text-sm md:text-base"
            >
              See information about the absen.
            </Typography>
            <div className="flex justify-center gap-3 text-xs md:text-base">
              <h2>
                <span className="font-bold">Kelas : </span>
                {""}
                {kelas}
              </h2>
              <h2>
                <span className="font-bold">Mapel : </span>
                {""}
                {mapel}
              </h2>
              <h2>
                <span className="font-bold">Tanggal : </span>
                {""}
                {tanggal}
              </h2>
              <h2>
                <span className="font-bold">Materi : </span>
                {""}
                {materi}
              </h2>
            </div>
          </div>
          <div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              {open ? (
                <>
                  <Button
                    disabled={loading}
                    color="blue"
                    onClick={handlerPut}
                    size="sm"
                  >
                    {loading ? <DefaultSpinner /> : "Save"}
                  </Button>
                  <Button color="red" onClick={handlerCencel} size="sm">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button color="blue" onClick={() => setOpen(true)} size="sm">
                    Edit
                  </Button>
                </>
              )}
              <Button
                className="flex items-center gap-3"
                size="sm"
                onClick={() =>
                  router.push(
                    `/scanner/${id_mapel}/${id_guru}/${id_kelas}/${tanggal}`
                  )
                }
              >
                <FilmIcon strokeWidth={2} className="h-4 w-4" /> Scann absen
              </Button>
            </div>
            <div className="flex mt-6 min-h-fit w-full flex-col items-center justify-end md:flex-row">
              <form onSubmit={cari} className="w-full md:w-72">
                <Input
                  label="Cari by:nama,nis"
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
      </CardHeader>
      <CardBody className="!h-fit overflow-auto relative pl-0 ml-6">
        <table className="w-full h-fit min-w-max overflow-auto table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className={`border-y border-blue-gray-100 bg-[#F5F7F8] p-4 ${
                    index === 2 ? "sticky left-0 bg-[#F5F7F8] z-10" : ""
                  }`}
                  style={{
                    position: index === 2 ? "sticky" : "relative",
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
            {data?.map((e, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? `p-4`
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr
                  key={index}
                  className="even:bg-blue-gray-50/50 cursor-pointer"
                >
                  <td
                    className="p-4"
                    onClick={() =>
                      router.push(
                        `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                      )
                    }
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {index + 1}
                    </Typography>
                  </td>
                  <td
                    className="p-4"
                    onClick={() =>
                      router.push(
                        `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                      )
                    }
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {e?.id_siswa?.nis}
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
                    onClick={() =>
                      router.push(
                        `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                      )
                    }
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {e?.id_siswa?.nama}
                    </Typography>
                  </td>
                  <td
                    className="p-4"
                    onClick={() =>
                      router.push(
                        `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                      )
                    }
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {e.id_siswa?.jenis_kelamin}
                    </Typography>
                  </td>
                  <td className="p-4">
                    {open ? (
                      <Select
                        className=" relative"
                        disabled={loading}
                        name="status"
                        onChange={(event) =>
                          handlerSetUpdate(event, e.id, "status")
                        }
                        label={e.status ? e.status : "-"}
                        defaultValue={e.status ? e.status : "-"}
                      >
                        <Option value="Alpa">Alpa</Option>
                        <Option value="Hadir">Hadir</Option>
                        <Option value="Sakit">Sakit</Option>
                        <Option value="Izin">Izin</Option>
                      </Select>
                    ) : !openPerSiswa ? (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        onClick={() =>
                          router.push(
                            `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                          )
                        }
                      >
                        {e?.status ? e?.status : "-"}
                      </Typography>
                    ) : (
                      openPerSiswa &&
                      e?.id !== idSiswa &&
                      e?.status && (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          onClick={() =>
                            router.push(
                              `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                            )
                          }
                        >
                          {e?.status}
                        </Typography>
                      )
                    )}
                    {openPerSiswa && e?.id === idSiswa && (
                      <Select
                        disabled={loading}
                        name="status"
                        onChange={(event) =>
                          updatePerSiswa(event, e?.id, "status")
                        }
                        label={e?.status ? e?.status : "-"}
                        defaultValue={e?.status ? e?.status : "-"}
                      >
                        <Option value="Alpa">Alpa</Option>
                        <Option value="Hadir">Hadir</Option>
                        <Option value="Sakit">Sakit</Option>
                        <Option value="Izin">Izin</Option>
                      </Select>
                    )}
                  </td>
                  <td
                    className="p-4"
                    onClick={() =>
                      router.push(
                        `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                      )
                    }
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {e?.jam ? convertTime(e?.jam) : "-"}
                    </Typography>
                  </td>
                  <td className="p-4">
                    {open ? (
                      <Input
                        defaultValue={e?.keterangan ? e?.keterangan : "-"}
                        maxLength={40}
                        disabled={loading}
                        name="keterangan"
                        label="Keterangan"
                        type="text"
                        onChange={(event) =>
                          handlerSetUpdate(event, e?.id, "keterangan")
                        }
                      />
                    ) : !openPerSiswa ? (
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                        onClick={() =>
                          router.push(
                            `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                          )
                        }
                      >
                        {e?.keterangan ? e?.keterangan : "-"}
                      </Typography>
                    ) : (
                      openPerSiswa &&
                      e?.id !== idSiswa &&
                      e?.keterangan && (
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          onClick={() =>
                            router.push(
                              `/system/statistik/${id_mapel}/${e.id_siswa?.id}/${id_kelas}`
                            )
                          }
                        >
                          {e?.keterangan}
                        </Typography>
                      )
                    )}
                    {openPerSiswa && e?.id === idSiswa && (
                      <Input
                        defaultValue={e?.keterangan ? e?.keterangan : "-"}
                        maxLength={40}
                        disabled={loading}
                        name="keterangan"
                        label="Keterangan"
                        type="text"
                        onChange={(event) =>
                          updatePerSiswa(event, e?.id, "keterangan")
                        }
                      />
                    )}
                  </td>
                  {!open &&
                    (openPerSiswa && e?.id === idSiswa ? (
                      <td className="p-4">
                        {loading ? (
                          <DefaultSpinner />
                        ) : (
                          <>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className=" cursor-pointer text-green-400 hover:text-green-100 font-bold rounded-md border-none hover:bg-green-500 transition-all duration-50 w-fit"
                              onClick={() =>
                                handlerPutPerSiswa(
                                  e?.id_siswa.id,
                                  id_mapel,
                                  id_guru,
                                  id_kelas,
                                  tanggal
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className=" cursor-pointer text-red-400 hover:text-red-100 font-bold rounded-md border-none hover:bg-red-500 transition-all duration-50 w-fit"
                              onClick={() => setOpenPersiswa(false)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </Typography>
                          </>
                        )}
                      </td>
                    ) : (
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          onClick={() => openEdit(e?.id)}
                        >
                          <Edit />
                        </Typography>
                      </td>
                    ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default TableWithStripedRows;
