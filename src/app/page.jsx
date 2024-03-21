import Image from 'next/image'
import '../styles/principal.css'
import Link from 'next/link'



export default function Home() {
  return (
   <div>
      <div className=" bg-blend-multiply bg-no-repeat bg-cover bg-[url(../img/Banner.jpg)] py-60 bg-gray-600">
        <div className=" flex justify-center">
            <h1 className="w-2/4 text-center text-5xl ">Crea una Cuenta para Reservar una Cita</h1>
        </div>
      </div>
      <section className="py-4 introduccion flex flex-col items-center">
           <div className='md:w-8/12 w-11/12'>
              <h2 className="text-center text-2xl font-semibold mb-4">Introduccion</h2>
                <div className='grid gap-8 lg:grid-cols-2 text-justify items-center'>
                    <div className='flex flex-col items-center'>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Numquam, harum, laborum et illo repellat sapiente cum enim nulla impedit neque dignissimos odio ut deserunt nam. 
                        Iure magnam accusantium debitis cum.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus eius ducimus maxime, exercitationem corporis aut.
                        Id assumenda eveniet tempore velit amet necessitatibus ad provident ipsa, soluta, 
                        sapiente blanditiis pariatur accusantium.
                        </p>
                        <Link className='my-2 p-3 iniciar_sesion font-semibold' href='/login'>Inicia Sesión</Link>
                    </div>
                      <div className='grid grid-cols-2 h-full'>
                          <Image className='' src={''} alt={'Introduccion de imagen'} priority/>
                          <Image className='lg:row-start-2 lg:col-start-2' src={''} alt={'Introduccion de imagen 2'} priority/>
                      </div>
                </div>
           </div>
      </section>
   </div>
  )
}
