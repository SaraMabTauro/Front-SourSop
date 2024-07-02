import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faBicycle,
  faHandHoldingDroplet,
  faSignal,
  faBoxOpen,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

interface LinkItem {
  name: string;
  icon: any; 
  to: string;
}

const links: LinkItem[] = [
  { name: "Fertilizante y Riego", icon: faHandHoldingDroplet, to: '/dash/ruta' },
  { name: "Graficas", icon: faSignal, to: '/dash/graficas' },
  { name: "Materia Prima", icon: faBoxOpen, to: '/dash/materia' },
  { name: "Crecimiento", icon: faSeedling, to: '/dash/crecimiento'}
];

const Dash: React.FC = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    setLoggedOut(true);
    navigate('/')
  }; 

  return (
    <nav className="rounded-md w-72 h-screen flex flex-col justify-between bg-gradient-to-b from-green-500 to-green-800 text-white">
      <div>
        <div className="flex justify-center py-10 shadow-sm pr-4">
          <FontAwesomeIcon icon={faBicycle} className="h-14 w-14 text-white" />
          <div className="pl-2">
            <p className="text-2xl font-bold">SafeCycle</p>
            <span className="text-xs block">DASHBOARD</span>
          </div>
        </div>
        <div className="pl-10 pt-10 space-y-8 flex-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className="flex space-x-4 items-center hover:text-gray-200 cursor-pointer"
            >
              <FontAwesomeIcon icon={link.icon} className="h-6 w-6" />
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center py-5 text-center">
        <hr className="border-gray-200 w-full mb-5"/>
        <div>
          <FontAwesomeIcon icon={faPowerOff} className="h-6 w-6 mb-2" />
          <button onClick={handleLogout} className="text-white hover:text-gray-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );  
};

export default Dash;
