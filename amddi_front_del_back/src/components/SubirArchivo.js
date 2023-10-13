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
        // console.log("DNI antes de limpiar:", dni);
        const cleanedDNI = dni.replace(/\s/g, '');
        // console.log("DNI limpio:", cleanedDNI);
        if (!isNaN(cleanedDNI)) {
            try {
                const res = await axios.get(`https://amddibackend-production-2880.up.railway.app/usuarios/${cleanedDNI}`);
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
        if (isNaN(cleanedDNI)) {

            try {
                const res = await axios.get(`https://amddibackend-production-2880.up.railway.app/usuariosa/${cleanedDNI}`);
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
    }

    const [pdf, setPdf] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePdfChange = (e) => {
        // Actualiza el estado con el archivo PDF seleccionado
        setPdf(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pdf) {
            alert('Por favor, selecciona un archivo.');
            return;
        }
        setLoading(true); 
        // Crea un objeto FormData para enviar el archivo PDF
        const formData = new FormData();
        formData.append('file', pdf);

        try {
            // Realiza una solicitud POST para subir el archivo PDF
            // console.log(`https://amddibackend-production-2880.up.railway.app/subir-pdf/${usuarioporDNI[0].id}`)
            const response = await axios.post(`https://amddibackend-production-2880.up.railway.app/upload/${usuarioporDNI[0].id}`, formData);

            // Muestra la respuesta del servidor
            alert(response.data.msg);
            window.location.reload();
            // console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            console.error("Error al subir el PDF:", error);
        }
    };

    const limpiarTodo = () => {
        // Limpiar el input estableciendo su valor a una cadena vacía
        setDniInput('');

        // Limpiar los datos de usuarioporDNI estableciendo el array vacío
        setusuarioporDNI([]);
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
                        placeholder="Ingrese el Id Usuario o el DNI"
                    />
                    <button className="button_backend_filtro" onClick={() => buscarUsuarioPorDNI(dniInput)}>Buscar</button>
                    <button className="button_backend_filtro" onClick={limpiarTodo}>Limpiar</button>
                </div>
            </div>
            <div className="tabla_subir_archivo">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nº</th>
                            <th>Id Usuario</th>
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
                                <td>{usuario.id_amddi}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apePat}
                                    <br />
                                    {usuario.apeMat}
                                </td>
                                <td>
                                    <ul>
                                        {usuario.pdf_url.map((pdf, index) => (
                                            <li key={index}>
                                                <a href={`https://amddibackend-production-2880.up.railway.app${pdf.pdf_url}`} target="_blank" rel="noopener noreferrer" download="true">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#00d799" class="bi bi-file-earmark-word" viewBox="0 0 16 16">
                                                        <path d="M5.485 6.879a.5.5 0 1 0-.97.242l1.5 6a.5.5 0 0 0 .967.01L8 9.402l1.018 3.73a.5.5 0 0 0 .967-.01l1.5-6a.5.5 0 0 0-.97-.242l-1.036 4.144-.997-3.655a.5.5 0 0 0-.964 0l-.997 3.655L5.485 6.88z" />
                                                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
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
                                        <input type="file" accept=".doc, .docx" name="file" onChange={handlePdfChange} className="input_subir_t" />
                                        <button type="submit">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-cloud-plus-fill" viewBox="0 0 16 16">
                                                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                                            </svg>
                                        </button>
                                    </form>
                                    {loading && <p>Cargando...</p>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}