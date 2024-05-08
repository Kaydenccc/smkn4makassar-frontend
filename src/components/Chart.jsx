"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { convertUrlParameterFormat } from "@/helper/functionConvertString";
import { useParams } from "next/navigation";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// If you're using Next.js please use the dynamic import for react-apexcharts and remove the import from the top for the react-apexcharts
// import dynamic from "next/dynamic";
// const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Example({ statistik }) {
  const params = useParams();
  const { hadir, sakit, izin, alpa } = statistik;
  const chartConfig = {
    type: "pie",
    width: 380,
    height: 380,
    series: [hadir, sakit, izin, alpa],
    options: {
      labels: ["Hadir", "Alpha", "Sakit", "Izin"],
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      colors: ["#70e000", "#ff4d6d", "#b8b8ff", "#48bfe3"],
      legend: {
        show: "bottom",
      },
    },
  };
  return (
    <Card className="w-full">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-blue-700 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            STATISTIK KEHADIRAN
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            pada mata pelajaran {convertUrlParameterFormat(params?.rekap[3])}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}
