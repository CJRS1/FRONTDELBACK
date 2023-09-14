import React, { useEffect} from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/variables.css";

export default function MiInformacion() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);


const storedData = localStorage.getItem('data');
const parsedData = JSON.parse(storedData);
console.log("hola",parsedData.id);

  return (
    <div className="miinfo_container">
      <div className="franja_verd">
        <h1>Mi Información</h1>
      </div>
      <div className="miinfo_card">
        <div className="miinfo_cards_container">
          <div className="info_card">
            <h3>Nombre:</h3>
            <input type="text"
              className="input_miinfo"
              value={parsedData.nombre}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>Apellido Paterno:</h3>
            <input type="text"
              className="input_miinfo"
              value={parsedData.apePat}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>Apellido Materno:</h3>
            <input type="text"
              className="input_miinfo"
              value={parsedData.apeMat}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>DNI:</h3>
            <input type="text"
              className="input_miinfo"
              value={parsedData.dni}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>Email:</h3>
            <input type="text"
              className="input_miinfo"
              value={parsedData.email}
              readOnly
            />
          </div>
          <div className="info_card">
            <h3>Especialidades:</h3>
            <input type="text"
              className="input_miinfo"
            />
          </div>
          <div className="info_card">
            <h3>Asesorados:</h3>
            <input type="text"
              className="input_miinfo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
