import React, { useEffect} from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function Asignar() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div className="asignar_container">
            <div className="asignar_card">
                <h3>Buscar usuario por DNI:</h3>
                <input type="text" />
            </div>
            <h3>Usuario</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Carrera</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <h3>Asesor</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Especialidad</th>
                        <th>Escoger</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Aqui va un checkbox para escoger y hacer la relacion */}
                </tbody>
            </table>
        </div>
    );
}