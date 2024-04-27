"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Axios } from "@/helper/axios";
import { DefaultSpinner } from "@/components/Spinner";
import { getCookie } from "@/helper/cookie";
import { AlertSuccess } from "@/components/AlertSuccess";
import { AlertFailed } from "@/components/AlertFailed";
import { useConfirmation } from "@/context/context.createabsen";

export default function UpdateKelas({ data, id_kelas }) {
  const { showConfirmation, hideConfirmation } = useConfirmation();

  const [isLoading, setLoading] = useState(false);
  const [isSuscces, setSuscces] = useState({
    is: null,
    message: "",
  });
  const [kelas, setKelas] = useState(data);

  const handlerChange = (e) => {
    if (e?.target) {
      e.preventDefault();
      setKelas({ ...kelas, [e.target?.name]: e.target?.value });
    }
  };

  async function handlePost() {
    setLoading(true);
    setSuscces({ is: null, message: "" });
    const token = getCookie("token");
    try {
      await Axios.patch("/kelas/" + id_kelas, kelas, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      hideConfirmation();
      setSuscces({ is: true, message: "" });
    } catch (err) {
      setLoading(false);
      console.log(err);
      hideConfirmation();
      setSuscces({
        is: false,
        message: err?.response?.data?.errors?.message[0],
      });
    }
  }
  console.log(kelas);
  return (
    <div className="w-full flex justify-center p-4">
      <Card className="w-full max-w-[54rem]">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 rounded-none grid place-items-center px-4 py-8 text-center"
        >
          <Typography variant="h5" color="white">
            UDPATE KELAS
          </Typography>
        </CardHeader>
        <CardBody>
          {isSuscces?.is ? (
            <AlertSuccess message={"Data berhasil diupdate."} />
          ) : isSuscces?.is === false ? (
            <AlertFailed
              message={
                isSuscces.message ? isSuscces.message : "Data gagal diudpate."
              }
            />
          ) : null}
          <form className="mt-12 flex flex-col gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Nama Kelas
              </Typography>
              <Input
                disabled={isLoading}
                defaultValue={kelas?.kelas}
                type="text"
                name="kelas"
                onChange={handlerChange}
                placeholder="Masukan nama kelas"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <Button
                disabled={isLoading}
                // onClick={() => route.back()}
                size="lg"
                color="blue"
              >
                <a href="/admin/daftar/kelas">Kembali</a>
              </Button>
              <Button
                disabled={isLoading}
                onClick={() =>
                  showConfirmation(
                    "Konfirmasi Update",
                    "Apakah Anda yakin ingin mengupdate data?",
                    () => handlePost()
                  )
                }
                size="lg"
              >
                {isLoading ? <DefaultSpinner /> : "Simpan"}
              </Button>
            </div>
            <Typography
              variant="small"
              color="gray"
              className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
            >
              <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Insert data are
              secure and encrypted
            </Typography>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
