import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Usuario from '../src/components/TablaUsuarios'
import Asesor from '../src/components/TablaAsesores';
import Header from '../src/components/NavBarLat';
import Inicio from '../src/components/Inicio';
import Asignar from '../src/components/Asignar';
import MiInfo from '../src/components/MiInformacion';
import RegistrarAsesor from '../src/components/RegistrarAsesor'
import SubirArchivo from './components/SubirArchivo';
import EditarAsesor from './components/EditarAsesor';
// import EditarUsuario from './components/EditarUsuario';


import '../src/styles/variables.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/asignar_usuario" element={<Asignar />} />
        <Route path="/mi_info" element={<MiInfo />} />

        <Route path="/editar-asesor/:id" element={<EditarAsesor/>} />
        
        <Route path="/registrar_asesor" element={<RegistrarAsesor />} />
        <Route path="/subir_archivo" element={<SubirArchivo />} />
        <Route path="/tabla_usuarios" element={<Usuario />} />
        <Route path="/tabla_asesores" element={<Asesor />} />
      </Routes>
    </Router>
  );
}

export default App;
