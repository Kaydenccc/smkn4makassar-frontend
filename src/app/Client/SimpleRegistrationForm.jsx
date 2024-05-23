"use client";
import SelectDefault from "@/components/Select";
import { DefaultSpinner } from "@/components/Spinner";
import { CreateAbsenContext } from "@/context/context.createabsen";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import {
  Card,
  Input,
  Alert,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export function SimpleRegistrationForm({ kelas, mapel }) {
  const { state, dispatch } = useContext(CreateAbsenContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  function handlerChange(e) {
    return dispatch({
      type: "SET",
      payload: {
        ...state,
        id_guru: Number(getCookie("unique")),
        [e?.target?.name]: e?.target?.value,
      },
    });
  }
  const postAbsen = async (e) => {
    e.preventDefault();
    if (!state.id_guru || !state.id_kelas || !state.id_mapel || !state.tanggal)
      return (
        setOpen(true),
        setMessage("Pastikan semua kolom input diisi dengan benar.")
      );
    setLoading(true);
    try {
      await Axios.post("/absens", state, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setLoading(false);
      window.location.href = "/system/absens";
    } catch (err) {
      console.log(err);
      setOpen(true);
      setMessage(err?.response?.data?.errors?.message[0]);
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch({
      type: "SET",
      payload: {
        ...state,
        tanggal: today,
      },
    });
  }, []);

  return (
    <>
      {open && (
        <Alert
          variant="gradient"
          open={open}
          color="amber"
          icon={<Icon />}
          action={
            <Button
              variant="text"
              color="black"
              size="sm"
              className="!absolute top-3 right-3"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          }
        >
          {message}
        </Alert>
      )}
      <Card shadow={false} className="p-0 md:p-4">
        <Typography variant="h4" color="blue-gray">
          Buat Absen Baru
        </Typography>
        <Typography color="gray" className="mt-1 text-sm">
          Masukan data absen dengan benar di bawah ini.
        </Typography>

        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={postAbsen}
        >
          <div className="mb-1 flex flex-col gap-6">
            <SelectDefault name={"id_kelas"} data={kelas} label="Pilih Kelas" />
            <SelectDefault name={"id_mapel"} data={mapel} label="Pilih Mapel" />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Tanggal
            </Typography>
            <Input
              type="date"
              size="lg"
              onChange={handlerChange}
              defaultValue={today}
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
    </>
  );
}
