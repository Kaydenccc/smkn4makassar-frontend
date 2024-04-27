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
import { useRouter } from "next/navigation";
import { AlertSuccess } from "@/components/AlertSuccess";
import { AlertFailed } from "@/components/AlertFailed";
import { useConfirmation } from "@/context/context.createabsen";

export default function UpdateMapel({ data, id_mapel }) {
  const { showConfirmation, hideConfirmation } = useConfirmation();

  const [isLoading, setLoading] = useState(false);
  const [isSuscces, setSuscces] = useState({
    is: null,
    message: "",
  });
  const [mapel, setmapel] = useState({
    mapel: data?.mapel,
  });

  const handlerChange = (e) => {
    if (e?.target) {
      e.preventDefault();
      setmapel({ ...mapel, [e.target?.name]: e.target?.value });
    }
  };

  async function handlePost() {
    setLoading(true);
    setSuscces({ is: null, message: "" });
    const token = getCookie("token");
    try {
      await Axios.patch("/mapels/" + id_mapel, mapel, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      hideConfirmation();
      setSuscces({ is: true, message: "" });
    } catch (err) {
      hideConfirmation();
      setLoading(false);
      setSuscces({
        is: false,
        message: err?.response?.data?.errors?.message[0],
      });
      console.log(err);
    }
  }
  console.log(mapel);
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
            UPDATE MAPEL
          </Typography>
        </CardHeader>
        <CardBody>
          {isSuscces?.is ? (
            <AlertSuccess message={"Data berhasil diupdate."} />
          ) : isSuscces?.is === false ? (
            <AlertFailed
              message={
                isSuscces.message ? isSuscces.message : "Data gagal diupdate."
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
                Nama Mata Pelajaran
              </Typography>
              <Input
                disabled={isLoading}
                value={mapel?.mapel}
                type="text"
                name="mapel"
                onChange={handlerChange}
                placeholder="Masukan nama mata pelajaran"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="flex justify-center items-center gap-4">
              <Button disabled={isLoading} size="lg" color="blue">
                <a href="/admin/daftar/mapel">Kembali</a>
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
