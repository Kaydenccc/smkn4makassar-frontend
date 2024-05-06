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

export default function UpdateAdmin({ data, id_admin }) {
  const { showConfirmation, hideConfirmation } = useConfirmation();

  const [isLoading, setLoading] = useState(false);
  const [isSuscces, setSuscces] = useState({
    is: null,
    message: "",
  });
  const [admin, setAdmin] = useState({
    username: data?.username,
    password: data?.password,
  });

  const handlerChange = (e) => {
    if (e?.target) {
      e.preventDefault();
      setAdmin({ ...admin, [e.target?.name]: e.target?.value });
    }
  };

  async function handleUpdate() {
    setLoading(true);
    setSuscces({ is: null, message: "" });
    const token = getCookie("token");
    try {
      await Axios.patch("/admin/" + id_admin, admin, {
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
      console.log(err);
      setSuscces({
        is: false,
        message: err?.response?.data?.errors?.message[0],
      });
    }
  }
  console.log(admin);
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
            UPDATE ADMIN
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
                Username
              </Typography>
              <Input
                disabled={isLoading}
                defaultValue={admin?.username}
                type="text"
                name="username"
                onChange={handlerChange}
                placeholder="Masukan username"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div className="my-0">
              <div className="my-1 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Kata Sandi Baru
                  </Typography>
                  <Input
                    disabled={isLoading}
                    defaultValue={admin?.password}
                    name="password"
                    type="password"
                    onChange={handlerChange}
                    placeholder="Masukan kata sandi baru"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4">
              <a href="/admin/daftar/admin">
                <Button disabled={isLoading} size="lg" color="blue">
                  Kembali
                </Button>
              </a>
              <Button
                disabled={isLoading}
                onClick={() =>
                  showConfirmation(
                    "Konfirmasi Update",
                    "Apakah Anda yakin ingin mengupdate data?",
                    () => handleUpdate()
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
