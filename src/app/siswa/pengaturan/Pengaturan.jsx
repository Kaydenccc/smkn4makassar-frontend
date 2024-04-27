"use client";
import { AlertFailed } from "@/components/AlertFailed";
import { AlertSuccess } from "@/components/AlertSuccess";
import { DefaultSpinner } from "@/components/Spinner";
import StudentCard from "@/components/StudenCard";
import { useConfirmation } from "@/context/context.createabsen";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import {
  Card,
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";

export default function Pengaturan({ kelas, datasiswa }) {
  const { showConfirmation, hideConfirmation } = useConfirmation();

  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuscces] = useState({
    is: null,
    message: "",
  });
  const [data, setData] = useState({ ...datasiswa, password: "" });

  const handlerChange = (e) => {
    console.log(e);
    if (e?.target) {
      e.preventDefault();
      setData({
        ...data,
        [e.target?.name]: e.target?.value,
      });
    } else {
      if (e === "L" || e === "P") {
        setData({ ...data, jenis_kelamin: e });
      } else {
        setData({ ...data, id_kelas: Number(e) });
      }
    }
  };

  async function handlePost() {
    setLoading(true);
    setSuscces({ is: null, message: "" });
    const token = getCookie("token");
    try {
      await Axios.patch("/siswa/" + datasiswa?.id, data, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      hideConfirmation();
      setSuscces({ is: true, message: "" });
    } catch (err) {
      setLoading(false);
      hideConfirmation();
      console.log(err);
      setSuscces({
        is: false,
        message: err?.response?.data?.errors?.message[0],
      });
    }
  }

  console.log(data);
  console.log(kelas);
  return (
    <div className="w-full flex justify-center items-center overflow-hidden">
      <Card
        shadow={false}
        className="w-full sm:w-auto  p-0 md:p-4 flex flex-col md:flex-row gap-0 md:gap-8 "
      >
        <div>
          <Typography variant="h4" color="blue-gray">
            Profil Siswa
          </Typography>
          <Typography color="gray" className="mt-1 text-sm mb-2">
            Input data yang ingin diubah pada kolom yang tersedia.
          </Typography>
          <div className="flex-grow w-full overflow-auto">
            <StudentCard student={data} />
          </div>
        </div>
        <form
          className="mt-8 mb-2 !w-full max-w-screen-lg sm:w-96"
          onSubmit={(e) => {
            e.preventDefault();
            showConfirmation(
              "Konfirmasi Update",
              "Apakah Anda yakin ingin mengupdate data?",
              () => handlePost()
            );
          }}
        >
          <div className="mb-1 w-full flex flex-col md:flex-row gap-6">
            <div className="flex w-full flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Nama
              </Typography>
              <Input
                type="text"
                size="lg"
                onChange={handlerChange}
                name="nama"
                defaultValue={data?.nama}
                placeholder="Nama"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                NISN
              </Typography>
              <Input
                type="text"
                size="lg"
                onChange={handlerChange}
                name="nis"
                defaultValue={data?.nis}
                placeholder="NISN:XXXXXXXXXX"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Pilih Jenis Kelamin
                </Typography>
                <Select
                  disabled={loading}
                  value={`${data?.jenis_kelamin}`}
                  label="Jenis Kelamin"
                  onChange={handlerChange}
                  name="jenis_kelamin"
                >
                  <Option value={`L`}>Laki-Laki</Option>
                  <Option value={`P`}>Perempuan</Option>
                </Select>
              </div>
            </div>
            <div className="flex w-full flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Kontak
              </Typography>
              <Input
                type="text"
                size="lg"
                onChange={handlerChange}
                defaultValue={data?.kontak}
                name="kontak"
                placeholder="08XXXXXXXXXX"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Kontak Orang Tua
              </Typography>
              <Input
                type="text"
                size="lg"
                onChange={handlerChange}
                name="kontak_orang_tua"
                defaultValue={data?.kontak_orang_tua}
                placeholder="08XXXXXXXXXX"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="w-full">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 font-medium"
                >
                  Pilih Kelas
                </Typography>
                <Select
                  disabled={loading}
                  value={`${data?.id_kelas}`}
                  // defaultValue={`${datasiswa?.id_kelas}`}
                  label="Kelas"
                  onChange={handlerChange}
                  name="id_kelas"
                >
                  {kelas?.length > 0 ? (
                    kelas?.map((kelas) => (
                      <Option key={kelas?.id} value={`${kelas?.id}`}>
                        {kelas?.kelas}
                      </Option>
                    ))
                  ) : (
                    <span>Data tidak ada!</span>
                  )}
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Alamat
            </Typography>
            <Input
              type="text"
              size="lg"
              onChange={handlerChange}
              defaultValue={data?.alamat}
              name="alamat"
              maxLength={40}
              placeholder="Alamat anda"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
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
          {isSuccess.is ? (
            <AlertSuccess message={"Data berhasil dirubah."} />
          ) : isSuccess.is === false ? (
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
