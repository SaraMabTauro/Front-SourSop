import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SensorData {
  fecha: string;
  temperatura: number;
  humedad: number;
  conductividad: number;
}

interface ConsumoData {
  fecha: string;
  cantidad: number;
  litros_por_minuto: number;
}

interface EstadoPlanta {
  estado_id: number;
  temperatura: number;
  humedad: number;
  conductividad: number;
}

interface EstadoPlantaCalculado {
  estado: string;
  probabilidad: number;
}

const Graficas: React.FC = () => {
  const [lecturasSensor, setLecturasSensor] = useState<SensorData[]>([]);
  const [consumoAgua, setConsumoAgua] = useState<ConsumoData[]>([]);
  const [consumoFertilizante, setConsumoFertilizante] = useState<ConsumoData[]>([]);
  const [estadoPlanta, setEstadoPlanta] = useState<EstadoPlantaCalculado | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.REACT_APP_API_URL;
        const [lecturasRes, aguaRes, fertilizanteRes, estadoRes] = await Promise.all([
          axios.get<SensorData[]>(`${baseUrl}/sensor/estado_planta`),
          axios.get<ConsumoData[]>(`${baseUrl}/sensor/consumo_agua`),
          axios.get<ConsumoData[]>(`${baseUrl}/sensor/consumo_fertilizante`),
          axios.get<EstadoPlanta>(`${baseUrl}/sensor/estado_planta`),
        ]);

        setLecturasSensor(lecturasRes.data);
        setConsumoAgua(aguaRes.data);
        setConsumoFertilizante(fertilizanteRes.data);

        // Asegúrate de que estadoRes.data es un arreglo y tiene elementos
        if (Array.isArray(estadoRes.data) && estadoRes.data.length > 0) {
          const ultimoEstado = estadoRes.data[estadoRes.data.length - 1];
          const estadoCalculado = calcularEstadoPlanta(ultimoEstado);
          setEstadoPlanta(estadoCalculado);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Hubo un error al cargar los datos. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calcularEstadoPlanta = (data: EstadoPlanta): EstadoPlantaCalculado => {
    let estado = 'Deficiente';
    let probabilidad = 0;

    // Calcular probabilidad para la humedad
    if (data.humedad >= 70 && data.humedad <= 85) {
      probabilidad += 0.4;
    } else if (data.humedad >= 50 && data.humedad < 70) {
      probabilidad += 0.2;
    } else {
      probabilidad += 0.1;
    }

    // Calcular probabilidad para la temperatura
    if (data.temperatura >= 25 && data.temperatura <= 30) {
      probabilidad += 0.4;
    } else if (data.temperatura >= 15 && data.temperatura < 25) {
      probabilidad += 0.2;
    } else {
      probabilidad += 0.1;
    }

    // Calcular probabilidad para la conductividad
    if (data.conductividad >= 1 && data.conductividad <= 3) {
      probabilidad += 0.2;
    } else if (data.conductividad > 0.5 && data.conductividad < 1) {
      probabilidad += 0.1;
    } else {
      probabilidad += 0.1;
    }

    // Calcular el estado final basado en la probabilidad acumulada
    if (probabilidad >= 0.8) {
      estado = 'Óptimo';
    } else if (probabilidad >= 0.4) {
      estado = 'Intermedio';
    } else {
      estado = 'Deficiente';
    }

    return { estado, probabilidad };
  };

  if (loading) {
    return <div className="text-center py-10">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  const calcularEstadisticas = (data: number[]) => {
    const n = data.length;
    const media = data.reduce((a, b) => a + b, 0) / n;
    const varianza = data.reduce((a, b) => a + Math.pow(b - media, 2), 0) / n;
    const desviacion = Math.sqrt(varianza);
    return { media, varianza, desviacion };
  };

  const estadisticasTemperatura = calcularEstadisticas(lecturasSensor.map(d => d.temperatura));
  const estadisticasHumedad = calcularEstadisticas(lecturasSensor.map(d => d.humedad));
  const estadisticasConductividad = calcularEstadisticas(lecturasSensor.map(d => d.conductividad));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Dashboard de Monitoreo de Guanábana</h2>
      <div className="flex flex-col space-y-8">
        <ChartCard title="Lecturas del Sensor">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={lecturasSensor}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperatura" stroke="#8884d8" name="Temperatura" />
              <Line type="monotone" dataKey="humedad" stroke="#82ca9d" name="Humedad" />
              <Line type="monotone" dataKey="conductividad" stroke="#ffc658" name="Conductividad" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Consumo de Agua">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={consumoAgua}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#8884d8" name="Cantidad de Agua" />
              <Bar dataKey="litros_por_minuto" fill="#82ca9d" name="Litros por Minuto" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Consumo de Fertilizante">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={consumoFertilizante}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#82ca9d" name="Cantidad de Fertilizante" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Estadísticas">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <EstadisticasCard titulo="Temperatura" stats={estadisticasTemperatura} />
            <EstadisticasCard titulo="Humedad" stats={estadisticasHumedad} />
            <EstadisticasCard titulo="Conductividad" stats={estadisticasConductividad} />
          </div>
        </ChartCard>

        {estadoPlanta && (
          <ChartCard title="Estado de la Planta">
            <div className="text-center">
              <p className="text-xl font-semibold">{estadoPlanta.estado}</p>
              <p className="text-lg">Probabilidad: {(estadoPlanta.probabilidad * 100).toFixed(2)}%</p>
            </div>
          </ChartCard>
        )}
      </div>
    </div>
  );
};

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
    <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">{title}</h3>
    {children}
  </div>
);

const EstadisticasCard: React.FC<{ titulo: string; stats: { media: number; varianza: number; desviacion: number } }> = ({ titulo, stats }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h4 className="text-lg font-semibold mb-2">{titulo}</h4>
    <p>Media: {stats.media.toFixed(2)}</p>
    <p>Varianza: {stats.varianza.toFixed(2)}</p>
    <p>Desviación Estándar: {stats.desviacion.toFixed(2)}</p>
  </div>
);

export default Graficas;