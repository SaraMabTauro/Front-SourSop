// src/components/Principal.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaTint, FaChartLine, FaClipboardList } from 'react-icons/fa';

const Index: React.FC = () => {
  // Aquí podrías obtener el nombre del usuario desde tu estado global o contexto
  const nombreUsuario = "Usuario";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-6">
        Bienvenido, {nombreUsuario}
      </h1>
      
      <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">Resumen del Cultivo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<FaLeaf />} title="Plantas Activas" value="24" />
          <StatCard icon={<FaTint />} title="Último Riego" value="Hace 2 horas" />
          <StatCard icon={<FaChartLine />} title="Crecimiento Promedio" value="2.5 cm/semana" />
          <StatCard icon={<FaClipboardList />} title="Tareas Pendientes" value="3" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickLinkCard to="/dash/ruta" title="Programar Riego" icon={<FaTint />} />
        <QuickLinkCard to="/dash/graficas" title="Ver Análisis" icon={<FaChartLine />} />
        <QuickLinkCard to="/dash/materia" title="Revisar Inventario" icon={<FaClipboardList />} />
        <QuickLinkCard to="/dash/historial" title="Consultar Historial" icon={<FaLeaf />} />
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value }) => (
  <div className="bg-green-50 rounded-lg p-4 flex items-center space-x-4">
    <div className="text-3xl text-green-600">{icon}</div>
    <div>
      <h3 className="text-sm font-medium text-green-800">{title}</h3>
      <p className="text-xl font-bold text-green-600">{value}</p>
    </div>
  </div>
);

interface QuickLinkCardProps {
  to: string;
  title: string;
  icon: React.ReactNode;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ to, title, icon }) => (
  <Link to={to} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center transition-all hover:shadow-lg hover:scale-105">
    <div className="text-4xl text-green-500 mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-green-700 text-center">{title}</h3>
  </Link>
);

export default Index;