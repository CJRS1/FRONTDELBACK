import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/variables.css";

export default function MiInformacion() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="miinfo_container">
      <div className="miinfo_card">
        <h3>Mi información</h3>
        <div className="info_card">
          <h3>Nombre:</h3>
          <input type="text" />
        </div>
        <div className="info_card">
          <h3>Apellido Paterno:</h3>
          <input type="text" />
        </div>
        <div className="info_card">
          <h3>Apellido Materno:</h3>
          <input type="text" />
        </div>
        <div className="info_card">
          <h3>DNI:</h3>
          <input type="text" />
        </div>
        <div className="info_card">
          <h3>Email:</h3>
          <input type="text" />
        </div>
        <div className="info_card">
          <h3>Especialidades:</h3>
          <input type="text" />
        </div>
        <div className="info_card">
          <h3>Asesorados:</h3>
          <input type="text" />
        </div>
      </div>
    </div>
  );
}
