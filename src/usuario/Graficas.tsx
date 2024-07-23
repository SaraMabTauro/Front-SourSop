import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  fecha: string;
  riego: number;
  fertilizacion: number;
  consumo: number;
  temperatura: number;
  conductividad: number;
  humedad: number;
}

interface DispersionData {
  xi: number;
  fi: number;
  xifi: number;
  xiMenosX: number;
  fiPorXiMenosX: number;
  xiMenosXCuadrado: number;
  fiPorXiMenosXCuadrado: number;
}

interface AguaFertilizanteData {
  fecha: string;
  cantidad: number;
}

const Graficas: React.FC = () => {
  const [tendenciaCentral, setTendenciaCentral] = useState<DataPoint[]>([]);
  const [comparacionCentral, setComparacionCentral] = useState<DataPoint[]>([]);
  const [dispersion, setDispersion] = useState<DispersionData[]>([]);
  const [estadisticas, setEstadisticas] = useState<{ desviacion: number; media: number; varianza: number }>({ desviacion: 0, media: 0, varianza: 0 });
  const [agua, setAgua] = useState<AguaFertilizanteData[]>([]);
  const [fertilizante, setFertilizante] = useState<AguaFertilizanteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.REACT_APP_API_URL;
        const [tendenciaRes, comparacionRes, dispersionRes, estadisticasRes, aguaRes, fertilizanteRes] = await Promise.all([
          axios.get<DataPoint[]>(`${baseUrl}/api/tendencia-central`),
          axios.get<DataPoint[]>(`${baseUrl}/api/comparacion-central`),
          axios.get<DispersionData[]>(`${baseUrl}/api/dispersion`),
          axios.get<{ desviacion: number; media: number; varianza: number }>(`${baseUrl}/api/estadisticas`),
          axios.get<AguaFertilizanteData[]>(`${baseUrl}/api/agua`),
          axios.get<AguaFertilizanteData[]>(`${baseUrl}/api/fertilizante`),
        ]);

        setTendenciaCentral(tendenciaRes.data);
        setComparacionCentral(comparacionRes.data);
        setDispersion(dispersionRes.data);
        setEstadisticas(estadisticasRes.data);
        setAgua(aguaRes.data);
        setFertilizante(fertilizanteRes.data);
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

  if (loading) {
    return <div className="text-center py-10">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Dashboard de Monitoreo de Guanábana</h2>
      <div className="flex flex-col space-y-8">
        <ChartCard title="Tendencia Central">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={tendenciaCentral}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="riego" stroke="#8884d8" name="Riego" />
              <Line type="monotone" dataKey="fertilizacion" stroke="#82ca9d" name="Fertilización" />
              <Line type="monotone" dataKey="consumo" stroke="#ffc658" name="Consumo" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Comparación Central">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={comparacionCentral}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="temperatura" fill="#8884d8" name="Temperatura" />
              <Bar dataKey="conductividad" fill="#82ca9d" name="Conductividad" />
              <Bar dataKey="humedad" fill="#ffc658" name="Humedad" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Tabla de Dispersión">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">xi</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fi</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">xi.fi</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">xi - x̄</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fi.|xi - x̄|</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">(xi - x̄)²</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fi.(xi - x̄)²</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dispersion.map((item, index) => (
                  <tr key={index}>
                    <td className="px-3 py-4 whitespace-nowrap">{item.xi.toFixed(2)}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{item.fi}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{item.xifi.toFixed(2)}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{item.xiMenosX.toFixed(2)}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{item.fiPorXiMenosX.toFixed(2)}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{item.xiMenosXCuadrado.toFixed(2)}</td>
                    <td className="px-3 py-4 whitespace-nowrap">{item.fiPorXiMenosXCuadrado.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ChartCard>

        <ChartCard title="Consumo de Agua">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={agua}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#8884d8" name="Cantidad de Agua" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Consumo de Fertilizante">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={fertilizante}>
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
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Desviación Estándar:</span>
              <span>{estadisticas.desviacion.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Media:</span>
              <span>{estadisticas.media.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Varianza:</span>
              <span>{estadisticas.varianza.toFixed(2)}</span>
            </div>
          </div>
        </ChartCard>
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

export default Graficas;




// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// interface DataPoint {
//   fecha: string;
//   riego: number;
//   fertilizacion: number;
//   consumo: number;
//   temperatura: number;
//   conductividad: number;
//   humedad: number;
// }

// interface DispersionData {
//   xi: number;
//   fi: number;
//   xifi: number;
//   xiMenosX: number;
//   fiPorXiMenosX: number;
//   xiMenosXCuadrado: number;
//   fiPorXiMenosXCuadrado: number;
// }

// const generateRandomData = (count: number): DataPoint[] => {
//   return Array.from({ length: count }, (_, i) => ({
//     fecha: `2024-${String(i + 1).padStart(2, '0')}-01`,
//     riego: Math.random() * 100,
//     fertilizacion: Math.random() * 50,
//     consumo: Math.random() * 200,
//     temperatura: 20 + Math.random() * 10,
//     conductividad: Math.random() * 5,
//     humedad: 50 + Math.random() * 50
//   }));
// };

// const generateDispersionData = (count: number): DispersionData[] => {
//   const media = 50;
//   return Array.from({ length: count }, (_, i) => {
//     const xi = 40 + i * 2;
//     const fi = Math.floor(Math.random() * 10) + 1;
//     const xifi = xi * fi;
//     const xiMenosX = xi - media;
//     const fiPorXiMenosX = fi * Math.abs(xiMenosX);
//     const xiMenosXCuadrado = Math.pow(xiMenosX, 2);
//     const fiPorXiMenosXCuadrado = fi * xiMenosXCuadrado;
//     return { xi, fi, xifi, xiMenosX, fiPorXiMenosX, xiMenosXCuadrado, fiPorXiMenosXCuadrado };
//   });
// };

// const Graficas: React.FC = () => {
//   const [tendenciaCentral, setTendenciaCentral] = useState<DataPoint[]>([]);
//   const [comparacionCentral, setComparacionCentral] = useState<DataPoint[]>([]);
//   const [dispersion, setDispersion] = useState<DispersionData[]>([]);
//   const [estadisticas, setEstadisticas] = useState<{ desviacion: number; media: number; varianza: number }>({ desviacion: 0, media: 0, varianza: 0 });

//   useEffect(() => {
//     const data = generateRandomData(12);
//     setTendenciaCentral(data);
//     setComparacionCentral(data);
//     setDispersion(generateDispersionData(10));
//     setEstadisticas({
//       desviacion: Math.random() * 10,
//       media: 50 + Math.random() * 10,
//       varianza: Math.random() * 100
//     });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">
//       <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Monitoreo</h2>
//       <div className="flex flex-col space-y-8">
//         <ChartCard title="Tendencia Central">
//           <ResponsiveContainer width="100%" height={400}>
//             <LineChart data={tendenciaCentral}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="fecha" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="riego" stroke="#8884d8" name="Riego" />
//               <Line type="monotone" dataKey="fertilizacion" stroke="#82ca9d" name="Fertilización" />
//               <Line type="monotone" dataKey="consumo" stroke="#ffc658" name="Consumo" />
//             </LineChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Comparación Central">
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={comparacionCentral}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="fecha" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="temperatura" fill="#8884d8" name="Temperatura" />
//               <Bar dataKey="conductividad" fill="#82ca9d" name="Conductividad" />
//               <Bar dataKey="humedad" fill="#ffc658" name="Humedad" />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         <ChartCard title="Tabla de Dispersión">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">xi</th>
//                   <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fi</th>
//                   <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">xi.fi</th>
//                   <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">xi - x̄</th>
//                   <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fi.|xi - x̄|</th>
//                   <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">(xi - x̄)²</th>
//                   <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">fi.(xi - x̄)²</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {dispersion.map((item, index) => (
//                   <tr key={index}>
//                     <td className="px-3 py-4 whitespace-nowrap">{item.xi.toFixed(2)}</td>
//                     <td className="px-3 py-4 whitespace-nowrap">{item.fi}</td>
//                     <td className="px-3 py-4 whitespace-nowrap">{item.xifi.toFixed(2)}</td>
//                     <td className="px-3 py-4 whitespace-nowrap">{item.xiMenosX.toFixed(2)}</td>
//                     <td className="px-3 py-4 whitespace-nowrap">{item.fiPorXiMenosX.toFixed(2)}</td>
//                     <td className="px-3 py-4 whitespace-nowrap">{item.xiMenosXCuadrado.toFixed(2)}</td>
//                     <td className="px-3 py-4 whitespace-nowrap">{item.fiPorXiMenosXCuadrado.toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </ChartCard>

//         <ChartCard title="Estadísticas">
//           <div className="flex flex-col space-y-4">
//             <div className="flex justify-between">
//               <span className="font-semibold">Desviación Estándar:</span>
//               <span>{estadisticas.desviacion.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-semibold">Media:</span>
//               <span>{estadisticas.media.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="font-semibold">Varianza:</span>
//               <span>{estadisticas.varianza.toFixed(2)}</span>
//             </div>
//           </div>
//         </ChartCard>
//       </div>
//     </div>
//   );
// };

// const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
//   <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
//     <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">{title}</h3>
//     {children}
//   </div>
// );


// export default Graficas;