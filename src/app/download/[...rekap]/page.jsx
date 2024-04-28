import ButtonClient from "@/app/Client/ButtonClient";
import { NavbarSimple } from "@/components/NavbarGuru";
// import Styles from '@/app/Client/Styles';
import { cookies } from "next/headers";

const getDataRekap = async (idmapel, idguru, idkelas) => {
  const cookie = cookies();
  const token = cookie.get("token").value;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SEVER}/absens/${idmapel}/${idguru}/${idkelas}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export default async function Page({ params: { rekap } }) {
  console.log(rekap);
  const [idmapel, idguru, idkelas] = rekap;
  const { data } = await getDataRekap(idmapel, idguru, idkelas);
  console.log(data);
  const arrayTgl = new Array(24).fill(null);
  const arrayMateri = new Array(24).fill(null);
  data?.tanggal_pertemuan.forEach((element, index) => {
    arrayTgl[index] = element;
  });
  data?.materi.forEach((element, index) => {
    arrayMateri[index] = element;
  });

  console.log(data?.tanggal_pertemuan);
  console.log(arrayMateri);
  return (
    <div className="">
      <div className="py-8 px-2 md:px-8 ">
        <NavbarSimple />
        {/* <Styles /> */}

        <div id="2_14060" align="center" className="overflow-x-scroll">
          <table
            border={0}
            cellPadding={0}
            cellSpacing={0}
            width={935}
            style={{
              borderCollapse: "collapse",
              tableLayout: "fixed",
              width: "697pt",
              msoDisplayedDecimalSeparator: "'\\,'",
              msoDisplayedThousandSeparator: "'\\.'",
            }}
          >
            <colgroup>
              <col
                width={30}
                style={{
                  msoWidthSource: "userset",
                  msoWidthAlt: 1097,
                  width: "23pt",
                }}
              />
              <col
                width={71}
                style={{
                  msoWidthSource: "userset",
                  msoWidthAlt: 2596,
                  width: "53pt",
                }}
              />
              <col
                width={237}
                style={{
                  msoWidthSource: "userset",
                  msoWidthAlt: 8667,
                  width: "178pt",
                }}
              />
              <col
                width={30}
                style={{
                  msoWidthSource: "userset",
                  msoWidthAlt: 1097,
                  width: "23pt",
                }}
              />
              <col
                width={27}
                span={21}
                style={{
                  msoWidthSource: "userset",
                  msoWidthAlt: 987,
                  width: "20pt",
                }}
              />
            </colgroup>
            <tbody>
              <tr height={25} style={{ height: "18.75pt" }}>
                <td
                  colSpan={25}
                  height={25}
                  className="xl9514060"
                  width={935}
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "14pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Calibri, sans-serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "center",
                    verticalAlign: "bottom",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "0.5pt solid windowtext",
                    borderLeft: "none",
                    background: "white",
                    msoPattern: "black none",
                    whiteSpace: "nowrap",
                    height: "18.75pt",
                    width: "697pt",
                  }}
                >
                  DAFTAR HADIR SISWA JURUSAN TKJ SMK NEGERI 4 MAKASSAR
                </td>
              </tr>
              <tr height={20} style={{ height: "15pt" }}>
                <td
                  colSpan={2}
                  height={20}
                  className="xl9014060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Calibri, sans-serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "left",
                    verticalAlign: "middle",
                    border: "0.5pt solid windowtext",
                    background: "#ffc000",
                    msoPattern: "black none",
                    whiteSpace: "nowrap",
                    height: "15pt",
                  }}
                >
                  KELAS
                </td>
                <td
                  colSpan={23}
                  className="xl9114060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "400",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Calibri, sans-serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "left",
                    verticalAlign: "middle",
                    border: "0.5pt solid windowtext",
                    background: "#ffc000",
                    msoPattern: "black none",
                    whiteSpace: "nowrap",
                    borderLeft: "none",
                  }}
                >
                  {data?.kelas}
                </td>
              </tr>
              <tr height={20} style={{ height: "15pt" }}>
                <td
                  colSpan={2}
                  height={20}
                  className="xl9014060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Calibri, sans-serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "left",
                    verticalAlign: "middle",
                    border: "0.5pt solid windowtext",
                    background: "#ffc000",
                    msoPattern: "black none",
                    whiteSpace: "nowrap",
                    height: "15pt",
                  }}
                >
                  MAPEL
                </td>
                <td
                  colSpan={23}
                  className="xl9114060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "400",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Calibri, sans-serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "left",
                    verticalAlign: "middle",
                    border: "0.5pt solid windowtext",
                    background: "#ffc000",
                    msoPattern: "black none",
                    whiteSpace: "nowrap",
                    borderLeft: "none",
                  }}
                >
                  {data?.mapel}
                </td>
              </tr>
              <tr height={28} style={{ height: "21pt" }}>
                <td
                  colSpan={2}
                  height={28}
                  className="xl9014060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Calibri, sans-serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "left",
                    verticalAlign: "middle",
                    border: "0.5pt solid windowtext",
                    background: "#ffc000",
                    msoPattern: "black none",
                    whiteSpace: "nowrap",
                    height: "21pt",
                  }}
                >
                  PENGAMPUH
                </td>
                <td
                  colSpan={23}
                  className="xl9114060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "400",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Calibri, sans-serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "left",
                    verticalAlign: "middle",
                    border: "0.5pt solid windowtext",
                    background: "#ffc000",
                    msoPattern: "black none",
                    whiteSpace: "nowrap",
                    borderLeft: "none",
                  }}
                >
                  {data?.pengampuh}
                </td>
              </tr>
              <tr height={20} style={{ height: "15pt" }}>
                <td
                  rowSpan={2}
                  height={118}
                  className="xl7714060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Cambria, serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "center",
                    verticalAlign: "middle",
                    borderTop: "none",
                    borderRight: "0.5pt solid black",
                    borderBottom: "none",
                    borderLeft: "0.5pt solid black",
                    background: "yellow",
                    msoPattern: "#8db3e2 none",
                    whiteSpace: "nowrap",
                    borderBottom: "0.5pt solid black",
                    height: "88.5pt",
                  }}
                >
                  NO.
                </td>
                <td
                  rowSpan={2}
                  className="xl7714060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Cambria, serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "center",
                    verticalAlign: "middle",
                    borderTop: "none",
                    borderRight: "0.5pt solid black",
                    borderBottom: "none",
                    borderLeft: "0.5pt solid black",
                    background: "yellow",
                    msoPattern: "#8db3e2 none",
                    whiteSpace: "nowrap",
                    borderBottom: "0.5pt solid black",
                  }}
                >
                  NIS
                </td>
                <td
                  rowSpan={2}
                  className="xl8214060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Cambria, serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "center",
                    verticalAlign: "middle",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "none",
                    borderLeft: "0.5pt solid black",
                    background: "yellow",
                    msoPattern: "#8db3e2 none",
                    whiteSpace: "nowrap",
                    borderBottom: "0.5pt solid black",
                  }}
                >
                  NAMA SISWA
                </td>
                <td
                  rowSpan={2}
                  className="xl8314060"
                  width={30}
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Cambria, serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "center",
                    verticalAlign: "middle",
                    borderTop: "none",
                    borderRight: "0.5pt solid windowtext",
                    borderBottom: "0.5pt solid windowtext",
                    borderLeft: "0.5pt solid windowtext",
                    background: "yellow",
                    msoPattern: "#8db3e2 none",
                    whiteSpace: "normal",
                    msoRotate: "-45",
                    width: "23pt",
                  }}
                >
                  L/P
                </td>
                <td
                  colSpan={21}
                  className="xl8414060"
                  width={567}
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "11pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Cambria, serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "center",
                    verticalAlign: "middle",
                    borderTop: "none",
                    borderRight: "none",
                    borderBottom: "0.5pt solid windowtext",
                    borderLeft: "0.5pt solid windowtext",
                    background: "yellow",
                    msoPattern: "black none",
                    whiteSpace: "normal",
                    borderRight: "0.5pt solid black",
                    borderLeft: "none",
                    width: "420pt",
                  }}
                >
                  TANGGAL PERTEMUAN
                </td>
              </tr>
              <tr height={98} style={{ height: "73.5pt" }}>
                {data?.tanggal_pertemuan.length > 0 &&
                  arrayTgl?.map((tanggal, i) => (
                    <td
                      key={i}
                      height={98}
                      className="xl7514060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        writingMode: "vertical-rl",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "700",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Cambria, serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "'Short Date'",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        background: "yellow",
                        msoPattern: "black none",
                        whiteSpace: "nowrap",
                        msoRotate: "-90",
                        height: "73.5pt",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      {tanggal ? tanggal : null}
                    </td>
                  ))}
              </tr>
              {data?.siswa.length > 0 &&
                data?.siswa.map((siswa, i) => (
                  <tr key={i} height={20} style={{ height: "15pt" }}>
                    <td
                      height={20}
                      className="xl6414060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "'Times New Roman', serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid black",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        height: "15pt",
                        borderTop: "none",
                      }}
                    >
                      {i + 1}
                    </td>
                    <td
                      className="xl6414060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "'Times New Roman', serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid black",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      {siswa?.nis}
                    </td>
                    <td
                      className="xl6514060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Calibri, sans-serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "general",
                        verticalAlign: "middle",
                        borderTop: "0.5pt solid black",
                        borderRight: "none",
                        borderBottom: "0.5pt solid black",
                        borderLeft: "0.5pt solid black",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      {siswa?.nama_siswa}
                    </td>
                    <td
                      className="xl6614060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "'Times New Roman', serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                      }}
                    >
                      {siswa?.jenis_kelamin}
                    </td>
                    {siswa?.statusAbsen.length > 0 &&
                      siswa?.statusAbsen.map((e, i) => (
                        <td
                          key={i}
                          className="xl6714060"
                          style={{
                            paddingTop: "1px",
                            paddingRight: "1px",
                            paddingLeft: "1px",
                            msoIgnore: "padding",
                            color: "black",
                            fontSize: "11pt",
                            fontWeight: "400",
                            fontStyle: "normal",
                            textDecoration: "none",
                            fontFamily: "Calibri, sans-serif",
                            msoFontCharset: "0",
                            msoNumberFormat: "General",
                            textAlign: "center",
                            verticalAlign: "middle",
                            border: "0.5pt solid windowtext",
                            msoBackgroundSource: "auto",
                            msoPattern: "auto",
                            whiteSpace: "nowrap",
                            borderTop: "none",
                            borderLeft: "none",
                          }}
                        >
                          {e?.status === "Hadir"
                            ? "√"
                            : e?.status === "Alpa"
                            ? "A"
                            : e?.status === "Sakit"
                            ? "S"
                            : e?.status === "Izin"
                            ? "i"
                            : null}
                        </td>
                      ))}

                    <td
                      className="xl6714060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Calibri, sans-serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      className="xl6814060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "700",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Cambria, serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "general",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        layoutFlow: "vertical",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      className="xl6714060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Calibri, sans-serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      className="xl6714060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Calibri, sans-serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      className="xl6714060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Calibri, sans-serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      className="xl6714060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Calibri, sans-serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      className="xl6714060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Calibri, sans-serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      className="xl6714060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "Calibri, sans-serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "middle",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                ))}

              <tr
                height={197}
                style={{ msoHeightSource: "userset", height: "147.75pt" }}
              >
                <td
                  colSpan={4}
                  height={197}
                  className="xl9214060"
                  style={{
                    paddingTop: "1px",
                    paddingRight: "1px",
                    paddingLeft: "1px",
                    msoIgnore: "padding",
                    color: "black",
                    fontSize: "16pt",
                    fontWeight: "700",
                    fontStyle: "normal",
                    textDecoration: "none",
                    fontFamily: "Calibri, sans-serif",
                    msoFontCharset: "0",
                    msoNumberFormat: "General",
                    textAlign: "center",
                    verticalAlign: "middle",
                    borderTop: "0.5pt solid windowtext",
                    borderRight: "none",
                    borderBottom: "0.5pt solid windowtext",
                    borderLeft: "0.5pt solid windowtext",
                    background: "#ffc000",
                    msoPattern: "black none",
                    whiteSpace: "nowrap",
                    msoRotate: "45",
                    borderRight: "0.5pt solid black",
                    height: "147.75pt",
                  }}
                >
                  MATERI
                </td>
                {data?.materi.length > 0 &&
                  arrayMateri.map((materi, i) => (
                    <td
                      key={i}
                      className="xl8714060"
                      style={{
                        paddingTop: "1px",
                        paddingRight: "1px",
                        paddingLeft: "1px",
                        msoIgnore: "padding",
                        color: "black",
                        fontSize: "11pt",
                        fontWeight: "400",
                        fontStyle: "normal",
                        textDecoration: "none",
                        fontFamily: "'Times New Roman', serif",
                        msoFontCharset: "0",
                        msoNumberFormat: "General",
                        textAlign: "center",
                        verticalAlign: "top",
                        border: "0.5pt solid windowtext",
                        msoBackgroundSource: "auto",
                        msoPattern: "auto",
                        whiteSpace: "nowrap",
                        writingMode: "vertical-rl",
                        msoRotate: "-90",
                        borderTop: "none",
                        borderLeft: "none",
                      }}
                    >
                      {materi ? materi : null}
                    </td>
                  ))}
              </tr>
              {/*[if supportMisalignedColumns]*/}
              <tr height={0} style={{ display: "none" }}>
                <td width={30} style={{ width: "23pt" }} />
                <td width={71} style={{ width: "53pt" }} />
                <td width={237} style={{ width: "178pt" }} />
                <td width={30} style={{ width: "23pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
                <td width={27} style={{ width: "20pt" }} />
              </tr>
              {/*[endif]*/}
            </tbody>
          </table>
          <div className="print:hidden">
            <ButtonClient />
          </div>
        </div>
      </div>
    </div>
  );
}
