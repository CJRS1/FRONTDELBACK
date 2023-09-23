import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
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
import AuthGuard from './components/AuthGuard';
import AsesoradoPrincipal from './components/AsesoradoPrincipal';
import AsesoradoSecundario from './components/AsesoradoSecundario';
import AsesoradoFinalizado from './components/AsesoradoFinalizado';

import '../src/styles/variables.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAsesor, setIsAsesor] = useState(false);

  function tokenExpirado(decodedToken) {
    if (!decodedToken.exp) {
      return false; // Si no hay una fecha de expiración en el token, considerarlo como no expirado
    }

    const expirationTime = decodedToken.exp * 1000; // Convertir la fecha de expiración a milisegundos
    const currentTime = new Date().getTime(); // Obtener la fecha actual en milisegundos

    return currentTime > expirationTime; // Comparar la fecha actual con la fecha de expiración
  }

  useEffect(() => {
    // Primera capa de autenticación (variable en localStorage)
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn === 'true') {
      // Segunda capa de autenticación (verificar el token JWT)
      const token = localStorage.getItem('token');
      if (token) {
        // Decodifica el token para verificar su validez
        try {
          const decodedToken = jwt_decode(token);
          if (decodedToken.rol === "asesor") {
            setIsAsesor(true);
          }
          if (decodedToken.rol === "admin") {
            setIsAdmin(true);
          }
          // Puedes realizar más comprobaciones aquí según tus necesidades
          // Por ejemplo, verificar si el token ha expirado
          if (!tokenExpirado(decodedToken)) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
        }
      }
    }
  }, []);

  return (
    <Router>
      {isLoggedIn && <Header setIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin} isAsesor={isAsesor} />}
      <AuthGuard>

        <Routes>
          <Route path="/login_a" element={<LoginA setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn && (
            <>
              {isAdmin && (
                <>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/tabla_usuarios" element={<Usuario />} />
                  <Route path="/asignar_usuario" element={<Asignar />} />
                  <Route path="/tabla_asesores" element={<Asesor />} />
                  <Route path="/mi_info" element={<MiInfo />} />
                  <Route path="/asignar_servicio" element={<AsignarServicio />} />
                  <Route path="/editar-asesor/:id" element={<EditarAsesor />} />
                  <Route path="/servicio_especialidad" element={<ServicioEspecialidad />} />
                  <Route path="/registrar_asesor" element={<RegistrarAsesor />} />
                  <Route path="/subir_archivo" element={<SubirArchivo />} />
                </>
              )}
              {isAsesor && (
                <>
                  <Route path="/asesorado_principal" element={<AsesoradoPrincipal />} />
                  <Route path="/asesorado_secundario" element={<AsesoradoSecundario />} />
                  <Route path="/asesorado_finalizado" element={<AsesoradoFinalizado />} />
                </>
              )}
            </>
          )}

        </Routes>
      </AuthGuard>

    </Router>
  );
}

export default App;
