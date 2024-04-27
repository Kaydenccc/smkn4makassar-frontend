export function createTime() {
  // Dapatkan waktu saat ini
  const currentTime = new Date();

  // Ambil jam dan menit
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  // Tambahkan nol di depan jika kurang dari 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  // Hasil akhir dalam format "HH:mm"
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}
export function convertTime(time) {
  // Dapatkan waktu saat ini
  const [hour, minute] = time.split(":"); // Pisahkan string menggunakan karakter ":"
  const hourMinute = `${hour}:${minute}`;
  return hourMinute; // Output: "12:34"
}
