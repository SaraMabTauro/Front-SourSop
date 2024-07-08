// src/components/Crecimiento.tsx
import React from 'react';
import Planta from '../images/nppwja6j.png'; // Asegúrate de tener esta imagen en tu carpeta assets

const Crecimiento: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Crecimiento de la Planta</h2>
      <div className="flex">
        <img src={Planta} alt="Planta de Guanábana" className="w-1/3 h-auto" />
        <div className="ml-4">
          <h3 className="text-xl font-medium text-gray-700 mb-4">Proyecciones y Datos Actuales</h3>
          <p className="text-gray-600">Altura: 120 cm</p>
          <p className="text-gray-600">Crecimiento semanal: 3 cm</p>
          <p className="text-gray-600">Estado de Salud: Bueno</p>
        </div>
      </div>
    </div>
  );
};

export default Crecimiento;
