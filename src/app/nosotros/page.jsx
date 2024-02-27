import Image from "next/image"
import Nosotros from "../../img/Nosotros.webp"
import '../../styles/nosotros.css';

export const metadata = {
  title: 'Barberia - Nosotros'
}

const Page = () => {
  return (
    <div className="flex flex-col items-center mb-8">
        <h2 className="nosotros my-8 font-bold text-3xl">Sobre Nosotros</h2>
        <div className="w-11/12 md:flex md:w-8/12 gap-8 md:items-center">
          <Image src={Nosotros} className="md:max-w-sm" alt="Nosotros Imagen"/>
          <div className="text-justify">
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
        </div>
    </div>
  )
}

export default Page
