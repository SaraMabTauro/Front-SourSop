// // src/components/HomePage.tsx
// import React from 'react';
// import { CloudIcon, BeakerIcon, AdjustmentsHorizontalIcon} from '@heroicons/react/24/outline'; 

// const HomePage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white">
//       <header className="p-6 text-center">
//         <h1 className="text-4xl font-bold">Proyecto SourSop</h1>
//         <p className="mt-4 text-lg">Fertilización y riego automatizado con sensado de cultivos</p>
//       </header>

//       <main className="flex flex-col items-center justify-center p-6">
//         <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 text-lime-800">
//           <h2 className="text-2xl font-semibold text-center mb-6">Características del Proyecto</h2>
//           <div className="flex items-center mb-4">
//             <CloudIcon className="h-8 w-8 text-blue-500 mr-3" />
//             <div>
//               <h3 className="text-xl font-medium">Riego Automatizado</h3>
//               <p className="text-gray-600">Sistema de riego controlado automáticamente para optimizar el uso del agua.</p>
//             </div>
//           </div>
//           <div className="flex items-center mb-4">
//             <BeakerIcon className="h-8 w-8 text-green-500 mr-3" />
//             <div>
//               <h3 className="text-xl font-medium">Fertilización Inteligente</h3>
//               <p className="text-gray-600">Distribución precisa de fertilizantes basada en las necesidades del cultivo.</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <AdjustmentsHorizontalIcon className="h-8 w-8 text-yellow-500 mr-3" />
//             <div>
//               <h3 className="text-xl font-medium">Sensores en el Cultivo</h3>
//               <p className="text-gray-600">Monitoreo en tiempo real del estado de las plantas y el entorno.</p>
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="p-6 text-center">
//         <p>© 2024 Proyecto SourSop. Todos los derechos reservados.</p>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;


import React from 'react';
import { CloudIcon, BeakerIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet, faInfo, faSackXmark } from "@fortawesome/free-solid-svg-icons";
import Agua from "../images/aguaDrop.jpg";
import Foto from "../images/img5.jpg";
import Venturi from "../images/venturi.jpg";
import fondo from "../images/findo3.jpg"
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/formulario')
  }

  const handleButtonLogin = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-300 to-green-600 text-white">
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src={fondo}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        />
        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>
        <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">SourSop es la mejor solución</h2>
            <p className="mt-6 text-lg leading-8 text-teal-700">Fertilización y riego automatizado con sensado de cultivos.</p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              <button onClick={handleButtonLogin} className="bg-gradient-to-r from-sky-700 via-teal-300 to-lime-600 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan-700 hover:via-blue-300 hover:to-lime-400">
                Inicia Sesión <span aria-hidden="true">&rarr;</span>
              </button>
              <button onClick={handleButtonClick} className='bg-gradient-to-r from-green-400 via-teal-300 to-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-teal-300 hover:via-green-400 hover:to-teal-600'>Crea tu cuenta <span aria-hidden="true">&rarr;</span></button>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-cyan-800">Piezas incluyen el kit</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">6</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-cyan-800">Prioriza tu cultivo</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">Preciso</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-cyan-800">Los componentes son portátiles</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">Práctico</dd>
              </div>
              <div className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-cyan-800">Resistente a todas condiciones</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">Durable</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <main className="flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 text-lime-800">
          <h2 className="text-2xl font-semibold text-center mb-6">Características:</h2>
          <div className="flex items-center mb-4">
            <CloudIcon className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <h3 className="text-xl font-medium">Riego Automatizado</h3>
              <p className="text-gray-600">Sistema de riego controlado automáticamente para optimizar el uso del agua.</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <BeakerIcon className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <h3 className="text-xl font-medium">Fertilización Inteligente</h3>
              <p className="text-gray-600">Distribución precisa de fertilizantes basada en las necesidades del cultivo.</p>
            </div>
          </div>
          <div className="flex items-center">
            <AdjustmentsHorizontalIcon className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <h3 className="text-xl font-medium">Sensores en el Cultivo</h3>
              <p className="text-gray-600">Monitoreo en tiempo real del estado de las plantas y el entorno.</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-3xl text-lime-800 mt-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Información sobre el Cultivo de Guanábana</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
              <img src={Foto} alt="Guanabana" className="w-24 h-24 rounded-lg mr-4" />
              <div>
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faInfo} className="h-6 w-6 text-blue-500 mr-2" />
                  <h3 className="text-xl font-medium">Requerimientos del Cultivo</h3>
                </div>
                <p className="text-gray-600">La guanábana requiere un clima tropical y suelos bien drenados. Necesita riego regular y una fertilización adecuada para un crecimiento óptimo.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
              <img src={Agua} alt="Riego por Goteo" className="w-24 h-24 rounded-lg mr-4" />
              <div>
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faDroplet} className="h-6 w-6 text-green-500 mr-2" />
                  <h3 className="text-xl font-medium">Sistema de Riego por Goteo</h3>
                </div>
                <p className="text-gray-600">El riego por goteo es un método eficiente que entrega agua directamente a las raíces de las plantas, reduciendo el desperdicio de agua y asegurando una distribución uniforme.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 flex items-center">
              <img src={Venturi} alt="Sistema Venturi" className="w-24 h-24 rounded-lg mr-4" />
              <div>
                <div className="flex items-center mb-2">
                  <FontAwesomeIcon icon={faSackXmark} className="h-6 w-6 text-yellow-500 mr-2" />
                  <h3 className="text-xl font-medium">Aplicación de Fertilizante con Sistema Venturi</h3>
                </div>
                <p className="text-gray-600">El sistema Venturi permite la inyección de fertilizantes en el sistema de riego, proporcionando nutrientes directamente a las raíces de las plantas. Esto asegura una alimentación precisa y eficiente.</p>
              </div>
            </div>
          </div>
        </div>
      </main>



      <footer className="p-6 text-center">
        <p>© 2024 Proyecto SourSop. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;


