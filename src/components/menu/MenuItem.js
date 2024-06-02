export default function MenuItem(){
    return(

          <div className="bg-gray-200 p-4 rounded-lg text-center group
          hover:bg-white hover:shadow-2xl
          hover:shadow-black/75 transition-all">
            <div className="text-center ">
            <img src="/pizza.png" className="max-h-auto max-w-24 block mx-auto " alt="pizza" />
            </div>

               
                <h4 className="font-semibold text-xl my-3">
                    Peperoni Pizza 
                </h4>
                <p className="text-gray-500 text-sm">
                se utilizan para organizar y estructurar el contenido de una página web en secciones lógicas. 
                </p>
                <button className="mt-4 bg-primary text-white rounded-full px-8 py-2">
                    add to cart $12
                </button>
            </div>
    )
}