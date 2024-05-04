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

export default function PostAdmin() {
  const [isLoading, setLoading] = useState(false);
  const [isSuscces, setSuscces] = useState({
    is: null,
    message: "",
  });
  const [admin, setAdmin] = useState({
    username: "",
    password: "",
  });

  const handlerChange = (e) => {
    if (e?.target) {
      e.preventDefault();
      setAdmin({ ...admin, [e.target?.name]: e.target?.value });
    }
  };

  async function handlePost() {
    setLoading(true);
    setSuscces({ is: null, message: "" });
    const token = getCookie("token");
    try {
      await Axios.post("/admin", admin, {
        headers: {
          Authorization: token,
        },
      });
      setLoading(false);
      setSuscces({ is: true, message: "" });
      setAdmin({
        username: "",
        password: "",
      });
    } catch (err) {
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
            TAMBAH ADMIN
          </Typography>
        </CardHeader>
        <CardBody>
          {isSuscces?.is ? (
            <AlertSuccess message={"Data berhasil ditambahkan."} />
          ) : isSuscces?.is === false ? (
            <AlertFailed message={isSuscces.message} />
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
                value={admin?.username}
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
                    Kata Sandi
                  </Typography>
                  <Input
                    disabled={isLoading}
                    value={admin?.password}
                    name="password"
                    onChange={handlerChange}
                    type="password"
                    placeholder="Masukan kata sandi"
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
                <Button
                  disabled={isLoading}
                  // onClick={() => route.back()}
                  size="lg"
                  color="blue"
                >
                  Kembali
                </Button>
              </a>
              <Button disabled={isLoading} onClick={handlePost} size="lg">
                {isLoading ? <DefaultSpinner /> : "Tambah Admin"}
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
