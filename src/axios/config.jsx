import axios from "axios";

export const blogFetch = axios.create({
  baseURL: "https://teste-tecnico-front-api.up.railway.app",
});

