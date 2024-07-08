// import Dash from './components/Dash';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Dash/>
//     </div>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Layout from './layout/Layout';
// import Login from './components/Login';
// import Formulario from './components/Formulario';
// import Principal from './pages/Principal';
// import FertilizanteRiego from './usuario/FertilizanteRiego'
// import Graficas from './usuario/Graficas'
// import Materia from './usuario/MateriaPrima'
// import Planta from './usuario/PlantaCrecimiento'
// import { AuthProvider } from './context/AuthContext';
// import HomePage from './components/HomePage';

// const App: React.FC = () => {
//   return (
//     <BrowserRouter>
      
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<HomePage />} />
//           <Route path="/formulario" element={<Formulario />} />
//           {/* <Route path="/homePage" element={<HomePage />} /> */}

//           <Route
//             path="/dash/*"
//             element={
//               <Layout>
//                 <Routes>
//                   {/* <Route index element={<Principal />} />
//                   <Route path="ruta" element={<FertilizanteRiego />} />
//                   <Route path="tiempo" element={<Tiempo />} />
//                   <Route path="historial" element={<Historial />} />
//                   <Route path="comunidad" element={<Comunidad />} /> */}
//                 </Routes>
//               </Layout>
//             }
//           />
//         </Routes>
      
//     </BrowserRouter>
//   );
// };

// export default App;


// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
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

const App: React.FC = () => {
  return (
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/formulario" element={<Formulario />} />
              <Route path="/homePage" element={<HomePage />} />
              <Route path='/404' element={<Page404/>}/>

              <Route
                path="/dash/*"
                element={
                  <Layout>
                    <Routes>
                      <Route index element={<Principal />} />
                      <Route path="ruta" element={<FertilizanteRiego />} />
                      <Route path="graficas" element={<Graficas/>} />
                      <Route path="materia" element={<MateriasPrimas />} />
                      <Route path="crecimiento" element={<Crecimiento />} />
                    </Routes>
                  </Layout>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      );
}

export default App;
