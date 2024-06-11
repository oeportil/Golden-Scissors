"use client";
import React, { useEffect, useState, useRef } from "react";
import { format, addMinutes } from "date-fns";
import "@/styles/disponible.css";

function EmpleadoCard({ empleado }) {
  return (
    <div className="flex items-center border rounded-lg p-4 shadow-lg mb-4 h-60">
      <div className="flex-shrink-0 mr-4">
        <div className="bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center">
          <span className="text-xl font-semibold">
            {empleado.nombre[0] + empleado.apellido[0]}
          </span>
        </div>
      </div>
      <div className="w-40">
        <h2 className="text-lg font-bold">{`${empleado.nombre} ${empleado.apellido}`}</h2>
        <p className="text-sm text-gray-600">
          {empleado.categorias.join(", ")}
        </p>
        <p className="text-sm font-semibold mt-2">{empleado.estado}</p>
      </div>
    </div>
  );
}

function TimeLabels({ intervals }) {
  return (
    <div className="flex gap-8 overflow-x-auto p-2">
      {intervals.map((interval, index) => (
        <div
          key={index}
          className="flex-shrink-0 text-center"
          style={{
            width: `4.5vh`,
          }}
        >
          <span className="text-xs lg:text-s block text-gray-500 ">
            {format(interval, "p")}
          </span>
        </div>
      ))}
    </div>
  );
}

function Timeline({ detalles, estado }) {
  const intervals = [];
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
    Math.floor(now.getMinutes() / 5) * 5,
    0,
    0
  );

  let currentTime = startOfDay;

  for (let i = 0; i < 60; i++) {
    intervals.push(currentTime);
    currentTime = addMinutes(currentTime, 5);
  }

  const renderDetails = (interval) => {
    const detail = detalles.find(
      (det) =>
        addMinutes(new Date(det.fechaInicio), 360) <= interval &&
        addMinutes(new Date(det.fechaFin), 360) > interval
    );
    if (detail) {
      return {
        content: `Reserva N°${detail.idCita}\n${
          detail.nombreServicio
        } (${format(
          addMinutes(new Date(detail.fechaInicio), 360),
          "p"
        )} - ${format(addMinutes(new Date(detail.fechaFin), 360), "p")})`,
        key: `detail-${interval}`,
      };
    }
    if (estado === "Atendiendo visitante" && !detail) {
      return {
        content: "Atendiendo visitante",
        key: `visitor-${interval}`,
      };
    }
    return { content: "", key: `empty-${interval}` };
  };

  const mergedIntervals = [];
  let previousContent = "";
  let spanCount = 0;

  intervals.forEach((interval) => {
    const { content, key } = renderDetails(interval);
    if (content === previousContent) {
      spanCount += 1;
    } else {
      mergedIntervals.push({
        content: previousContent,
        span: spanCount,
        key: key + spanCount,
      });

      previousContent = content;
      spanCount = 1;
    }
  });

  mergedIntervals.push({
    content: previousContent,
    span: spanCount,
    key: previousContent + spanCount,
  });

  return (
    <div>
      <TimeLabels intervals={intervals} />
      <div className="flex overflow-x-auto p-2 border rounded-lg shadow-inner hide-scrollbar">
        {mergedIntervals.map(({ content, span, key }) => (
          <div
            className={`flex-shrink-0 border-r p-2 m-1 text-center h-36 ${
              content.includes("Atendiendo") && "atendiendo"
            } ${content.includes("Reserva") && "detalle"}`}
            key={key}
            style={{
              width: `${span * 4.5}vh`,
            }}
          >
            <span className="text-s block text-gray-950">{content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmpleadosList() {
  const [empleados, setEmpleados] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/disponibleget`)
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error fetching empleados:", error));
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollPosition = 0;

    const scrollInterval = setInterval(() => {
      if (
        scrollContainer.scrollHeight - scrollContainer.scrollTop <=
        scrollContainer.clientHeight + 1
      ) {
        scrollContainer.scrollTop = 0;
        scrollPosition = 0;
      } else {
        scrollPosition += 1;
        scrollContainer.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }, 75);

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div
      className=" mx-5 scroll-container hide-scrollbar"
      style={{ overflowY: "auto", height: "100vh" }}
      ref={scrollContainerRef}
    >
      {[...empleados, ...empleados].map((empleado, index) => (
        <div className="flex mb-4" key={index}>
          <EmpleadoCard empleado={empleado} />
          <Timeline detalles={empleado.detalles} estado={empleado.estado} />
        </div>
      ))}
    </div>
  );
}

export default EmpleadosList;
