// src/components/Crecimiento.tsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import Principal from '../pages/Principal';

const data = [
  { semana: '1', altura: 100 },
  { semana: '2', altura: 105 },
  { semana: '3', altura: 110 },
  { semana: '4', altura: 115 },
  { semana: '5', altura: 120 },
];

const Crecimiento: React.FC = () => {
  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Crecimiento de la Planta</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Progreso de Crecimiento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="altura" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div className="bg-green-50 rounded-xl p-6 shadow-sm mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Datos Actuales</h3>
            <DataCard 
              title="Altura" 
              value="120 cm" 
              change={"+5 cm"} 
              isPositive={true} 
            />
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Estado de Salud</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Salud General</span>
              <span className="text-green-600 font-semibold">Excelente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DataCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, change, isPositive }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm">
    <h4 className="text-sm font-medium text-gray-500 mb-2">{title}</h4>
    <div className="flex items-end justify-between">
      <span className="text-2xl font-bold text-gray-800">{value}</span>
      <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? (
          <ArrowUpIcon className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 mr-1" />
        )}
        <span className="text-sm font-medium">{change}</span>
      </div>
    </div>
  </div>
);

export default Crecimiento;