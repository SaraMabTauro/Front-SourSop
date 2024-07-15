// src/App.tsx
// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthProvider';
// import HomePage from './components/HomePage';
// import FertilizanteRiego from './usuario/FertilizanteRiego';
// import Principal from './pages/Principal';
// import Crecimiento from './usuario/PlantaCrecimiento';
// import MateriasPrimas from './usuario/MateriaPrima';
// import Graficas from './usuario/Graficas';
// import Login from './components/Login';
// import Formulario from "./components/Formulario"
// import Layout from './layout/Layout';
// import Page404 from './pages/Page404';
// import Historial from './usuario/Historial';
// import Index from './pages/Index';

// const App: React.FC = () => {
//   return (
//         <BrowserRouter>
//           <AuthProvider>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={<HomePage />} />
//               <Route path="/formulario" element={<Formulario />} />
//               <Route path="/homePage" element={<HomePage />} />
//               <Route path='/404' element={<Page404/>}/>

//               <Route
//                 path="/dash/*"
//                 element={
//                   <Layout>
//                     <Routes>
//                       <Route index element={<Index />} />
//                       <Route path='principal' element={<Principal/>}/>
//                       <Route path="ruta" element={<FertilizanteRiego />} />
//                       <Route path="graficas" element={<Graficas/>} />
//                       <Route path="materia" element={<MateriasPrimas />} />
//                       <Route path="crecimiento" element={<Crecimiento />} />
//                       <Route path='historial' element={<Historial/>} />
//                     </Routes>
//                   </Layout>
//                 }
//               />
//             </Routes>
//           </AuthProvider>
//         </BrowserRouter>
//       );
// }

// export default App;


// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthProvider';
import HomePage from './components/HomePage';
import FertilizanteRiego from './usuario/FertilizanteRiego';
import Principal from './pages/Principal';
import Crecimiento from './usuario/PlantaCrecimiento';
import MateriasPrimas from './usuario/MateriaPrima';
import Graficas from './usuario/Graficas';
import Login from './components/Login';
import Formulario from "./components/Formulario"
import Layout from './layout/Layout';
import Page404 from './pages/Page404';
import Historial from './usuario/Historial';
import Index from './pages/Index';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/homePage" element={<HomePage />} />

          <Route
            path="/dash/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route index element={<Index />} />
                    <Route path='principal' element={<Principal/>}/>
                    <Route path="ruta" element={<FertilizanteRiego />} />
                    <Route path="graficas" element={<Graficas/>} />
                    <Route path="materia" element={<MateriasPrimas />} />
                    <Route path="crecimiento" element={<Crecimiento />} />
                    <Route path='historial' element={<Historial/>} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Ruta para capturar todas las rutas no definidas */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;