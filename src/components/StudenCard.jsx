"use client";
import React, { useRef } from "react";
import { Button, Typography } from "@material-tailwind/react";
import * as htmlToImage from "html-to-image";
import QRCode from "react-qr-code";

const StudentCard = ({ student }) => {
  const imageRef = useRef(null);

  const handleDownload = () => {
    // Memeriksa apakah imageRef sudah ada
    if (imageRef.current) {
      htmlToImage
        .toPng(imageRef.current, { quality: 0.95 })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "kartu-siswa.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error converting HTML to image:", error);
        });
    } else {
      console.error("Image reference is not available.");
    }
  };

  function formatPhoneNumber(phoneNumber) {
    // Hilangkan semua spasi dari nomor telepon
    phoneNumber = phoneNumber.replace(/\s/g, "");

    // Pisahkan nomor telepon menjadi bagian-bagian dengan menggunakan substring
    let formattedNumber =
      phoneNumber.substring(0, 3) +
      " " +
      phoneNumber.substring(3, 6) +
      " " +
      phoneNumber.substring(6, 9) +
      " " +
      phoneNumber.substring(9);

    return formattedNumber;
  }

  return (
    <div className="w-full">
      <div
        ref={imageRef}
        className="min-w-max max-w-xl rounded overflow-hidden relative shadow-lg bg-white "
      >
        <div className=" relative z-10 p-4">
          <div className="text-center mb-6 pb-2 flex items-center border-b-2">
            <div className="w-auto">
              <img
                src="/smkn4makassar.png"
                alt="logo sekolah smk negeri 4 makassar"
                width="100"
                height="100"
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
                value={
                  process.env.NEXT_PUBLIC_API_SEVER + "/absens/" + student?.id
                }
                size={128}
              />
            </div>
            <div className="px-6 pb-4 z-10 relative">
              <div
                className={`font-bold ${
                  student.nama.length >= 25 ? "text-base" : "text-2xl"
                } mb-2`}
              >
                {student.nama}
              </div>
              <p className="text-black text-base tracking-widest">
                {student.nis}
              </p>
              <p className="text-black text-base">
                {"Teknik Komputer dan Jaringan (TKJ)"}
              </p>
              <p className="text-black text-base tracking-widest">
                {formatPhoneNumber(student.kontak)}
              </p>
              <p
                className={`text-black ${
                  student.alamat.length >= 36 ? "text-sm" : "text-base"
                }`}
              >
                {student.alamat}
              </p>
            </div>
          </div>
        </div>
        <span className="absolute bottom-0 left-0 w-full z-0">
          <svg
            className="blur-md"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#0099ff"
              fillOpacity={1}
              d="M0,128L60,149.3C120,171,240,213,360,208C480,203,600,149,720,160C840,171,960,245,1080,282.7C1200,320,1320,320,1380,320L1440,320L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            />
          </svg>
        </span>
      </div>
      <Button className="mt-4" onClick={handleDownload}>
        Download
      </Button>
    </div>
  );
};

export default StudentCard;
