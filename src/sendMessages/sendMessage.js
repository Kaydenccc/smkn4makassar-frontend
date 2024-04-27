import axios from 'axios';

async function sendText(data) {
  try {
    const token = process.env.NEXT_PUBLIC_API_KEY_WABLAS;
    const payload = { data };

    const headers = {
      Authorization: token,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(process.env.NEXT_PUBLIC_DOMAIN_WABLAS + '/api/v2/send-message', payload, { headers });

    // Lakukan sesuatu dengan respons, jika diperlukan
    console.log(response.data);
  } catch (error) {
    // Tangani kesalahan jika ada
    console.error('Error sending text:', error.message);
  }
}

const handleSendMessage = async (nomor, pesan) => {
  try {
    const kumpulanData = [
      {
        phone: nomor,
        message: pesan,
        secret: false,
        retry: false,
        isGroup: false,
      },
      // tambahkan data lain jika diperlukan
    ];

    await sendText(kumpulanData);
    // Tindakan lain setelah pengiriman pesan berhasil
  } catch (error) {
    // Tangani kesalahan pengiriman pesan
    console.error('Error sending message:', error);
  }
};

export default handleSendMessage;
