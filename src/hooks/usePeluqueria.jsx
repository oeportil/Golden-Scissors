"use client";
import { useContext } from "react";
import peluqueriaContext from "@/context/PeluqueriaProvider";

export const usePeluqueria = () => {
  return useContext(peluqueriaContext);
};
