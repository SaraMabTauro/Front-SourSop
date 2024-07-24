// src/components/Historial.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';

interface Medicion {
  id: number;
  fecha: string;
  humedad: number;
  temperatura: number;
  conductividad: number;
  aguaConsumida: number;
  fertilizanteConsumido: number;
}

const Historial: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [mediciones, setMediciones] = useState<Medicion[]>([]);
  const [medicionesFiltradas, setMedicionesFiltradas] = useState<Medicion[]>([]);

  useEffect(() => {
    const fetchMediciones = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/historial` || 'http://127.0.0.1:5000/historial');
        setMediciones(response.data);
        setMedicionesFiltradas(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMediciones();
  }, []);

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    const terminoBusqueda = e.target.value.toLowerCase();
    setBusqueda(terminoBusqueda);
    
    const filtradas = mediciones.filter(medicion => 
      medicion.fecha.toLowerCase().includes(terminoBusqueda)
    );
    setMedicionesFiltradas(filtradas);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4 sm:mb-6">Historial de Mediciones</h2>
      
      <div className="mb-4 sm:mb-6 flex">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar por fecha..."
            value={busqueda}
            onChange={handleBusqueda}
            className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
        <table className="w-full min-w-max">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Fecha</th>
              <th className="py-3 px-4 text-left">Humedad</th>
              <th className="py-3 px-4 text-left">Temperatura</th>
              <th className="py-3 px-4 text-left">Conductividad</th>
              <th className="py-3 px-4 text-left">Agua Consumida</th>
              <th className="py-3 px-4 text-left">Fertilizante Consumido</th>
            </tr>
          </thead>
          <tbody>
            {medicionesFiltradas.map((medicion) => (
              <tr key={medicion.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4 whitespace-nowrap"><FaCalendarAlt className="inline mr-2 text-green-500" />{medicion.fecha}</td>
                <td className="py-3 px-4 whitespace-nowrap">{medicion.humedad}%</td>
                <td className="py-3 px-4 whitespace-nowrap">{medicion.temperatura}°C</td>
                <td className="py-3 px-4 whitespace-nowrap">{medicion.conductividad} mS/cm</td>
                <td className="py-3 px-4 whitespace-nowrap">{medicion.aguaConsumida} L</td>
                <td className="py-3 px-4 whitespace-nowrap">{medicion.fertilizanteConsumido} mL</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historial;