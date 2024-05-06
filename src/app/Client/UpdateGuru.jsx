"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import { CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { Axios } from "@/helper/axios";
import { DefaultSpinner } from "@/components/Spinner";
import { getCookie } from "@/helper/cookie";
import UploadPage from "@/components/Upload";
import { useRouter } from "next/navigation";
import { AlertSuccess } from "@/components/AlertSuccess";
import { AlertFailed } from "@/components/AlertFailed";
import { useConfirmation } from "@/context/context.createabsen";

export default function UpdateGuru({ data, id_guru }) {
  const { showConfirmation, hideConfirmation } = useConfirmation();

  const [type, setType] = useState("card");
  const [isLoading, setLoading] = useState(false);
  const [isSuscces, setSuscces] = useState({
    is: null,
    message: "",
  });

  const [guru, setGuru] = useState(data);

  const handlerChange = (e) => {
    if (e?.target) {
      e.preventDefault();
      setGuru({ ...guru, [e.target?.name]: e.target?.value });
    }
  };

  async function handlePost() {
    setLoading(true);
    setSuscces({ is: null, message: "" });
    const token = getCookie("token");
    try {
      await Axios.patch("/gurus/" + id_guru, guru, {
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
            UPDATE GURU
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0 ">
              <Tab value="card" onClick={() => setType("card")}>
                Input Data
              </Tab>
              <Tab value="paypal" onClick={() => setType("paypal")}>
                Upload File
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden"
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              <TabPanel value="card" className="p-0">
                {isSuscces?.is ? (
                  <AlertSuccess message={"Data berhasil diupdate."} />
                ) : isSuscces?.is === false ? (
                  <AlertFailed
                    message={
                      isSuscces.message
                        ? isSuscces.message
                        : "Data gagal diupdate."
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
                      Nama
                    </Typography>
                    <Input
                      disabled={isLoading}
                      defaultValue={guru?.nama}
                      type="text"
                      name="nama"
                      onChange={handlerChange}
                      placeholder="Nama siswa"
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
                          NIP
                        </Typography>
                        <Input
                          disabled={isLoading}
                          defaultValue={guru?.nip}
                          name="nip"
                          onChange={handlerChange}
                          type="text"
                          placeholder="NIP:XXXXXXXXXX"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="my-0">
                    <div className="my-1 flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Email
                        </Typography>
                        <Input
                          disabled={isLoading}
                          defaultValue={guru?.email}
                          name="email"
                          onChange={handlerChange}
                          placeholder="user@email.com"
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                      <div className="w-full">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="mb-2 font-medium"
                        >
                          Kontak Guru
                        </Typography>
                        <Input
                          disabled={isLoading}
                          defaultValue={guru?.no_hp}
                          name="no_hp"
                          onChange={handlerChange}
                          placeholder="+62XXXXXXXXX"
                          maxLength={12}
                          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                        />
                      </div>
                    </div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium mt-5"
                    >
                      Kata Sandi Baru
                    </Typography>
                    <Input
                      disabled={isLoading}
                      defaultValue={guru?.password}
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
                  <div className="flex justify-center items-center gap-4">
                    <a href="/admin/daftar/guru">
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
                          () => handlePost()
                        )
                      }
                      size="lg"
                    >
                      {isLoading ? <DefaultSpinner /> : "simpan"}
                    </Button>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Insert data
                    are secure and encrypted
                  </Typography>
                </form>
              </TabPanel>
              <TabPanel value="paypal" className="p-0">
                <UploadPage />
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
