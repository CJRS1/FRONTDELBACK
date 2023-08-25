import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function Inicio() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [usuariosConServicios, setUsuariosConServicios] = useState([]);

    useEffect(() => {
        async function fetchUsuariosConServicios() {
            try {
                console.log('Haciendo llamada a la API a:', 'http://localhost:5000/usuarios_con_servicio');
                const res = await axios.get('http://localhost:5000/usuarios_con_servicio');
                console.log(res.data.message);
                console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    console.log('Usuarios con servicios recibidos:', res.data.content);
                    setUsuariosConServicios(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching usuarios con servicios:', error);
            }
        }

        fetchUsuariosConServicios();
    }, []);

    console.log('Usuarios con servicios:', usuariosConServicios.map(usuario => usuario.nombre));
    return (
        <div className="container mt-5">
            <h1>Lista de Usuarios con Servicios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        {/* Agrega más encabezados según tu modelo */}
                        <th>Departamento</th>
                        <th>Carrera</th>
                        <th>Email</th>
                        <th>DNI</th>
                        <th>Celular</th>
                        <th>PDF_URL</th>
                        <th>Monto Pagado</th>
                        <th>Monto Total</th>
                        <th>Servicio</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosConServicios.map(usuario => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apePat}</td>
                            <td>{usuario.departamento}</td>
                            <td>{usuario.carrera}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.dni}</td>
                            <td>{usuario.celular}</td>
                            <td>{usuario.pdf_url}</td>
                            <td>{usuario.monto_pagado}</td>
                            <td>{usuario.monto_total}</td>
                            {/* Agrega más celdas según tu modelo */}
                            <td>
                                <ul>
                                    {usuario.usuario_servicio.map(usuServ => (
                                        <li key={usuServ.id}>
                                            {usuServ.servicio.nombre_servicio}
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