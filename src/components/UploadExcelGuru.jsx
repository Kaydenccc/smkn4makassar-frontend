// pages/upload.jsx

import { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { DefaultSpinner } from "./Spinner";
import { Axios } from "@/helper/axios";
import { getCookie } from "@/helper/cookie";
import { AlertSuccess } from "./AlertSuccess";
import { AlertFailed } from "./AlertFailed";

export default function UploadPageGuru() {
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    setLoading(true);
    setIsSuccess(null);
    const token = getCookie("token");
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await Axios.post("/upload-excel/guru", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });
        console.log(response);
        setLoading(false);
        setIsSuccess(true);
        console.log("File berhasil diunggah:", response.data);
      } catch (error) {
        setLoading(false);
        setIsSuccess(false);
        console.log(error);
        console.error("Gagal mengunggah file:", error.message);
      }
    }
  };

  return (
    <form className="flex mt-12 flex-col gap-4">
      {isSuccess === false ? (
        <AlertFailed message={"Gagal menambahkan data."} />
      ) : (
        isSuccess === true && (
          <AlertSuccess message={"Data berhasil ditambahkan."} />
        )
      )}
      <div className="mb-3">
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="mb-4 font-medium"
        >
          Upload File Excel (.xlsx)
        </Typography>

        <input
          onChange={handleFileChange}
          className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          id="formFile"
        />
      </div>
      <Button disabled={isLoading} onClick={handleUpload} size="lg">
        {isLoading ? <DefaultSpinner /> : "Upload Data"}
      </Button>
      <Typography
        variant="small"
        color="gray"
        className="flex items-center justify-center gap-2 font-medium opacity-60"
      >
        <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Insert data are secure
        and encrypted
      </Typography>
    </form>
  );
}
