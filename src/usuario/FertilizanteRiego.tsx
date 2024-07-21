import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FertilizanteRiego: React.FC = () => {
  const [riegoActivo, setRiegoActivo] = useState(false);
  const [fertilizacionActiva, setFertilizacionActiva] = useState(false);

  const toggleRiego = async () => {
    try {
      const response = await fetch('http://localhost:3080/api/riego', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: !riegoActivo }),
      });
      const data = await response.json();
      if (data.ison !== undefined) {
        setRiegoActivo(data.ison);
      }
    } catch (error) {
      console.error('Error al controlar el riego:', error);
    }
  };


  const toggleFertilizacion = () => setFertilizacionActiva(!fertilizacionActiva);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Control de Riego y Fertilización</h2>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-8">
        <ControlCard
          title="Control de Riego"
          time={30}
          isActive={riegoActivo}
          toggleAction={toggleRiego}
          activeColor="bg-green-500"
          hoverColor="hover:bg-green-600"
          icon="💧"
        />
        <ControlCard
          title="Control de Fertilización"
          time={20}
          isActive={fertilizacionActiva}
          toggleAction={toggleFertilizacion}
          activeColor="bg-blue-500"
          hoverColor="hover:bg-blue-600"
          icon="🌱"
        />
      </div>
    </div>
  );
};

interface ControlCardProps {
  title: string;
  time: number;
  isActive: boolean;
  toggleAction: () => void;
  activeColor: string;
  hoverColor: string;
  icon: string;
}

const ControlCard: React.FC<ControlCardProps> = ({
  title,
  time,
  isActive,
  toggleAction,
  activeColor,
  hoverColor,
  icon,
}) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg p-6 w-full max-w-sm ${isActive ? activeColor : ''} transition-colors duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className={`text-2xl font-semibold mb-4 ${isActive ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      <div className={`text-6xl mb-4 ${isActive ? 'text-white' : 'text-gray-600'}`}>{icon}</div>
      <p className={`text-lg mb-4 ${isActive ? 'text-white' : 'text-gray-600'}`}>Tiempo: {time} min</p>
      <button
        onClick={toggleAction}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors duration-300
          ${isActive ? 'bg-white text-gray-800 hover:bg-gray-200' : `${activeColor} ${hoverColor}`}`}
      >
        {isActive ? 'Detener' : 'Activar'}
      </button>
    </motion.div>
  );
};

export default FertilizanteRiego;