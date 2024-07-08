// src/components/Principal.tsx
import React from 'react';

const Principal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Información General</h2>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Estado Actual</h3>
        <p className="text-gray-600">Parámetro 1: Valor</p>
        <p className="text-gray-600">Parámetro 2: Valor</p>
        <p className="text-gray-600">Parámetro 3: Valor</p>
      </div>
    </div>
  );
};

export default Principal;
