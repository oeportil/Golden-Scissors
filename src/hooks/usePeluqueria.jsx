"use client";
import { useContext } from "react";
import peluqueriaContext from "@/context/PeluqueriaProvider";

const usePeluqueria = () => {
  return useContext(peluqueriaContext);
};

export default usePeluqueria;
