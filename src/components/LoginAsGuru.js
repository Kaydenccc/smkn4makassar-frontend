import React, { useState } from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";

import { useRouter } from "next/navigation";
import { Axios } from "@/helper/axios";
import { setCookie } from "@/helper/cookie";
import { AlertFailed } from "./AlertFailed";

export function LoginAsGuru() {
  const navigate = useRouter();
  const [dataLogin, setDataLogin] = useState({
    nip: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function handlerChange(e) {
    e.preventDefault();

    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  }

  async function login() {
    setLoading(true);
    setError(null);
    try {
      const data = await Axios.post("/gurus/login", dataLogin);
      setCookie("token", data?.data?.data.token, 1 / 4);
      setCookie("unique", data?.data?.data.id, 1 / 4);
      setCookie("role", "0001", 1 / 4);
      navigate.push("/system");
    } catch (err) {
      if (err) {
        setError(err.response?.data?.errors?.message[0]);
      }
      setLoading(false);
    }
  }

  return (
    <React.Fragment>
      <form className="mt-8 flex flex-col gap-4">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 font-bold text-start"
          >
            NIP
          </Typography>
          <Input
            onChange={handlerChange}
            type="text"
            name="nip"
            placeholder="NIP:XXXXXXXXXXXX"
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
            onChange={handlerChange}
            placeholder="Masukan kata sandi"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        {error && <AlertFailed message={error} />}
        <Button
          size="lg"
          onClick={login}
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
