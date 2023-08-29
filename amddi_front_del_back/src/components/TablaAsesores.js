import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function TablaAsesores() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [AsesorConUsuario, setAsesorConUsuario] = useState([]);

    useEffect(() => {
        async function fetchAsesorConUsuario() {
            try {
                console.log('Haciendo llamada a la API a:', 'http://localhost:5000/asesores_usuarios');
                const res = await axios.get('http://localhost:5000/asesores_usuarios');
                console.log(res.data.message);
                console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    console.log('Asesores con usuarios:', res.data.content);
                    setAsesorConUsuario(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching usuarios con servicios:', error);
            }
        }

        fetchAsesorConUsuario();
    }, []);

    // console.log('Usuarios con servicios:', AsesorConUsuario.map(usuario => usuario.nombre));
    return (
        <div className="container mt-5">
            <h1>Lista de Asesores con Servicio</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        {/* Agrega más encabezados según tu modelo */}
                        <th>Email</th>
                        <th>DNI</th>
                        <th>Especialidad</th>
                        <th>Asesorados</th>

                    </tr>
                </thead>
                <tbody>
                    {AsesorConUsuario.map(asesor => (
                        <tr key={asesor.id}>
                            <td>{asesor.id}</td>
                            <td>{asesor.nombre}</td>
                            <td>{asesor.apePat}</td>
                            <td>{asesor.email}</td>
                            <td>{asesor.dni}</td>
                            {/* Agrega más celdas según tu modelo */}
                            <td>
                                <ul>
                                    {asesor.asesor_especialidad.map(AseEsp => (
                                        <li key={AseEsp.id}>
                                            {AseEsp.especialidad.nombre_especialidad}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {asesor.asignacion.map(AseUsu => (
                                        <li key={AseUsu.id}>
                                            {AseUsu.asesor.nombre}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}