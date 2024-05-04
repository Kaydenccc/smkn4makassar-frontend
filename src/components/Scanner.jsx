"use client";
import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { getCookie } from "@/helper/cookie";

const Scanner = ({
  id_mapel,
  id_guru,
  id_kelas,
  tanggal,
  setAbsenSuccess,
  setLoading,
}) => {
  const videoRef = useRef();
  const scannedQRRef = useRef(new Set());
  const [isScannerRunning, setIsScannerRunning] = useState(false);
  const [cameraType, setCameraType] = useState("environment"); // "environment" untuk kamera belakang, "user" untuk kamera depan
  const constraints = { video: { facingMode: cameraType } };
  console.log(id_mapel, id_guru, id_kelas, tanggal);
  const startScanner = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const video = videoRef.current;
        video.srcObject = stream;
        return new Promise((resolve) => {
          video.onloadedmetadata = () => {
            resolve(video);
          };
        });
      })
      .then((video) => {
        const canvasElement = document.createElement("canvas");
        const canvas = canvasElement.getContext("2d", {
          willReadFrequently: true,
        });
        video.play();

        const loop = async () => {
          const token = getCookie("token");
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvasElement.width = video.videoWidth;
            canvasElement.height = video.videoHeight;
            canvas.drawImage(
              video,
              0,
              0,
              canvasElement.width,
              canvasElement.height
            );
            const imageData = canvas.getImageData(
              0,
              0,
              canvasElement.width,
              canvasElement.height
            );
            const code = jsQR(
              imageData.data,
              imageData.width,
              imageData.height
            );

            if (code && !scannedQRRef.current.has(code.data)) {
              setLoading(true);
              console.log("QR Code terdeteksi:", code.data);
              scannedQRRef.current.add(code.data);
              console.log(code.data);
              try {
                const res = await axios.get(
                  `${code.data}/${id_mapel}/${id_guru}/${id_kelas}/${tanggal}`,
                  {
                    headers: {
                      Authorization: token,
                    },
                  }
                );

                setAbsenSuccess(res?.data?.data);
                setLoading(false);
              } catch (err) {
                if (err) {
                  setAbsenSuccess(err.response.data);
                }
                setLoading(false);
              }
            }
          }
          requestAnimationFrame(loop);
        };
        setIsScannerRunning(true);
        requestAnimationFrame(loop);
      })
      .catch((err) => {
        console.error("Error mengakses kamera:", err);
      });
  };
  const stopScanner = () => {
    const video = videoRef.current;
    setIsScannerRunning(false);
    scannedQRRef.current = new Set();
    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => track.stop());
  };
  useEffect(() => {
    // Bersihkan objek Set saat komponen di-unmount
    return () => {
      setIsScannerRunning(false);
      scannedQRRef.current = new Set();
    };
  }, []);

  const switchCamera = () => {
    setCameraType((prevType) => (prevType === "user" ? "environment" : "user"));
    setIsScannerRunning(false); // Stop scanner when switching cameras
  };

  return (
    <div className="flex w-full h-full flex-col justify-center items-center">
      <div className="max-w-full h-full flex justify-center flex-col  md:max-w-lg">
        <video ref={videoRef} />
        <Button className="mt-4 rounded-none" onClick={switchCamera}>
          Switch Camera
        </Button>
        <Button
          className="mt-4 rounded-none"
          onClick={isScannerRunning ? stopScanner : startScanner}
        >
          {isScannerRunning ? "Stop Scanner" : "Start Scanner"}
        </Button>
      </div>
    </div>
  );
};

export default Scanner;
