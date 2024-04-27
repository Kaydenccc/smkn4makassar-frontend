"use client";

import convertHtmlToExcel from "@/helper/download";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

const ButtonClient = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 md:flex-row justify-center">
      <Button onClick={() => router.back()} color="blue" className="mt-8">
        Kembali
      </Button>
      <Button
        onClick={() => convertHtmlToExcel("2_14060")}
        color="green"
        className="mt-0 md:mt-8"
      >
        Download xslx
      </Button>
    </div>
  );
};

export default ButtonClient;
