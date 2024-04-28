const { default: axios } = require("axios");

export const Axios = axios.create({
  // baseURL: "https://jg1ktwvx-8000.asse.devtunnels.ms/api",
  // baseURL: "http://127.0.0.1:8000/api",
  baseURL: process.env.NEXT_PUBLIC_API_SEVER,

  headers: {
    "Content-Type": "appliaction/json",
  },
  withCredentials: true,
});
