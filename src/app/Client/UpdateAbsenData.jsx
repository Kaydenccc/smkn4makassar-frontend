"use client";
import { AlertFailed } from "@/components/AlertFailed";
import { AlertSuccess } from "@/components/AlertSuccess";
import SelectUpdate from "@/components/SelectUpdate";
import { DefaultSpinner } from "@/components/Spinner";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UdpateAbsenData({
  kelas,
  mapel,
  id_mapel,
  id_guru,
  id_kelas,
  tanggal,
  materi,
}) {
  // const { state, dispatch } = useContext(CreateAbsenContext);
  const [loading, setLoading] = useState(false);
  const [isSuscces, setSuscces] = useState({
    is: null,
    message: "",
  });
  const router = useRouter();

  const [dataAbsen, setDataAbsen] = useState({
    id_kelas: Number(id_kelas),
    id_mapel: Number(id_mapel),
    tanggal: tanggal,
    materi: materi,
    id_guru: Number(id_guru),
  });

  function handlerChange(e) {
    setDataAbsen({
      ...dataAbsen,
      [e?.target?.name]: e?.target?.value,
    });
  }

  const postAbsen = async (e) => {
    e.preventDefault();
    if (
      !dataAbsen.id_guru ||
      !dataAbsen.id_kelas ||
      !dataAbsen.id_mapel ||
      !dataAbsen.tanggal
    )
      return setSuscces({ is: false, message: "data tidak boleh kosong." });
    setSuscces({ is: null, message: "" });
    setLoading(true);
    try {
      await Axios.patch("/absens/edit/" + tanggal, dataAbsen, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setLoading(false);
      setSuscces({ is: true, message: "" });
      // router.push("/system/absens");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setSuscces({
        is: false,
        message: err?.response?.data?.errors?.message[0],
      });
    }
  };

  return (
    <Card shadow={false} className="p-0 md:p-4">
      <Typography variant="h4" color="blue-gray">
        Update Absen
      </Typography>
      <Typography color="gray" className="mt-1 text-sm">
        Masukan data absen dengan benar di bawah ini.
      </Typography>
      {isSuscces?.is ? (
        <AlertSuccess message={"Data berhasil diupdate."} />
      ) : isSuscces?.is === false ? (
        <AlertFailed
          message={
            isSuscces.message ? isSuscces.message : "Data gagal diupdate."
          }
        />
      ) : null}
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={postAbsen}
      >
        <div className="mb-1 flex flex-col gap-6">
          <SelectUpdate
            handlerChange={setDataAbsen}
            name={"id_kelas"}
            value={kelas?.find((e) => e.id === dataAbsen?.id_kelas)}
            data={kelas}
            dataAbsen={dataAbsen}
            label="Pilih Kelas"
          />
          <SelectUpdate
            handlerChange={setDataAbsen}
            name={"id_mapel"}
            value={mapel?.find((e) => e.id === dataAbsen?.id_mapel)}
            dataAbsen={dataAbsen}
            data={mapel}
            label="Pilih Mapel"
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Tanggal
          </Typography>
          <Input
            type="date"
            size="lg"
            defaultValue={dataAbsen?.tanggal}
            onChange={handlerChange}
            name="tanggal"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Materi
          </Typography>
          <Input
            type="text"
            size="lg"
            defaultValue={dataAbsen?.materi}
            onChange={handlerChange}
            name="materi"
            placeholder="Ketikan materi yang diajarkan"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button disabled={loading} type="submit" className="mt-6" fullWidth>
          {!loading ? "Buat" : <DefaultSpinner text="Creating.." />}
        </Button>
      </form>
    </Card>
  );
}
