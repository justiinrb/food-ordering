
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeader";


export default function Home() {
  
  return (
  <>
 
  <Hero/>
  <HomeMenu/>
  <section className="text-center py-8">
  <SectionHeader
        subHeader={'our story'}
        mainHeader={'About us'}
        />
  </section>

  <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
  <p className="">
    son ampliamente utilizados junto con CSS para aplicar estilos y 
    diseñar la presentación de una página. Puedes aplicar clases, estilos en línea o 
    reglas CSS externas para darl
  </p>
  <p className="">
    son ampliamente utilizados junto con CSS para aplicar estilos y 
    diseñar la presentación de una página. Puedes aplicar clases, estilos en línea o 
    reglas CSS externas para darl
  </p>

  </div>
  <section className="text-center mt-5"> 
  <SectionHeader
        subHeader={'Don\'t hesitate'}
        mainHeader={'Contact us'}
        />
        <div className="mt-5">
        <a className="text-4xl underline text-gray-500" href="tele:+57445112322 ">+57 445 112 322</a>
        </div>

      
  </section>
 


  </>
  
  );
}
