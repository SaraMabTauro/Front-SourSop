import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserIcon, EnvelopeIcon, LockClosedIcon, PencilIcon } from '@heroicons/react/24/solid';
import guana from "../images/guanabana.png"
import guanabana from "../images/guanabana (1).png"

const CreateUserForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!name || !surname || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, completa todos los campos para continuar",
      });
      return;
    }

    try {
      const userData = {
        nombre: name,
        apellidos: surname,
        correo: email,
        contraseña: password,
      };

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register` || 'http://127.0.0.1:5000', userData);
      console.log("Response:", response.data);

      if(response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Cuenta creada exitosamente!",
          text: "Gracias por registrarte en SourSop.",
          showConfirmButton: false,
          timer: 2000,
        });
      }

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde",
      });
    }
  };

  return (
    <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a8ff78] to-[#78ffd6] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      
      <div className="absolute top-0 left-0 w-24 h-24 bg-green-200 rounded-full opacity-50 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-300 rounded-full opacity-50 -z-10"></div>
      <div className="absolute top-10 right-20 w-16 h-16 bg-green-400 rounded-full opacity-50 -z-10"></div>
      
      <img
        src={guanabana}
        alt="Guanábana"
        className="absolute top-10 left-10 w-24 h-24 opacity-70 -z-10"
      />
      <div className="mx-auto max-w-2xl text-center">
        <img
          src={guana}
          alt="Encabezado"
          className="mx-auto h-16 w-16 mb-4"
        />
        <h2 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
          Crea tu cuenta
        </h2>
        <p className="mt-2 text-lg leading-8 text-green-600">
          Forma parte de SourSop y sus beneficios.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nombre:
            </label>
            <div className="relative mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              <UserIcon className="absolute top-3 left-3 h-5 w-5 text-green-400" />
            </div>
          </div>
          <div>
            <label
              htmlFor="surname"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Apellidos:
            </label>
            <div className="relative mt-2.5">
              <input
                type="text"
                name="surname"
                id="surname"
                autoComplete="family-name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              <PencilIcon className="absolute top-3 left-3 h-5 w-5 text-green-400" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email:
            </label>
            <div className="relative mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              <EnvelopeIcon className="absolute top-3 left-3 h-5 w-5 text-green-400" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Contraseña:
            </label>
            <div className="relative mt-2.5">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
              <LockClosedIcon className="absolute top-3 left-3 h-5 w-5 text-green-400" />
            </div>
          </div>
        </div> 
       
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;