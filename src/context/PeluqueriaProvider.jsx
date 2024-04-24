"use client";
import { getBlog } from "@/controllers/BlogController";
import { getServices } from "@/controllers/ServiciosController";
import { createContext, useEffect, useState } from "react";

const peluqueriaContext = createContext();

const PeluqueriaProvider = ({ children }) => {
  const [services, setServices] = useState([]);
  const [blog, setBlog] = useState([]);
  //llenando todos los blogs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlog();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    if (blog.length === 0) {
      fetchData();
    }
  }, [blog]);
  //llenando todos los servicios
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
    <peluqueriaContext.Provider value={{ services, blog }}>
      {children}
    </peluqueriaContext.Provider>
  );
};
export { PeluqueriaProvider };
export default peluqueriaContext;
