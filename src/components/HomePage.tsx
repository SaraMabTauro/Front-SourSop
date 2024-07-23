import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CloudIcon, BeakerIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-emerald-600">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">SourSop</h1>
          <p className="text-xl md:text-2xl">La revolución en el cultivo automatizado</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Optimiza tu cultivo con tecnología de punta</h2>
            <p className="text-lg text-white mb-8">Fertilización y riego automatizado con sensado inteligente para maximizar tu producción de guanábana.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => handleButtonClick('/login')}
                className="bg-white text-green-600 font-bold py-3 px-6 rounded-full hover:bg-green-100 transition duration-300"
              >
                Inicia Sesión
              </button>
              <button
                onClick={() => handleButtonClick('/formulario')}
                className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-green-600 transition duration-300"
              >
                Regístrate
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden md:block"
          >
            {/* Reemplazo de la imagen por un componente SVG o icono */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <svg className="w-full h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#10B981" d="M45,-52.9C57.4,-42.8,66.1,-27.9,69.9,-11.2C73.7,5.5,72.5,24,63.7,37.7C54.9,51.4,38.5,60.3,21.2,65.6C3.9,70.9,-14.2,72.6,-30.1,67C-45.9,61.4,-59.5,48.5,-67.3,32.6C-75.1,16.7,-77.1,-2.2,-71.4,-18.1C-65.8,-33.9,-52.4,-46.7,-38.1,-56.4C-23.8,-66.1,-8.6,-72.8,4.2,-77.8C17,-82.8,32.6,-86.1,45,-52.9Z" transform="translate(100 100)" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">SourSop</text>
              </svg>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8 text-white"
        >
          <FeatureCard
            icon={<CloudIcon className="h-12 w-12" />}
            title="Riego Inteligente"
            description="Optimiza el uso del agua con nuestro sistema de riego automatizado."
          />
          <FeatureCard
            icon={<BeakerIcon className="h-12 w-12" />}
            title="Fertilización Precisa"
            description="Distribuye los nutrientes de manera eficiente según las necesidades del cultivo."
          />
          <FeatureCard
            icon={<ChartBarIcon className="h-12 w-12" />}
            title="Monitoreo en Tiempo Real"
            description="Obtén datos precisos del estado de tus plantas y el entorno."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Planes y Precios</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PriceCard
              title="Básico"
              price="$3,700"
              features={[
                "Riego automatizado",
                "Fertilización básica",
                "Monitoreo estándar"
              ]}
            />
            <PriceCard
              title="Intermedio"
              price="$4,000"
              features={[
                "Todo lo del plan Básico",
                "Sensores avanzados",
                "Más parámetros de información",
                "Alertas personalizadas"
              ]}
            />
            <PriceCard
              title="Pro"
              price="$4,800"
              features={[
                "Todo lo del plan Intermedio",
                "Generación de informes PDF",
                "Personalización avanzada",
                "Soporte prioritario"
              ]}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-lg">
    <div className="text-green-300 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const PriceCard: React.FC<{ title: string; price: string; features: string[] }> = ({ title, price, features }) => (
  <div className="bg-white bg-opacity-20 p-6 rounded-xl backdrop-blur-lg text-white">
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-4xl font-bold mb-4">{price}</p>
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2">
          <CheckIcon className="h-5 w-5 mr-2 text-green-300" />
          {feature}
        </li>
      ))}
    </ul>
    <button className="w-full bg-white text-green-600 font-bold py-2 px-4 rounded-full hover:bg-green-100 transition duration-300">
      Seleccionar Plan
    </button>
  </div>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default HomePage;