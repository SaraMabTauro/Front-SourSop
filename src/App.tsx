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


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Formulario from './components/Formulario';
import Principal from './pages/Principal';
import FertilizanteRiego from './usuario/FertilizanteRiego'
import Graficas from './usuario/Graficas'
import Materia from './usuario/MateriaPrima'
import Planta from './usuario/PlantaCrecimiento'
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/homePage" element={<HomePage />} />

          <Route
            path="/dash/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<Principal />} />
                  <Route path="ruta" element={<FertilizanteRiego />} />
                  <Route path="tiempo" element={<Tiempo />} />
                  <Route path="historial" element={<Historial />} />
                  <Route path="comunidad" element={<Comunidad />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
