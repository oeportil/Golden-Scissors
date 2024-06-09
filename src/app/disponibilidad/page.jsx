"use client";
import React, { useEffect, useState } from "react";
import { format, addHours } from "date-fns";

function EmpleadoCard({ empleado }) {
  return (
    <div className="flex items-center border rounded-lg p-4 shadow-lg mb-4">
      <div className="flex-shrink-0 mr-4">
        <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center">
          <span className="text-xl font-semibold">{empleado.nombre[0]}</span>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold">{`${empleado.nombre} ${empleado.apellido}`}</h2>
        <p className="text-sm text-gray-600">
          {empleado.categorias.join(", ")}
        </p>
        <p className="text-sm font-semibold mt-2">{empleado.estado}</p>
      </div>
    </div>
  );
}

function Timeline({ detalles, estado }) {
  const intervals = [];
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  for (let i = 0; i < 160; i++) {
    const time = new Date(startOfDay.getTime() + i * 5 * 60000);
    intervals.push(time);
  }

  const renderDetails = (interval) => {
    const detail = detalles.find(
      (det) =>
        addHours(new Date(det.fechaInicio), 6) <= interval &&
        addHours(new Date(det.fechaFin), 6) > interval
    );
    if (detail) {
      return (
        <div className="bg-gray-200 rounded p-2 m-1 text-center" key={interval}>
          <p>{`Reserva N°${detail.idCita}`}</p>
          <p>{`${detail.nombreServicio} (${format(
            addHours(new Date(detail.fechaInicio), 6),
            "p"
          )} - ${format(addHours(new Date(detail.fechaFin), 6), "p")})`}</p>
        </div>
      );
    }
    if (estado === "Atendiendo visitante" && !detail) {
      return (
        <div
          className="bg-yellow-200 rounded p-2 m-1 text-center"
          key={interval}
        >
          Atendiendo visitante
        </div>
      );
    }
    return <div className="p-2 m-1" key={interval}></div>;
  };

  return (
    <div className="flex overflow-x-auto p-2 border rounded-lg shadow-inner">
      {intervals.map((interval) => (
        <div className="flex-shrink-0 w-28 border-r" key={interval}>
          <span className="text-xs block text-gray-500">
            {format(interval, "p")}
          </span>
          {renderDetails(interval)}
        </div>
      ))}
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
