import Image from "next/image";
import Right from "../icons/Right";
export default function Hero(){
    
    return (
        <section className="hero mt-4">

            <div>
            <h1 className="text-4xl font-semibold py-6 ">
                Everyting<br /> is better<br />with a&nbsp;<span
                className="text-primary"
                >Pizza

                </span>
            </h1>
            <p className=" text-gray-500 text-sm py-3">
                Pizza is the, missing piece that makes every day complete,
                 a simple yet delicius joy in life
            </p>

            <div className="flex gap-4 text-sm">
                <button className="bg-primary uppercase flex gap-2 items-center text-white px-4 py-2 rounded-full">
                    order now 
                    <Right/>
                </button>
                <button className="flex gap-2 py-2 text-gray-600 font-semibold">
                    Lear more 
                    <Right/>
                </button>
            </div>
            </div>
           
            <div className="relative">
            <Image src={'/pizza.png'} layout ={'fill'} objectFit={'contain'} alt={'pizza'}></Image>
            </div>
           
        </section>
    )
}