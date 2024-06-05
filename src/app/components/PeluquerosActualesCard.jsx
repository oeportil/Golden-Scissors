import {useState} from 'react'
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import { cambiarEstado } from '@/controllers/EmpleadosController';

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

const PeluquerosActualesCard = ({empleado}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

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
    let services = "";
    empleado.cateCapacitadas.map(categ => {
        services += " "+categ.categoria.nombre+","
    })
  return (
    <div className={`p-1 ${empleado.estado == 1 ? "boton1": " "} mb-7`}>
    <div className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg" style={{ height: '19vh' }}>
      <div>
        <h3 className="font-bold text-start">{empleado.nombre+" "+empleado.apellido}</h3>
       <p>{services}</p>
       <p className='text-start cursor-pointer' onClick={toggleModal}>
        {empleado.estado == 1 ? "Disponible" : empleado.estado === 2 ? "Ocupado" : "Retirado"}
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
            <div className='py-6'>
              {/* <button onClick={toggleModal} className='text-black text-3xl'>x</button> */}
              <h3 className='text-black text-3xl '>{empleado.nombre+" "+empleado.apellido}</h3>
              <p className='text-black text-2xl'>{empleado.estado == 1 ? "Disponible" : empleado.estado === 2 ? "Ocupado" : "Retirado"}</p>
              <div className='flex md:flex-row flex-col gap-4 mt-2'>
                {empleado.estado === 1 && <button className='text-white bg-slate-700 hover:bg-slate-500 p-2'>Atender Visitante</button>}
                {empleado.estado == 1 ? <button onClick={() => CambiarEstado(3)} className='text-white bg-slate-950 hover:bg-slate-800 p-2'>Retirar</button> : <button onClick={() => CambiarEstado(1)}  className='text-white bg-slate-950 hover:bg-slate-800 p-2 mx-auto'>Marcar Disponible</button>}
              </div>
            </div>
          </StyledModal>
        </ModalProvider>
      </div>
    </div>
  </div>
  )

  async function CambiarEstado(estado, id = empleado.id_empleado){
    const resultado = await cambiarEstado(estado, id)
    console.log(resultado)
    if(resultado.estado !== undefined){
      window.location.reload();
    } else {
      alert("ocurrio un error, Intentelo Nuevamente")
    }
  }
}

export default PeluquerosActualesCard