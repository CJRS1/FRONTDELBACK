import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
import Usuario from '../src/components/TablaUsuarios'
import Asesor from '../src/components/TablaAsesores';
import Header from '../src/components/NavBarLat';
import Inicio from '../src/components/Inicio';
import Asignar from '../src/components/Asignar';
import MiInfo from '../src/components/MiInformacion';
import RegistrarAsesor from '../src/components/RegistrarAsesor'
import SubirArchivo from './components/SubirArchivo';
import EditarAsesor from './components/EditarAsesor';
import ServicioEspecialidad from './components/ServicioYEspecialidad';
import AsignarServicio from './components/AsignarServicio';
import LoginA from './components/Login';

import '../src/styles/variables.css';

function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login_a" element={<LoginA />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/asignar_usuario" element={<Asignar />} />
        <Route path="/mi_info" element={<MiInfo />} />

        <Route path="/asignar_servicio" element={<AsignarServicio />} />

        <Route path="/editar-asesor/:id" element={<EditarAsesor />} />
        <Route path="/servicio_especialidad" element={<ServicioEspecialidad />} />

        <Route path="/registrar_asesor" element={<RegistrarAsesor />} />
        <Route path="/subir_archivo" element={<SubirArchivo />} />
        <Route path="/tabla_usuarios" element={<Usuario />} />
        <Route path="/tabla_asesores" element={<Asesor />} />
      </Routes>

    </Router>
  );
}

export default App;
