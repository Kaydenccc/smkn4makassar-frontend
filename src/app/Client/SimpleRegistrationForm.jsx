"use client";
import SelectDefault from "@/components/Select";
import { DefaultSpinner } from "@/components/Spinner";
import { CreateAbsenContext } from "@/context/context.createabsen";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export function SimpleRegistrationForm({ kelas, mapel }) {
  const { state, dispatch } = useContext(CreateAbsenContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      return;
    setLoading(true);
    try {
      await Axios.post("/absens", state, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setLoading(false);
      router.push("/system/absens", { force: true });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(state);
  return (
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
  );
}
