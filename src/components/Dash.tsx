import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import guana from "../images/guanabana.png";
import {
  faHome,
  faPowerOff,
  faHandHoldingDroplet,
  faChartLine,
  faBoxOpen,
  faSeedling,
  faBookBookmark
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthProvider";

interface LinkItem {
  name: string;
  icon: any;
  to: string;
}

const links: LinkItem[] = [
  { name: "Principal", icon: faHome, to: '/dash/principal' },
  { name: "Riego", icon: faHandHoldingDroplet, to: '/dash/ruta' },
  { name: "Análisis", icon: faChartLine, to: '/dash/graficas' },
  { name: "Inventario", icon: faBoxOpen, to: '/dash/materia' },
  { name: "Crecimiento", icon: faSeedling, to: '/dash/crecimiento'},
  { name: "Historial", icon: faBookBookmark, to: '/dash/historial'}
];

const Dash: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogOut = () => {
    logout();
    navigate('/')
  }

  const handleIndex = () => {
    navigate('/dash')
  }

  return (
    <div className="w-80 h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex flex-col p-4">
      <nav className="w-full flex-grow bg-white bg-opacity-40 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <button onClick={handleIndex} className="flex items-center justify-center py-8 px-6 bg-gradient-to-r from-green-400 to-emerald-500">
          <img src={guana} alt="SourSop" className="h-16 w-16 mr-4 rounded-full shadow-lg" />
          <div>
            <h1 className="text-3xl font-bold text-white tracking-wider">SourSop</h1>
            <span className="text-xs text-green-100 tracking-widest uppercase">Dashboard</span>
          </div>
        </button>
        
        <div className="flex-grow overflow-y-auto mt-8 px-4">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) => `
                flex items-center px-6 py-4 my-2 rounded-xl transition-all duration-300 ease-in-out
                ${isActive 
                  ? "bg-green-500 text-white shadow-lg transform scale-105" 
                  : "text-gray-700 hover:bg-white hover:bg-opacity-50 hover:shadow-md"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <FontAwesomeIcon icon={link.icon} className={`h-5 w-5 mr-4 ${isActive ? 'text-white' : 'text-green-500'}`} />
                  <span className="text-sm font-medium">{link.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
        
        <div className="mt-auto p-4">
          <hr className="border-green-200 my-6"/>
          <button onClick={handleLogOut} className="w-full px-6 py-3 bg-red-500 text-white rounded-xl text-sm font-medium transition-all duration-300 ease-in-out hover:bg-red-600 hover:shadow-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faPowerOff} className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dash;