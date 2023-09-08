import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function SubirArchivo() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);


    return (
        <div className="subarchivo_container">
            <div className="franja_verd">
                <h1>Subir Archivo</h1>
            </div>
            <div className="tabla_subir_archivo">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>PDF_URL</th>
                            <th>Servicio</th>
                            <th>Tema</th>
                            <th>Subir Trabajo</th>
                            {/* Subir Trabajo debe de generar un link */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Jose</td>
                            <td>Montoya</td>
                            <td></td>
                            <td>Tesis Pregrado</td>
                            <td>Camiones</td>
                            <td><button >Adjuntar</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}