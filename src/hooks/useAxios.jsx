import React from "react";
import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "https://my-assignment-12-server-umber.vercel.app",
  });
  return axiosInstance;
};

export default useAxios;
