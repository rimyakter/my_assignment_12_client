import React from "react";
import axios from "axios";

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });
  return axiosInstance;
};

export default useAxios;
