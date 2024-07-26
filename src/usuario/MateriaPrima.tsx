// // src/components/MateriasPrimas.tsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BeakerIcon, CloudIcon } from '@heroicons/react/24/outline';
// import WaterTank from '../pages/ContenedorAgua';
// import FertilizerTank from '../pages/ContenedorFertilizante';

// interface ConsumoAgua {
//   _id: number;
//   cantidad: number;
//   litros_por_minuto: number;
// }

// interface ConsumoFerti {
//   _id: number;
//   cantidad: number;
// }

// const MateriasPrimas: React.FC = () => {
//   const [waterLevel, setWaterLevel] = useState<number>(() => {
//     const savedWaterLevel = localStorage.getItem('waterLevel');
//     return savedWaterLevel ? Number(savedWaterLevel) : 0;
//   });
//   const [fertilizerLevel, setFertilizerLevel] = useState<number>(() => {
//     const savedFertilizerLevel = localStorage.getItem('fertilizerLevel');
//     return savedFertilizerLevel ? Number(savedFertilizerLevel) : 0;
//   });

//   const TANK_CAPACITY_LITERS = 20; // Capacidad del estanque en litros

//   useEffect(() => {
//     const fetchConsumptionData = async () => {
//       try {
//         const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';
        
//         // Fetch water consumption data
//         const waterResponse = await axios.get<ConsumoAgua[]>(`${baseUrl}/sensor/consumo_agua`);
//         const totalWaterConsumed = waterResponse.data.reduce((total, consumo) => total + consumo.cantidad, 0);
//         const newWaterLevel = Math.max(100 - (totalWaterConsumed / TANK_CAPACITY_LITERS) * 100, 0); // Calculate the new water level
//         setWaterLevel(newWaterLevel);
//         localStorage.setItem('waterLevel', newWaterLevel.toString());

//         // Fetch fertilizer consumption data
//         const fertilizerResponse = await axios.get<ConsumoFerti[]>(`${baseUrl}/sensor/consumo_fertilizante`);
//         const totalFertilizerConsumed = fertilizerResponse.data.reduce((total, consumo) => total + consumo.cantidad, 0);
//         setFertilizerLevel(totalFertilizerConsumed);
//         localStorage.setItem('fertilizerLevel', totalFertilizerConsumed.toString());
//       } catch (error) {
//         console.error('Error fetching consumption data:', error);
//       }
//     };

//     fetchConsumptionData();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
//         <div className="w-full bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center mb-4">
//             <CloudIcon className="h-6 w-6 text-blue-500 mr-2" />
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Suministro de Agua</h3>
//               <p className="text-gray-500">Nivel actual: {waterLevel}%</p>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <WaterTank level={waterLevel} />
//           </div>
//         </div>

//         <div className="w-full bg-white rounded-lg shadow-lg p-6">
//           <div className="flex items-center mb-4">
//             <BeakerIcon className="h-6 w-6 text-green-500 mr-2" />
//             <div>
//               <h3 className="text-lg font-medium text-gray-700">Suministro de Fertilizante</h3>
//               <p className="text-gray-500">Cantidad consumida: {fertilizerLevel} mL</p>
//             </div>
//           </div>
//           <div className="flex justify-center">
//             <FertilizerTank level={fertilizerLevel} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MateriasPrimas;


// src/components/MateriasPrimas.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BeakerIcon, CloudIcon } from '@heroicons/react/24/outline';
import WaterTank from '../pages/ContenedorAgua';
import FertilizerTank from '../pages/ContenedorFertilizante';

interface ConsumoAgua {
  _id: number;
  cantidad: number;
  litros_por_minuto: number;
}

interface ConsumoFerti {
  _id: number;
  cantidad: number;
}

const MateriasPrimas: React.FC = () => {
  const [waterData, setWaterData] = useState<ConsumoAgua[]>([]);
  const [fertilizerData, setFertilizerData] = useState<ConsumoFerti[]>([]);

  useEffect(() => {
    const fetchConsumptionData = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

        // Fetch water consumption data
        const waterResponse = await axios.get<ConsumoAgua[]>(`${baseUrl}/sensor/consumo_agua`);
        setWaterData(waterResponse.data);

        // Fetch fertilizer consumption data
        const fertilizerResponse = await axios.get<ConsumoFerti[]>(`${baseUrl}/sensor/consumo_fertilizante`);
        setFertilizerData(fertilizerResponse.data);
      } catch (error) {
        console.error('Error fetching consumption data:', error);
      }
    };

    fetchConsumptionData();
  }, []);

  // Define la capacidad máxima del tanque en litros
  const TANK_CAPACITY_LITERS = 100;

  // Acumulación de datos
  const totalWaterConsumed = waterData.reduce((total, consumo) => total + consumo.cantidad, 0);
  const totalFertilizerConsumed = fertilizerData.reduce((total, consumo) => total + consumo.cantidad, 0);

  // Calcula el porcentaje basado en la capacidad del tanque
  const waterPercentage = Math.min(100, (totalWaterConsumed / TANK_CAPACITY_LITERS) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <CloudIcon className="h-6 w-6 text-blue-500 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-gray-700">Suministro de Agua</h3>
              <p className="text-gray-500">Total consumido: {totalWaterConsumed} L</p>
            </div>
          </div>
          <div className="flex justify-center">
            <WaterTank level={waterPercentage} />
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <BeakerIcon className="h-6 w-6 text-green-500 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-gray-700">Suministro de Fertilizante</h3>
              <p className="text-gray-500">Cantidad consumida: {totalFertilizerConsumed} mL</p>
            </div>
          </div>
          <div className="flex justify-center">
            <FertilizerTank level={totalFertilizerConsumed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriasPrimas;



