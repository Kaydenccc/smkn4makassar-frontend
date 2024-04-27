"use client";
import { AlertFailed } from "@/components/AlertFailed";
import { AlertSuccess } from "@/components/AlertSuccess";
import { DefaultSpinner } from "@/components/Spinner";
import { useConfirmation } from "@/context/context.createabsen";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function PagePengaturan() {
  const { showConfirmation, hideConfirmation } = useConfirmation();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [guru, setGuru] = useState({
    email: "",
    nama: "",
    nip: "",
    no_hp: "",
  });
  const [data, setData] = useState(null);

  function handlerChange(e) {
    setGuru({
      ...guru,
      [e.target.name]: e.target.value,
    });
  }
  const postAbsen = async (e) => {
    setIsSuccess(null);
    setLoading(true);
    try {
      const res = await Axios.patch("/gurus/current", guru, {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      hideConfirmation();
      console.log(res);
      setData(res.data);
      setLoading(false);
      setIsSuccess(true);
      e.target.reset();
    } catch (err) {
      hideConfirmation();
      setLoading(false);
      setIsSuccess(false);
      console.log(err);
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    async function getGuru() {
      const res = await (
        await fetch("http://127.0.0.1:8000/api/gurus/current", {
          headers: {
            Authorization: token,
          },
        })
      ).json();
      console.log(res);
      setData(res);
    }

    getGuru();
  }, []);

  // UNTUK HAPUS DATA
  // showConfirmation(
  //   'Konfirmasi Hapus',
  //   'Apakah Anda yakin ingin menghapus data?',
  //   () => {
  //     console.log('Data dihapus');
  //     // Logika hapus data di sini
  //   }
  // );
  return (
    <div className="w-full flex justify-center items-center">
      <Card shadow={false} className="p-0 md:p-4">
        <Typography variant="h4" color="blue-gray">
          Profil Guru
        </Typography>
        <Typography color="gray" className="mt-1 text-sm">
          Masukan data absen dengan benar di bawah ini.
        </Typography>
        <form
          className="mt-8 mb-2 !w-full max-w-screen-lg sm:w-96"
          onSubmit={(e) => {
            e.preventDefault();
            showConfirmation(
              "Konfirmasi Update",
              "Apakah Anda yakin ingin mengupdate data?",
              () => postAbsen(e)
            );
          }}
        >
          <div className="mb-1 flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Nama
              </Typography>
              <Input
                type="text"
                size="lg"
                onChange={handlerChange}
                name="nama"
                defaultValue={data?.data.nama}
                placeholder="Nama"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                NIP
              </Typography>
              <Input
                type="text"
                size="lg"
                onChange={handlerChange}
                name="nip"
                defaultValue={data?.data.nip}
                placeholder="NIP:XXXXXXXXXX"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                type="text"
                size="lg"
                onChange={handlerChange}
                defaultValue={data?.data.email}
                name="email"
                placeholder="Cth:user@gmail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                No.Telp
              </Typography>
              <Input
                type="text"
                size="lg"
                onChange={handlerChange}
                name="no_hp"
                defaultValue={data?.data.no_hp}
                placeholder="08XXXXXXXXXX"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password Baru
            </Typography>
            <Input
              type="text"
              size="lg"
              onChange={handlerChange}
              name="password"
              placeholder="Masukan kata sandi baru anda"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          {isSuccess ? (
            <AlertSuccess message={"Data berhasil dirubah."} />
          ) : isSuccess === false ? (
            <AlertFailed message={"Data gagal dirubah."} />
          ) : null}
          <Button
            disabled={loading}
            type="submit"
            className="mt-6 w-full"
            fullWidth
          >
            {!loading ? "Simpan" : <DefaultSpinner text="Menyimpan..." />}
          </Button>
        </form>
      </Card>
    </div>
  );
}
