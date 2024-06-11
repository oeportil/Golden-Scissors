import { useEffect, useState } from "react";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import { AtendVisit, cambiarEstado } from "@/controllers/EmpleadosController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledModal = Modal.styled`
  width: 20rem;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const PeluquerosActualesCard = ({ empleado }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [minutos, setMinutos] = useState(0);

  useEffect(() => {
    const datos = async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/empleadash/${empleado.id_empleado}`;
      const resultado = await fetch(url);
      const respuesta = await resultado.json();
      if (respuesta.minutosParaProximoDetalle != null) {
        setMinutos(respuesta.minutosParaProximoDetalle);
      }
    };
    datos();
  }, [empleado]);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }
  let services = "|";
  empleado.categorias.map((categ) => {
    services += "| " + categ + " |";
  });
  services += "|";

  return (
    <div className={`p-1 ${empleado.state == 1 ? "boton1" : " "} mb-7`}>
      <ToastContainer />
      <div
        className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg"
        style={{ height: "19vh" }}
      >
        <div>
          <h3 className="font-bold text-start">
            {empleado.nombre + " " + empleado.apellido}
          </h3>
          <p>{services}</p>
          <p className="text-start cursor-pointer" onClick={toggleModal}>
            {empleado.estado}
          </p>
          {/* Modal que se abre */}
          <ModalProvider backgroundComponent={FadingBackground}>
            <StyledModal
              isOpen={isOpen}
              afterOpen={afterOpen}
              beforeClose={beforeClose}
              onBackgroundClick={toggleModal}
              onEscapeKeydown={toggleModal}
              opacity={opacity}
              backgroundProps={{ opacity }}
            >
              <div className="py-6">
                {/* <button onClick={toggleModal} className='text-black text-3xl'>x</button> */}
                <h3 className="text-black text-3xl ">
                  {empleado.nombre + " " + empleado.apellido}
                </h3>
                <p className="text-black text-2xl">{empleado.estado}</p>
                <p className="text-black text-lg">
                  {minutos != 0 ? (
                    <>Proximo Servicio Reservado en: {minutos} mins</>
                  ) : (
                    <>No hay Servicios reservados que atender</>
                  )}
                </p>
                <div className="flex md:flex-row flex-col gap-4 mt-2 items-center justify-center">
                  {empleado.state === 1 && (
                    <button
                      onClick={() => AtenderVisitante()}
                      className="text-white bg-slate-700 hover:bg-slate-500 p-2"
                    >
                      Atender Visitante
                    </button>
                  )}
                  {empleado.state == 1 ? (
                    <button
                      onClick={() => CambiarEstado(3)}
                      className="text-white bg-slate-950 hover:bg-slate-800 p-2"
                    >
                      Retirar
                    </button>
                  ) : (
                    <button
                      onClick={() => CambiarEstado(1)}
                      className="text-white bg-slate-950 hover:bg-slate-800 p-2 mx-auto"
                    >
                      Marcar Disponible
                    </button>
                  )}
                </div>
              </div>
            </StyledModal>
          </ModalProvider>
        </div>
      </div>
    </div>
  );

  async function AtenderVisitante() {
    const resultado = await AtendVisit(empleado.id_empleado);
    if (resultado.status == 200) {
      window.location.reload();
    } else {
      toast.error("Ocurrio un error, Intentelo Nuevamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  async function CambiarEstado(estado, id = empleado.id_empleado) {
    const resultado = await cambiarEstado(estado, id);
    if (resultado.estado !== undefined) {
      window.location.reload();
    } else if (
      resultado.error ==
      "No se puede cambiar a estado 3 con detalles de cita pendientes hoy"
    ) {
      toast.error("No se puede retirar, Aún tiene citas pendientes", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (
      resultado.error ==
      "No se puede cambiar a estado 2 o 3 mientras se atiende un detalle de cita"
    ) {
      toast.error("No se puede cambiar su estado, está atendiendo una cita", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      alert("ocurrio un error, Intentelo Nuevamente");
    }
  }
};

export default PeluquerosActualesCard;
