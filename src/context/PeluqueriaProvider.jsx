"use client";
import { getServices } from "@/controllers/ServiciosController";
import { createContext, useEffect, useState } from "react";

const peluqueriaContext = createContext();

const PeluqueriaProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  useEffect(
    () => async () => {
      const fetchData = async () => {
        try {
          const data = await getServices();
          setServices(data);
        } catch (error) {
          console.error("Error fetching services data:", error);
        }
      };
      if (services.length === 0) {
        fetchData();
      }
    },
    [services]
  );
  return (
    <peluqueriaContext.Provider value={{ services }}>
      {children}
    </peluqueriaContext.Provider>
  );
};
export { PeluqueriaProvider };
export default peluqueriaContext;
