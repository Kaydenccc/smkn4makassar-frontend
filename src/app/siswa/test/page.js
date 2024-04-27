// components/StudentCard.js
"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import QRCode from "react-qr-code";
import Image from "next/image";

const Page = () => {
  const nama = "ANHAR FADILAH BJASBJAKLA";
  console.log(nama.length);
  return (
    <div className="max-w-xl rounded overflow-hidden relative shadow-lg m-4  ">
      <div className=" relative z-10 p-4">
        <div className="text-center mb-6 pb-2 flex items-center border-b-2">
          <div className="w-auto">
            <Image
              width={100}
              height={100}
              alt="logo sekolah smk negeri 4 makassar"
              src={"/smkn4makassar.png"}
            />
          </div>
          <div className="text-center w-full">
            <Typography className="font-semibold text-xl">
              KARTU ABSENSI SISWA
            </Typography>
            <Typography>SMK NEGERI 4 MAKASSAR</Typography>
            <Typography className="text-xs">
              Jl. Bandang No.140, Parang Layang, Kec. Bontoala, Kota Makassar.
            </Typography>
          </div>
        </div>
        <div className="flex ">
          <div className="relative">
            <QRCode
              value={"http://localhost:3000/siswa/pengaturan"}
              size={128}
            />
          </div>
          <div className="px-6 pb-4 z-10 relative">
            <div
              className={`font-bold ${
                nama.length >= 25 ? "text-base" : "text-2xl"
              } mb-2`}
            >
              {"ANHAR FADILAH"}
            </div>
            <p className="text-black text-base">
              <p className="text-black text-base">{"19982888991"}</p>
              {"Teknik Komputer dan Jaringan (TKJ)"}
            </p>
            <p className="text-black text-base">
              {"Jl Mamoa 5b, Tamalate, Kota Makassar"}
            </p>
            <p className="text-black text-base">{"082 081 018 066"}</p>
          </div>
        </div>
      </div>
      <span className="absolute bottom-0 left-0 w-full z-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity={1}
            d="M0,128L60,149.3C120,171,240,213,360,208C480,203,600,149,720,160C840,171,960,245,1080,282.7C1200,320,1320,320,1380,320L1440,320L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </span>
    </div>
  );
};

export default Page;
