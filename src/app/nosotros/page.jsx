import Image from "next/image"
import Nosotros from "../../img/Nosotros.webp"
import Nosotros2 from '@/img/Nosotros2.png';
import '../../styles/nosotros.css';
import { GoogleMapsEmbed } from '@next/third-parties/google'

export const metadata = {
  title: 'Barberia - Nosotros'
}

const Page = () => {
  return (
    <div className="flex flex-col items-center mb-8">
        <h2 className="nosotros my-8 font-bold text-3xl uppercase">Golden Scissors</h2>
        <div className="w-11/12 md:grid md:w-10/12 md:gap-8  grid-cols-2 items-center justify-center">
          <Image src={Nosotros} width={500} height={500}  alt="Nosotros Imagen"/>
          <div className="text-justify">
            <h3 className="text-center text-3xl font-bold mb-7 mt-2 brown">Nuestra Mision</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Eveniet modi, quod facilis cumque maiores consectetur, deserunt eos qui consequuntur 
              porro voluptatum fugit sed iste. Repudiandae quod amet quo architecto et.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta laboriosam consectetur 
              id vero doloribus eius ab atque facilis accusantium! 
              asperiores omnis nemo eum illum explicabo facilis tenetur quidem.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Officiis accusamus, dolorem commodi obcaecati dolores adipisci. 
              Ratione quasi vitae doloribus. Quod, et assumenda. Officiis, 
              facere harum. Perspiciatis mollitia quae voluptates labore?</p>
          </div>
          <div className="text-justify mt-6 md:mt-0">
          <h3 className="text-center text-3xl font-bold mb-7 mt-2 brown">Nuestra Historia</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
              Eveniet modi, quod facilis cumque maiores consectetur, deserunt eos qui consequuntur 
              porro voluptatum fugit sed iste. Repudiandae quod amet quo architecto et.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt dicta laboriosam consectetur 
              id vero doloribus eius ab atque facilis accusantium! 
              asperiores omnis nemo eum illum explicabo facilis tenetur quidem.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              Officiis accusamus, dolorem commodi obcaecati dolores adipisci. 
              Ratione quasi vitae doloribus. Quod, et assumenda. Officiis, 
              facere harum. Perspiciatis mollitia quae voluptates labore?</p>
          </div>
          <Image src={Nosotros2} width={700} height={700} alt="Nosotros Imagen"/>
        </div>
        <div>
         <h3 className="text-center text-3xl font-bold mb-7 mt-2 brown">Ubícanos</h3>
          <div>
          <iframe className="max-lg:w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.6010935214026!2d-89.55025832576118!3d13.982333691916077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62e62036825a69%3A0xec68b49f92513893!2sUniversidad%20Cat%C3%B3lica%20de%20El%20Salvador!5e0!3m2!1ses!2ssv!4v1711033647103!5m2!1ses!2ssv" width="1000" height="300"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
    </div>
  )
}

export default Page
