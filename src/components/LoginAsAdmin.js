import React, { useState } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import { useRouter } from "next/navigation";
import { Axios } from "@/helper/axios";
import { setCookie } from "@/helper/cookie";
import { AlertFailed } from "./AlertFailed";

export function LoginAsAdmin() {
  const navigate = useRouter();
  const [dataLogin, setDataLogin] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handlerChange(e) {
    e.preventDefault();

    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  }

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await Axios.post("/admin/login", dataLogin);
      setCookie("role", "111", 1 / 4);
      setCookie("token", data?.data?.data.token, 1 / 4);
      navigate.push("/admin/daftar/guru");
    } catch (err) {
      if (err) {
        console.log(err);
        setError(err.response?.data?.errors?.message[0]);
      }
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <form onSubmit={login} className="mt-8 flex flex-col gap-4">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-bold text-start"
          >
            Username
          </Typography>
          <Input
            type="text"
            onChange={handlerChange}
            name="username"
            placeholder="Masukan username"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <div className="my-3">
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-bold text-start"
          >
            Password
          </Typography>
          <Input
            name="password"
            type="password"
            onChange={handlerChange}
            placeholder="Masukan kata sandi"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        {error && (
          <AlertFailed message={error} className="text-red-400 text-xs" />
        )}
        <Button
          size="lg"
          type="submit"
          disabled={loading}
          className={`${loading && "cursor-not-allowed"}`}
        >
          {loading ? "Loading..." : "Masuk"}
        </Button>
        <Typography
          variant="small"
          color="gray"
          className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
        >
          <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Login are secure and
          encrypted
        </Typography>
      </form>
    </React.Fragment>
  );
}
