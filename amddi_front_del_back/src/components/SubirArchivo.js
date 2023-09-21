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
                console.log(res.data.content);
                setusuarioporDNI([res.data.content]);
            } else {
                setusuarioporDNI([]); // No se encontró ningún usuario, establecer el estado como un array vacío
            }
        } catch (error) {
            console.error("Error buscando usuario por DNI:", error);
        }
    }

    const [pdf, setPdf] = useState(null);

    const handlePdfChange = (e) => {
        // Actualiza el estado con el archivo PDF seleccionado
        setPdf(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crea un objeto FormData para enviar el archivo PDF
        const formData = new FormData();
        formData.append("pdf", pdf);

        try {
            // Realiza una solicitud POST para subir el archivo PDF
            console.log(`http://localhost:5000/subir-pdf/${usuarioporDNI[0].id}`)
            const response = await axios.post(`http://localhost:5000/subir-pdf/${usuarioporDNI[0].id}`, formData);

            // Muestra la respuesta del servidor
            alert(response.data.msg);
            window.location.reload();
            console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            console.error("Error al subir el PDF:", error);
        }
    };

    return (
        <div className="subarchivo_container">
            <div className="franja_verd">
                <h1>Subir Archivo</h1>
            </div>
            <div className="asignar_card asignar_servicio">
                <h3>Coloque el DNI del usuario:</h3>
                <div className="subirarchivo_c">

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
            </div>
            <div className="tabla_subir_archivo">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>PDF_URL</th>
                            <th>Servicio</th>
                            <th>Tema</th>
                            <th>Subir Trabajo</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarioporDNI.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apePat}
                                    <br />
                                    {usuario.apeMat}
                                </td>
                                <td>
                                    <ul>
                                        {usuario.pdf_url.map((pdf, index) => (
                                            <li key={index}>
                                                <a href={`http://localhost:5000${pdf.pdf_url}`} target="_blank" rel="noopener noreferrer" download="true">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-type-pdf" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                                    </svg>
                                                </a>
                                                <br />
                                                {pdf.fecha_pdf_url}
                                                <br />
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {usuario.usuario_servicio[0]?.servicio.nombre_servicio || ""}
                                </td>
                                <td>{usuario.tema}</td>
                                <td>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <input type="file" accept=".pdf" onChange={handlePdfChange} className="input_subir_t"/>
                                        <button type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-cloud-plus-fill" viewBox="0 0 16 16">
                                                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}