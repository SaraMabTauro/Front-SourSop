// src/components/MateriasPrimas.tsx
import React, { useEffect, useState } from 'react';
import { BeakerIcon, CloudIcon } from '@heroicons/react/24/outline';
import WaterTank from '../pages/ContenedorAgua';
import FertilizerTank from '../pages/ContenedorFertilizante';
import { io } from 'socket.io-client';

// Define interfaces for the received data
interface NivelAguaData {
  sensorState: 'hay agua' | 'no hay agua';
}

interface FlujoAguaData {
  litrosPorMinuto: number;
  totalConsumido: number;
}

const MateriasPrimas: React.FC = () => {
  const [waterLevel, setWaterLevel] = useState<number>(() => {
    // Retrieve initial water level from localStorage
    const savedWaterLevel = localStorage.getItem('waterLevel');
    return savedWaterLevel ? Number(savedWaterLevel) : 0;
  });
  const [fertilizerLevel, setFertilizerLevel] = useState<number>(() => {
    // Retrieve initial fertilizer level from localStorage
    const savedFertilizerLevel = localStorage.getItem('fertilizerLevel');
    return savedFertilizerLevel ? Number(savedFertilizerLevel) : 0;
  });
  const [flowRate, setFlowRate] = useState<FlujoAguaData | null>(null);

  const TANK_CAPACITY_LITERS = 20; // Capacidad del estanque en litros

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io(process.env.REACT_APP_SOCKET_IO_API || 'http://localhost:3005', {
      extraHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    socket.on('connect', () => {
      console.log('Conexión Socket.IO establecida');
    });

    socket.on('nivelAgua', (data: NivelAguaData) => {
      console.log('Datos de nivel de agua recibidos:', data);
      let newWaterLevel: number | undefined;
      if (data.sensorState === 'hay agua') {
        newWaterLevel = 100;
      } else if (data.sensorState === 'no hay agua') {
        newWaterLevel = 0;
      }

      if (newWaterLevel !== undefined) {
        setWaterLevel(newWaterLevel);
        localStorage.setItem('waterLevel', newWaterLevel.toString());
      }
    });

    socket.on('nivelFertilizante', (data: number) => {
      console.log('Datos de nivel de fertilizante recibidos:', data);
      setFertilizerLevel(data);
      localStorage.setItem('fertilizerLevel', data.toString());
    });

    socket.on('flujoAgua', (data: FlujoAguaData) => {
      console.log('Datos de flujo de agua recibidos:', data);
      setFlowRate(data);

      // Restar el agua consumida al nivel actual
      setWaterLevel(prevLevel => {
        if (prevLevel === 0 || data.litrosPorMinuto === 0) return prevLevel;

        const litrosConsumidos = data.litrosPorMinuto;
        const newLevel = prevLevel - (litrosConsumidos / TANK_CAPACITY_LITERS) * 100;

        const finalLevel = Math.max(newLevel, 0); // Asegurarse de que el nivel no sea menor que 0
        localStorage.setItem('waterLevel', finalLevel.toString());
        return finalLevel;
      });
    });

    socket.on('disconnect', () => {
      console.log('Conexión Socket.IO cerrada');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="w-full bg-white rounded-lg shadow-lg p-6">
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

        <div className="w-full bg-white rounded-lg shadow-lg p-6">
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

        <div className="w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <BeakerIcon className="h-6 w-6 text-red-500 mr-2" />
            <div>
              <h3 className="text-lg font-medium text-gray-700">Flujo de Agua</h3>
              <p className="text-gray-500">Litros por Minuto: {flowRate ? flowRate.litrosPorMinuto : 'Cargando...'}</p>
              <p className="text-gray-500">Total Consumido: {flowRate ? flowRate.totalConsumido : 'Cargando...'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MateriasPrimas;
