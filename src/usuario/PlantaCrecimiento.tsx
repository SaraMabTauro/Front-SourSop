// src/components/Crecimiento.tsx
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import io from 'socket.io-client';


interface GrowthData {
  semana: string;
  altura: number;
}

const Crecimiento: React.FC = () => {
  const [plantHealth, setPlantHealth] = useState('');
  const [growthData, setGrowthData] = useState<GrowthData[]>([]);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [heightChange, setHeightChange] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io('http://tu-servidor-socket-io.com', {
      auth: {
        token: token
      }
    });

    socket.on('connect', () => {
      console.log('Conexión Socket.IO establecida para Crecimiento');
    });

    socket.on('plant_health', (health: string) => {
      setPlantHealth(health);
    });

    socket.on('growth_data', (data: GrowthData[]) => {
      setGrowthData(data);
      if (data.length > 0) {
        const lastWeek = data[data.length - 1];
        setCurrentHeight(lastWeek.altura);
        if (data.length > 1) {
          const previousWeek = data[data.length - 2];
          setHeightChange(lastWeek.altura - previousWeek.altura);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Conexión Socket.IO cerrada para Crecimiento');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Crecimiento de la Planta</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Progreso de Crecimiento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
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
              value={`${currentHeight} cm`} 
              change={`${heightChange > 0 ? '+' : ''}${heightChange} cm`} 
              isPositive={heightChange >= 0} 
            />
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Estado de Salud</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Salud General</span>
              <span className="text-green-600 font-semibold">{plantHealth}</span>
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