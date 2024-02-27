import '../styles/principal.css'


export default function Home() {
  return (
   <div>
      <div className=" bg-blend-multiply bg-no-repeat bg-cover bg-[url(../img/Banner.jpg)] py-60 bg-gray-600">
        <div className=" flex justify-center">
            <h1 className="w-2/4 text-center text-5xl ">Crea una Cuenta para Reservar una Cita</h1>
        </div>
      </div>
      <section className="py-4 introduccion">
            <h2 className="text-center text-2xl font-semibold">Introduccion</h2>
      </section>
   </div>
  )
}
