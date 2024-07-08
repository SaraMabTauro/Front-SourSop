/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import guana from "../images/guanabana.png"
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleFormulario = () => {
    navigate('/formulario');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-[-50px] left-[-50px] w-[300px] h-[300px] bg-green-400 rounded-full opacity-70"></div>
      <div className="absolute top-20 right-[-50px] w-[200px] h-[200px] bg-green-300 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green-200 rounded-full opacity-50"></div>
      <div className="absolute top-32 left-[80%] w-[100px] h-[100px] bg-green-500 rounded-full opacity-40"></div>
      <div className="absolute bottom-32 left-[-10%] w-[150px] h-[150px] bg-green-600 rounded-full opacity-50"></div>

      <div className="relative z-10 bg-green-200 p-10 rounded-lg shadow-2xl">
        <img src={guana} className="mx-auto h-16 w-16 mb-4 animate-pulse" />
        <h2 className="text-3xl text-green-800 text-center mb-8 font-semibold">SourSop</h2>
        <div className="mb-4">
          <label className="block text-green-800 text-sm mb-2 font-semibold" htmlFor="username">
            Usuario:
          </label>
          <div className='grid grid-cols-1'>
            <input
              className="placeholder:pl-1 md:pl-8 sm:pl-7 shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
            <UserIcon className="absolute mt-2 h-5 w-5 text-green-400 ml-2" />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-green-800 text-sm font-semibold mb-2" htmlFor="password">
            Contraseña:
          </label>

          <div className='grid grid-cols-1'>
            <input
              className="placeholder:pl-1 md:pl-8 sm:pl-7 shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
            />
            <LockClosedIcon className="absolute mt-2 h-5 w-5 text-green-400 ml-2" />

          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-500"
            type="button"
          >
            Iniciar Sesión
          </button>
        </div>
        <p className="mt-3 text-center text-sm text-gray-500 transition-all duration-500">
          ¿No eres miembro?{" "}
          <button
            onClick={handleFormulario}
            className="font-semibold leading-6 text-green-800 hover:text-green-700 transition-all duration-500"
          >
            ¡Empieza Ya!
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;