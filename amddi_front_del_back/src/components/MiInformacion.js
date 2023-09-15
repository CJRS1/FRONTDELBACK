import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/variables.css";

export default function MiInformacion() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token existe
    if (token) {
      // Si el token existe, realiza una solicitud al servidor para obtener los datos del usuario
      axios.get('http://localhost:5000/asesor', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          // console.log("hola")
          // console.log("hola",response.data.content);
          setUserData(response.data.content); // Almacena los datos del usuario en el estado
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [location]);

  const storedData = localStorage.getItem("data");
  const parsedData = JSON.parse(storedData) || userData;

  // console.log("parsedData", parsedData)
  return (
    <div className="miinfo_container">
      <div className="franja_verd">
        <h1>Mi Información</h1>
      </div>
      <div className="miinfo_card">
        <div className="miinfo_cards_container">
          <div className="info_card">
            <h3>Nombre:</h3>
            <input
              type="text"
              className="input_miinfo"
              value={parsedData ? parsedData.nombre : ""}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>Apellido Paterno:</h3>
            <input
              type="text"
              className="input_miinfo"
              value={parsedData ? parsedData.apePat : ""}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>Apellido Materno:</h3>
            <input
              type="text"
              className="input_miinfo"
              value={parsedData ? parsedData.apeMat : ""}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>DNI:</h3>
            <input
              type="text"
              className="input_miinfo"
              value={parsedData ? parsedData.dni : ""}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>Email:</h3>
            <input
              type="text"
              className="input_miinfo"
              value={parsedData ? parsedData.email : ""}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>Especialidades:</h3>
            <input
              type="text"
              className="input_miinfo"
              value={parsedData && parsedData.asesor_especialidad ? parsedData.asesor_especialidad.map((item) => item.especialidad.nombre_especialidad).join(', ') : ''}
              readOnly
            />


          </div>
          <div className="info_card">
            <h3>Asesorados:</h3>
            <input
              type="text"
              className="input_miinfo"
              value={parsedData && parsedData.asignacion ? parsedData.asignacion.map((item) => item.especialidad.nombre_especialidad).join(', ') : ''}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}
