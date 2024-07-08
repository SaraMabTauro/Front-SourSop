// src/components/FertilizanteRiego.tsx
import React from 'react';

const FertilizanteRiego: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Control de Riego y Fertilización</h2>
      <div className="flex space-x-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg">
          Controlar Riego
          <p className="text-sm mt-2">Tiempo: 30 min</p>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg">
          Controlar Fertilización
          <p className="text-sm mt-2">Tiempo: 20 min</p>
        </button>
      </div>
    </div>
  );
};

export default FertilizanteRiego;
