// // src/components/MateriasPrimas.tsx
// import React from 'react';
// import { BeakerIcon, CloudIcon } from '@heroicons/react/24/outline'; // Asegúrate de importar los iconos correctos
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLeaf } from "@fortawesome/free-solid-svg-icons";
// import WaterTank from '../pages/ContenedorAgua';
// import FertilizerTank from '../pages/ContenedorFertilizante';

// const MateriasPrimas: React.FC = () => {

//     // const [waterLevel, setWaterLevel] = useState(100);

//   // useEffect(() => {
//   //   // Simula la obtención de datos del sensor
//   //   const interval = setInterval(() => {
//   //     const newLevel = Math.floor(Math.random() * 101); // Simulación de datos aleatorios
//   //     setWaterLevel(newLevel);
//   //   }, 2000);

//   //   return () => clearInterval(interval);
//   // }, []);


//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6"> {/* Añadido espacio entre los elementos */}
//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center mb-4">
//           <CloudIcon className="h-6 w-6 text-blue-500 mr-2" />
//           <div>
//             <h3 className="text-lg font-medium text-gray-700">Suministro de Agua</h3>
//             <p className="text-gray-500">Descripción o cantidad de agua</p>
//           </div>
//         </div>
//         <WaterTank level={95}/>
//       </div>

//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center mb-4">
//           <BeakerIcon className="h-6 w-6 text-green-500 mr-2" />
//           <div>
//             <h3 className="text-lg font-medium text-gray-700">Suministro de Fertilizante</h3>
//             <p className="text-gray-500">Descripción o cantidad de fertilizante</p>
//           </div>
//         </div>
//         <FertilizerTank level={96}/>
//       </div>

//       <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center">
//           <FontAwesomeIcon icon={faLeaf} className="h-6 w-6 text-yellow-500 mr-2" />
//           <div>
//             <h3 className="text-lg font-medium text-gray-700">Cantidad de Plantas</h3>
//             <p className="text-gray-500">Número de plantas</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MateriasPrimas;

// src/components/MateriasPrimas.tsx
import React from 'react';
import { BeakerIcon, CloudIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import WaterTank from '../pages/ContenedorAgua';
import FertilizerTank from '../pages/ContenedorFertilizante';
import Planta from "../images/plant.webp"

const MateriasPrimas: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <CloudIcon className="h-6 w-6 text-blue-500 mr-2" />
          <div>
            <h3 className="text-lg font-medium text-gray-700">Suministro de Agua</h3>
            <p className="text-gray-500">Nivel actual: 30%</p>
          </div>
        </div>
        <div className="flex justify-center">
          <WaterTank level={30}/>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-4">
          <BeakerIcon className="h-6 w-6 text-green-500 mr-2" />
          <div>
            <h3 className="text-lg font-medium text-gray-700">Suministro de Fertilizante</h3>
            <p className="text-gray-500">Nivel actual: 0%</p>
          </div>
        </div>
        <div className="flex justify-center">
          <FertilizerTank level={32}/>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faLeaf} className="h-6 w-6 text-yellow-500 mr-2" />
          <div>
            <h3 className="text-lg font-medium text-gray-700">Cantidad de Plantas</h3>
            <p className="text-gray-500">Número de plantas</p>
          </div>
          <img src={Planta} alt="Planta de Guanábana" className="w-1/3 h-auto mx-2" />
        </div>
      </div>
    </div>
  );
};

export default MateriasPrimas;