"use client";
import { createContext } from "react";

const peluqueriaContext = createContext();

const PeluqueriaProvider = ({ children }) => {
  return (
    <peluqueriaContext.Provider value={{}}>
      {children}
    </peluqueriaContext.Provider>
  );
};
export { PeluqueriaProvider };
export default peluqueriaContext;
