// src/components/Principal.tsx
import React from 'react';
import { FaThermometerHalf, FaTint, FaVial, FaLeaf, FaBolt, FaWater, FaFlask } from 'react-icons/fa';

const Principal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <h2 className="text-3xl font-bold text-green-800 mb-8">Monitoreo de Planta de Guanábana</h2>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ParameterCard icon={<FaVial />} title="pH" value="6.5" unit="" />
        <ParameterCard icon={<FaTint />} title="Humedad" value="65" unit="%" />
        <ParameterCard icon={<FaThermometerHalf />} title="Temperatura" value="25" unit="°C" />
        <ParameterCard icon={<FaLeaf />} title="Potasio" value="200" unit="ppm" />
        <ParameterCard icon={<FaLeaf />} title="Nitrógeno" value="150" unit="ppm" />
        <ParameterCard icon={<FaBolt />} title="Conductividad" value="1.2" unit="mS/cm" />
        <ParameterCard icon={<FaWater />} title="Agua Consumida" value="2.5" unit="L" />
        <ParameterCard icon={<FaFlask />} title="Fertilizante Consumido" value="50" unit="mL" />
      </div>
    </div>
  );
};

interface ParameterCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ icon, title, value, unit }) => (
  <div className="bg-gray-50 rounded-xl p-4 flex items-center space-x-4 transition-all hover:shadow-md hover:scale-105">
    <div className="text-3xl text-green-600">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-green-800">
        {value} <span className="text-sm font-normal text-gray-600">{unit}</span>
      </p>
    </div>
  </div>
);

export default Principal;