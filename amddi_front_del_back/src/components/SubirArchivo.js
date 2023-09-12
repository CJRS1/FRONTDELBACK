import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function SubirArchivo() {
    const location = useLocation();
    const [dniInput, setDniInput] = useState("");
    const [usuarioporDNI, setusuarioporDNI] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    async function buscarUsuarioPorDNI(dni) {
        try {
            const res = await axios.get(`http://localhost:5000/usuarios/${dni}`);

            if (res.data.content) {
                console.log(res.data.content.carrera);
                setusuarioporDNI([res.data.content]);

            } else {
                setusuarioporDNI([]); // No se encontró ningún usuario, establecer el estado como un array vacío
            }

        } catch (error) {
            console.error("Error buscando usuario por DNI:", error);
        }


    }

    return (
        <div className="subarchivo_container">
            <div className="franja_verd">
                <h1>Subir Archivo</h1>
            </div>
            <div className="asignar_card asignar_servicio">
                <h3>Coloque el DNI del usuario:</h3>
                <input
                    type="text"
                    className="input_dni_usuario"
                    value={dniInput}
                    onChange={(e) => setDniInput(e.target.value)}
                    placeholder="DNI"
                />
                <button className="button_backend_filtro" onClick={() => buscarUsuarioPorDNI(dniInput)}>Buscar</button>
                <button className="button_backend_filtro" onClick={() => setusuarioporDNI([])}>Limpiar</button>
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
                        </tr>
                    </thead>
                    <tbody>
                        {usuarioporDNI.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apePat}</td>
                                <td>{usuario.pdf_url}</td>
                                <td>{usuario.celular}</td>
                                <td>{usuario.tema}</td>
                                <td><button ><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cloud-plus-fill" viewBox="0 0 16 16">
                                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                                </svg></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}