import liff from "@line/liff";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${liff.getAccessToken()}`;
  return config;
});
