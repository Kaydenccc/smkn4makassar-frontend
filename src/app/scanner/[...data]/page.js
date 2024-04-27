'use client';
import Scanner from '@/components/Scanner';
import { DefaultSpinner } from '@/components/Spinner';
import { Card, CardHeader, CardBody, Typography, Chip } from '@material-tailwind/react';
import { useState } from 'react';

function HorizontalCard({ params: { data } }) {
  const [id_mapel, id_guru, id_kelas, tanggal] = data;
  const [absenSuccess, setAbsenSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
  console.log(data);
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 md:p-0">
      <Card className="w-full max-w-[48rem] mx-auto md:flex-row flex-col">
        <CardHeader shadow={false} floated={false} className="m-0 w-full rounded-l-none md:rounded-l-xl md:w-2/5 shrink-0 rounded-r-none">
          <Scanner id_mapel={id_mapel} id_guru={id_guru} id_kelas={id_kelas} tanggal={tanggal} absenSuccess={absenSuccess} setAbsenSuccess={setAbsenSuccess} setLoading={setLoading} />
        </CardHeader>
        <CardBody className="w-full">
          {!loading ? (
            absenSuccess?.id ? (
              <>
                <div className="w-full flex items-center justify-between mb-4">
                  <Typography variant="h6" color="gray" className=" text-sm md:text-base uppercase flex gap-4 items-center">
                    STATUS ABSEN <Chip color={'green'} value="Hadir" size="sm" className="text-[10px] md:text-xs" />
                  </Typography>
                  <Typography variant="h6" className="text-[12px] md:text-sm font-normal">
                    Kelas {absenSuccess?.id_kelas.kelas}
                  </Typography>
                </div>
                <Typography variant="h4" color="blue-gray" className="mb-2 text-base flex gap-4 items-center">
                  {absenSuccess?.id_siswa.nama} <Chip value={absenSuccess?.id_siswa.jenis_kelamin} size="sm" />
                </Typography>
                <Typography className=" text-[12px] md:text-base font-normal">
                  <span className="w-[100px] text-gray-700 font-bold inline-block">NIS</span>
                  <span>: {''}</span>
                  <span>{absenSuccess?.id_siswa.nis}</span>
                </Typography>
                <Typography className=" text-[12px] md:text-base font-normal">
                  <span className="w-[100px] text-gray-700 font-bold inline-block">Mapel</span>
                  <span>: {''}</span>
                  <span> {absenSuccess?.id_mapel.mapel}</span>
                </Typography>
                <Typography className=" text-[12px] md:text-base font-normal">
                  <span className="w-[100px] text-gray-700 font-bold inline-block">Tanggal</span>
                  <span>: {''}</span>
                  <span>{tanggal}</span>
                </Typography>
                <Typography className=" text-[12px] md:text-base font-normal">
                  <span className="w-[100px] text-gray-700 font-bold inline-block">Jam</span>
                  <span>: {''}</span>
                  <span>{absenSuccess?.jam}</span>
                </Typography>
              </>
            ) : (
              <div>
                <div className="w-full flex items-center justify-between mb-4">
                  <h6 className="text-sm md:text-base font-medium uppercase flex gap-4 items-center">STATUS ABSEN {absenSuccess?.errors && <Chip color={'red'} value="Gagal" size="sm" className="text-[10px] md:text-xs" />}</h6>
                  <h6 className="text-[12px] md:text-sm font-normal">Kelas 12 TKJ 2</h6>
                </div>
                {absenSuccess?.errors?.message[0]}
              </div>
            )
          ) : (
            <DefaultSpinner />
          )}
        </CardBody>
      </Card>
      <a href={`/system/absens/${id_mapel}/${id_guru}/${id_kelas}/${tanggal}`} className=" text-blue-500 text-sm md:text-base uppercase font-semibold mt-4 underline">
        Lihat absen
      </a>
    </div>
  );
}

export default HorizontalCard;
