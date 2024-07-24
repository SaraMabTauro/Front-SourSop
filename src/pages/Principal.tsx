// import React, { useEffect, useState } from 'react';
// import { FaThermometerHalf, FaTint, FaCloudscale, FaBolt, FaWater } from 'react-icons/fa';
// import { io } from 'socket.io-client';

// const Principal: React.FC = () => {
//   const [sensorData, setSensorData] = useState<Record<string, string | number | null>>({
//     humedad: null,
//     temperatura: null,
//     conductividad: null,
//     aguaConsumida: null,
//     litrosPorMinuto: null,
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log('Token del usuario:', token);
//     const socket = io(process.env.REACT_APP_SOCKET_IO_API || 'http://localhost:3005', {
//       extraHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     socket.on('connect', () => {
//       console.log('Conexión Socket.IO establecida');
//     });

//     socket.on('ph', (data: { humedad: number; temperatura: number; conductividad: number }) => {
//       console.log('Datos recibidos del evento ph:', data);
//       setSensorData(prevData => ({
//         ...prevData,
//         humedad: data.humedad,
//         temperatura: data.temperatura,
//         conductividad: data.conductividad,
//       }));
//     });

//     socket.on('flujoAgua', (data: { litrosPorMinuto: number; totalConsumido?: number }) => {
//       console.log('Datos recibidos del evento flujoAgua:', data);
//       setSensorData(prevData => ({
//         ...prevData,
//         litrosPorMinuto: data.litrosPorMinuto,
//         aguaConsumida: data.totalConsumido !== undefined ? data.totalConsumido : prevData.aguaConsumida,
//       }));
//     });

//     socket.on('disconnect', () => {
//       console.log('Conexión Socket.IO cerrada');
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   // Verifica el estado actual del sensorData
//   console.log('Estado actual del sensorData:', sensorData);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
//       <h2 className="text-3xl font-bold text-green-800 mb-8">Monitoreo de Planta de Guanábana</h2>
//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <ParameterCard icon={<FaTint />} title="Humedad" value={sensorData.humedad} unit="%" />
//         <ParameterCard icon={<FaThermometerHalf />} title="Temperatura" value={sensorData.temperatura} unit="°C" />
//         <ParameterCard icon={<FaBolt />} title="Conductividad" value={sensorData.conductividad} unit="mS/cm" />
//         <ParameterCard icon={<FaWater />} title="Agua Consumida" value={sensorData.aguaConsumida} unit="L" />
//         <ParameterCard icon={<FaCloudscale />} title="Litros por minuto" value={sensorData.litrosPorMinuto} unit="L/min" />
//       </div>
//     </div>
//   );
// };

// interface ParameterCardProps {
//   icon: React.ReactNode;
//   title: string;
//   value: string | number | null;
//   unit: string;
// }

// const ParameterCard: React.FC<ParameterCardProps> = ({ icon, title, value, unit }) => (
//   <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4 transition-all hover:shadow-md hover:scale-105">
//     <div className="text-3xl text-green-600">{icon}</div>
//     <div>
//       <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
//       <p className="text-2xl font-bold text-green-800">
//         {value !== null ? (
//           <>
//             {value} <span className="text-sm font-normal text-gray-600">{unit}</span>
//           </>
//         ) : (
//           <span className="text-sm font-normal text-gray-600">Sin datos actualmente</span>
//         )}
//       </p>
//     </div>
//   </div>
// );

// export default Principal;

import React, { useEffect, useState } from 'react';
import { FaThermometerHalf, FaTint, FaCloudscale, FaBolt, FaWater } from 'react-icons/fa';
import { io, Socket } from 'socket.io-client';

interface SensorData {
  humedad: number | null;
  temperatura: number | null;
  conductividad: number | null;
  aguaConsumida: number | null;
  litrosPorMinuto: number | null;
}

const Principal: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    humedad: null,
    temperatura: null,
    conductividad: null,
    aguaConsumida: null,
    litrosPorMinuto: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token del usuario:', token);
    const socket: Socket = io(process.env.REACT_APP_SOCKET_IO_API || 'http://localhost:3005', {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    socket.on('connect', () => {
      console.log('Conexión Socket.IO establecida');
    });

    socket.on('ph', (data: Partial<SensorData>) => {
      console.log('Datos recibidos del evento ph:', data);
      setSensorData(prevData => ({
        ...prevData,
        ...data,
      }));
    });

    socket.on('flujoAgua', (data: { litrosPorMinuto?: number; totalConsumido?: number }) => {
      console.log('Datos recibidos del evento flujoAgua:', data);
      setSensorData(prevData => ({
        ...prevData,
        litrosPorMinuto: data.litrosPorMinuto ?? prevData.litrosPorMinuto,
        aguaConsumida: data.totalConsumido ?? prevData.aguaConsumida,
      }));
    });

    socket.on('disconnect', () => {
      console.log('Conexión Socket.IO cerrada');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Verifica el estado actual del sensorData
  console.log('Estado actual del sensorData:', sensorData);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <h2 className="text-3xl font-bold text-green-800 mb-8">Monitoreo de Planta de Guanábana</h2>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ParameterCard icon={<FaTint />} title="Humedad" value={sensorData.humedad} unit="%" />
        <ParameterCard icon={<FaThermometerHalf />} title="Temperatura" value={sensorData.temperatura} unit="°C" />
        <ParameterCard icon={<FaBolt />} title="Conductividad" value={sensorData.conductividad} unit="mS/cm" />
        <ParameterCard icon={<FaWater />} title="Agua Consumida" value={sensorData.aguaConsumida} unit="L" />
        <ParameterCard icon={<FaCloudscale />} title="Litros por minuto" value={sensorData.litrosPorMinuto} unit="L/min" />
      </div>
    </div>
  );
};

interface ParameterCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | null;
  unit: string;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ icon, title, value, unit }) => (
  <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4 transition-all hover:shadow-md hover:scale-105">
    <div className="text-3xl text-green-600">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-green-800">
        {value !== null ? (
          <>
            {value.toFixed(2)} <span className="text-sm font-normal text-gray-600">{unit}</span>
          </>
        ) : (
          <span className="text-sm font-normal text-gray-600">Sin datos actualmente</span>
        )}
      </p>
    </div>
  </div>
);

export default Principal;