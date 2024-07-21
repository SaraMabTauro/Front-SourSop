/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import guana from "../images/guanabana.png"
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthProvider';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/auth/login',{
        correo: correo,
        contraseña: contraseña
      });

      if (response.status === 200) {
        const { token, usuario } = response.data;

        const user = {
          _id: usuario.id,
          correo: usuario.email,
          nombre: usuario.nombre,
          apellidos: usuario.apellidos
        }

        login(user);
        localStorage.setItem('token', token);

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: `Bienvenido, ${user.nombre}!`,
          showConfirmButton: false,
          timer: 1500
        });

        navigate('/dash');
      }
    } catch (error) {
      console.error('Error en inicio de sesion', error);
      Swal.fire({
        icon: 'error',
        title:'Error en inicio de sesion',
        text: 'Credenciales inválidas. Por favor, intente de nuevo',
      });
    }
  }

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
        <form onSubmit={handleLogin}>
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
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <LockClosedIcon className="absolute mt-2 h-5 w-5 text-green-400 ml-2" />

          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-500"
            type="submit"
          >
            Iniciar Sesión
          </button>
        </div>
        
        </form>
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