"use client";
import React, { useEffect, useState } from "react";
import { format, addHours, addMinutes } from "date-fns";
import "@/styles/disponible.css";

function EmpleadoCard({ empleado }) {
  return (
    <div className="flex items-center border rounded-lg p-4 shadow-lg mb-4">
      <div className="flex-shrink-0 mr-4">
        <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-xl font-semibold">{empleado.nombre[0]}</span>
        </div>
      </div>
      <div className="w-32">
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
    <div className="flex overflow-x-auto p-2">
      {intervals.map((interval, index) => (
        <div
          key={index}
          className="flex-shrink-0 text-center"
          style={{
            width: `4.5vh`,
          }}
        >
          <span className="text-xs block text-gray-500">
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
    // 5 minutos * 60 iteraciones = 5 horas
    intervals.push(currentTime);
    currentTime = addMinutes(currentTime, 5);
  }

  const renderDetails = (interval) => {
    const detail = detalles.find(
      (det) =>
        addMinutes(new Date(det.fechaInicio), 360) <= interval && // Adjust for timezone if necessary
        addMinutes(new Date(det.fechaFin), 360) > interval // Adjust for timezone if necessary
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
    if (content == previousContent) {
      spanCount += 1;
    } else {
      console.log(content);
      console.log(previousContent);
      console.log(spanCount);
      mergedIntervals.push({
        content: previousContent,
        span: spanCount,
        key: key + spanCount,
      });

      previousContent = content;
      spanCount = 1;
    }
  });

  // Push the last interval
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
            className={`flex-shrink-0 border-r p-2 m-1 text-center`}
            key={key}
            style={{
              width: `${span * 4.5}vh`,
            }}
          >
            <span className="text-s block text-gray-500">{content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmpleadosList() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/disponibleget`) // Asegúrate de que este endpoint esté configurado correctamente
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error fetching empleados:", error));
  }, []);

  return (
    <div className="container mx-auto">
      {empleados.map((empleado) => (
        <div className="flex mb-4" key={empleado.id}>
          <EmpleadoCard empleado={empleado} />
          <Timeline detalles={empleado.detalles} estado={empleado.estado} />
        </div>
      ))}
    </div>
  );
}

export default EmpleadosList;
