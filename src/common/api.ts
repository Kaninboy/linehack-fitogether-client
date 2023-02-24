import liff from "@line/liff";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://fitogether.me/api",
});

// api.interceptors.request.use((config) => {
//   config.headers.authorization = `Bearer ${liff.getAccessToken()}`;
//   return config;
// });
