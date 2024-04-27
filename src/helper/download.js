import * as XLSX from "xlsx-js-style";

// Fungsi untuk mengonversi HTML ke Excel
const convertHtmlToExcel = (id) => {
  // Mengubah HTML ke Workbook
  const table = document.getElementById(id); // Ganti dengan ID tabel Anda
  const ws = XLSX.utils.table_to_sheet(table);
  // Misalnya, memberikan warna background merah pada sel A1
  console.log(ws);

  // Menerapkan nilai dan gaya ke seluruh rentang
  const lastRow = ws["!rows"].length - 1;
  const range1 = XLSX.utils.decode_range(`A1:Y${lastRow}`);
  for (let i = range1.s.r; i <= range1.e.r; i++) {
    for (let j = range1.s.c; j <= range1.e.c; j++) {
      const cell = XLSX.utils.encode_cell({ r: i, c: j });

      // Menentukan nilai dan gaya yang akan diterapkan
      const cellBg = [
        "A2",
        "C2",
        "A3",
        "C3",
        "A4",
        "C4",
        "A5",
        "C5",
        "B5",
        "C5",
        "D5",
        "E5",
      ];
      if (cell === "A1") {
        ws[cell] = {
          v: ws[cell]?.v ? ws[cell].v : "",
          s: {
            alignment: { horizontal: "center", vertical: "center" },
            fill: { fgColor: { rgb: "FFC000" } },
            font: { bold: true, sz: "16" },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          },
        };
      } else if (cellBg.includes(cell)) {
        if (["A5", "C5", "B5", "C5", "D5", "E5"].includes(cell)) {
          ws[cell] = {
            v: ws[cell]?.v ? ws[cell].v : "",

            s: {
              alignment: { horizontal: "center", vertical: "center" },
              fill: { fgColor: { rgb: "FFFF00" } },
              font: { bold: true },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            },
          };
        } else {
          ws[cell] = {
            v: ws[cell]?.v ? ws[cell].v : "",

            s: {
              alignment: { horizontal: "left", vertical: "center" },
              fill: { fgColor: { rgb: "FFC000" } },
              font: { bold: true },
              border: {
                top: { style: "thin", color: { rgb: "000000" } },
                bottom: { style: "thin", color: { rgb: "000000" } },
                left: { style: "thin", color: { rgb: "000000" } },
                right: { style: "thin", color: { rgb: "000000" } },
              },
            },
          };
        }
      } else {
        ws[cell] = {
          v: ws[cell]?.v ? ws[cell].v : "",
          s: {
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          },
        };
      }
    }
  }

  const range = XLSX.utils.decode_range("E6:Y6");

  for (let i = range.s.r; i <= range.e.r; i++) {
    for (let j = range.s.c; j <= range.e.c; j++) {
      const cell = XLSX.utils.encode_cell({ r: i, c: j });

      if (ws[cell].v) {
        const jsDate = new Date(ws[cell].v).getTime(); //
        // Format tanggal sesuai yang diinginkan
        const formattedDate = XLSX.SSF.format("dd/MM/YYYY", jsDate);
        // Menentukan nilai dan gaya yang akan diterapkan
        console.log(ws[cell], "=", formattedDate);
        ws[cell] = {
          v: formattedDate,
          s: {
            alignment: {
              horizontal: "center",
              vertical: "top",
              textRotation: 180,
            },
            fill: { fgColor: { rgb: "FFFF00" } },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          },
        };
      } else {
        ws[cell] = {
          v: "",
          s: {
            alignment: { horizontal: "center", vertical: "center" },
            fill: { fgColor: { rgb: "FFFF00" } },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          },
        };
      }
    }
  }

  ws[`A${lastRow}`] = {
    v: ws[`A${lastRow}`]?.v ? ws[`A${lastRow}`].v : "",
    s: {
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "FFC000" } },
      font: { bold: true, sz: "16" },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    },
  };

  const materiRange = XLSX.utils.decode_range(`E${lastRow}:Y${lastRow}`);
  for (let i = materiRange.s.r; i <= materiRange.e.r; i++) {
    for (let j = materiRange.s.c; j <= materiRange.e.c; j++) {
      const cell = XLSX.utils.encode_cell({ r: i, c: j });

      ws[cell] = {
        v: ws[cell]?.v ? ws[cell]?.v : "",
        s: {
          alignment: {
            horizontal: "center",
            vertical: "center",
            textRotation: 180,
          },
          fill: { fgColor: { rgb: "FFFF00" } },
          border: {
            top: { style: "thin", color: { rgb: "000000" } },
            bottom: { style: "thin", color: { rgb: "000000" } },
            left: { style: "thin", color: { rgb: "000000" } },
            right: { style: "thin", color: { rgb: "000000" } },
          },
        },
      };
    }
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");

  const fileName = "DAFTAR HADIR SISWA JURUSAN TKJ SMKN 4 MAKASSAR.xlsx";
  XLSX.writeFile(wb, fileName);
};

export default convertHtmlToExcel;
