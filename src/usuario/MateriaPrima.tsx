// src/components/MateriasPrimas.tsx
import React, { useEffect, useState } from 'react';
import { BeakerIcon, CloudIcon } from '@heroicons/react/24/outline';
import WaterTank from '../pages/ContenedorAgua';
import FertilizerTank from '../pages/ContenedorFertilizante';
import { io } from 'socket.io-client';

const MateriasPrimas: React.FC = () => {

  const [waterLevel, setWaterLevel] = useState(0);
  const [fertilizerLevel, setFertilizerLevel] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io(process.env.REACT_APP_SOCKET_IO_API as string, {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    socket.on('connect', () => {
      console.log('Conexión Socket.IO establecida');
    });

    socket.on('nivelAgua', (level) => {
      setWaterLevel(level);
    });

    socket.on('nivelFertilizante', (level) => {
      setFertilizerLevel(level);
    });

    socket.on('disconnect', () => {
      console.log('Conexión Socket.IO cerrada');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-row space-x-6"> {/* Cambiado a flex-row y añadido space-x-6 */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <CloudIcon className="h-6 w-6 text-blue-500 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-gray-700">Suministro de Agua</h3>
              <p className="text-gray-500">Nivel actual: {waterLevel}%</p>
            </div>
          </div>
          <div className="flex justify-center">
            <WaterTank level={waterLevel} />
          </div>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <BeakerIcon className="h-6 w-6 text-green-500 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-gray-700">Suministro de Fertilizante</h3>
              <p className="text-gray-500">Nivel actual: {fertilizerLevel}%</p>
            </div>
          </div>
          <div className="flex justify-center">
            <FertilizerTank level={fertilizerLevel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriasPrimas;