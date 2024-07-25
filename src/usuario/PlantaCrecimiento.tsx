// src/components/Crecimiento.tsx
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

interface EstadoPlanta {
  estado_id: number;
  temperatura: number;
  humedad: number;
  conductividad: number;
}

interface Grow {
  id: number;
  altura: number;
}

const Crecimiento: React.FC = () => {
  const [plantHealth, setPlantHealth] = useState('');
  const [growthData, setGrowthData] = useState<EstadoPlanta[]>([]);
  const [currentHeight, setCurrentHeight] = useState<Grow[]>([]);
  const [heightChange, setHeightChange] = useState(0);
  const [estadoProbabilidades, setEstadoProbabilidades] = useState<{ deficiente: number, intermedio: number, optimo: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.REACT_APP_API_URL;

        const estadoResponse = await axios.get<EstadoPlanta[]>(`${baseUrl}/sensor/estado_planta`);
        setGrowthData(estadoResponse.data);

        const ultimosDatos = estadoResponse.data[estadoResponse.data.length - 1];
        const probabilidades = calcularProbabilidades(ultimosDatos);
        setEstadoProbabilidades(probabilidades);
        setPlantHealth(estadoDeSalud(probabilidades));

        const crecimientoResponse = await axios.get<Grow[]>(`${baseUrl}/sensor/crecimiento_planta`);
        const datosCrecimiento = crecimientoResponse.data;
        setCurrentHeight(datosCrecimiento);
        console.log(datosCrecimiento)

        // Calcular el cambio de altura
        if (datosCrecimiento.length > 1) {
          const ultimoRegistro = datosCrecimiento[datosCrecimiento.length - 1];
          const penultimoRegistro = datosCrecimiento[datosCrecimiento.length - 2];
          setHeightChange(ultimoRegistro.altura - penultimoRegistro.altura);
        } else if (datosCrecimiento.length === 1) {
          setHeightChange(0); // No hay penúltimo registro para comparar
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const calcularProbabilidades = (data: EstadoPlanta) => {
    // Aquí debes definir tu lógica de cálculo de probabilidades basándote en los datos del estado de la planta
    // Este es un ejemplo simple:
    const { temperatura, humedad, conductividad } = data;
    let deficiente = 0, intermedio = 0, optimo = 0;

    if (temperatura < 20 || temperatura > 30) deficiente += 1;
    else if (temperatura >= 20 && temperatura <= 25) optimo += 1;
    else intermedio += 1;

    if (humedad < 40 || humedad > 60) deficiente += 1;
    else if (humedad >= 40 && humedad <= 50) optimo += 1;
    else intermedio += 1;

    if (conductividad < 1 || conductividad > 3) deficiente += 1;
    else if (conductividad >= 1.5 && conductividad <= 2.5) optimo += 1;
    else intermedio += 1;

    const total = deficiente + intermedio + optimo;
    return {
      deficiente: (deficiente / total) * 100,
      intermedio: (intermedio / total) * 100,
      optimo: (optimo / total) * 100,
    };
  };

  const estadoDeSalud = (probabilidades: { deficiente: number, intermedio: number, optimo: number }) => {
    if (probabilidades.optimo >= 50) return 'Óptimo';
    if (probabilidades.intermedio >= 50) return 'Intermedio';
    return 'Deficiente';
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Crecimiento de la Planta</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Progreso de Crecimiento</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentHeight}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="id" />
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
            <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-center text-gray-700">
              Aproximadamente, la altura se incrementa en 2 cm cada mes.
            </div>
          </div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Estado de Salud</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Salud General</span>
              <span className="text-green-600 font-semibold">{plantHealth}</span>
            </div>
            {estadoProbabilidades && (
              <div className="mt-4">
                <p>Deficiente: {estadoProbabilidades.deficiente.toFixed(2)}%</p>
                <p>Intermedio: {estadoProbabilidades.intermedio.toFixed(2)}%</p>
                <p>Óptimo: {estadoProbabilidades.optimo.toFixed(2)}%</p>
              </div>
            )}
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