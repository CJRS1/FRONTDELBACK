import React, { useEffect, useState } from "react";
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import ReactPaginate from 'react-js-pagination';

export default function TablaUsuarios() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [usuariosConServicios, setUsuariosConServicios] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUser, setFilteredUser] = useState(null);

    const handleEditar = (id) => {
        // setEditingServiceId(id);
        // const serviceToEdit = servicio.find(servicio => servicio.id === id);
        // if (serviceToEdit) {
        //     setEditedServiceName(serviceToEdit.nombre_servicio);
        // }
    };

    const handleCancelar = () => {

        // setEditingServiceId(null);
        // setEditedServiceName("");
    };

    const handleOk = async (id) => {
        // console.log(editedServiceName);
        // try {
        //     const res = await axios.put(`http://localhost:5000/servicios/${id}`, {
        //         nombre_servicio: editedServiceName,
        //     });
        //     console.log('Servicio actualizado:', res.data.message);

        //     setEditingServiceId(null);
        //     window.location.reload();
        // } catch (error) {
        //     console.error('Error al actualizar servicio:', error);
        // }
    };

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

    const handleSearch = () => {
        const foundUser = usuariosConServicios.find(usuario => (
            usuario.nombre.includes(searchTerm) ||
            usuario.dni.includes(searchTerm) ||
            usuario.email.includes(searchTerm)
        ));
        setFilteredUser(foundUser);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setFilteredUser(null);
    };


    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const itemsCount = usuariosConServicios.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = usuariosConServicios.slice(startIndex, endIndex);

    const handleEliminar = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/asesores/${id}`);
            console.log('Asesor eliminado:', res.data.message);

            // Actualizar la lista de asesores después de eliminar uno
            const updatedAsesores = usuariosConServicios.filter(asesor => asesor.id !== id);
            setUsuariosConServicios(updatedAsesores);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error al eliminar asesor:', error);
        }
    };


    return (
        <div className="container mt-5">
            <h1>Lista de Usuarios con Servicios</h1>

            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Filtrar por Nombre, DNI o Email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Buscar</button>
                <button onClick={clearSearch}>Limpiar</button>
            </div>

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
                        <th>Asesor</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUser ? (
                        <tr key={filteredUser.id}>
                            <td>{filteredUser.id}</td>
                            <td>{filteredUser.nombre}</td>
                            <td>{filteredUser.apePat}</td>
                            <td>{filteredUser.departamento}</td>
                            <td>{filteredUser.carrera}</td>
                            <td>{filteredUser.email}</td>
                            <td>{filteredUser.dni}</td>
                            <td>{filteredUser.celular}</td>
                            <td>{filteredUser.pdf_url}</td>
                            <td>{filteredUser.monto_pagado}</td>
                            <td>{filteredUser.monto_total}</td>
                            <td>
                                <ul>
                                    {filteredUser.usuario_servicio && filteredUser.usuario_servicio.map(usuServ => (
                                        <li key={usuServ.id}>
                                            {usuServ.servicio.nombre_servicio}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {filteredUser.asignacion && filteredUser.asignacion.map(usuAse => (
                                        <li key={usuAse.id}>
                                            {usuAse.asesor.nombre}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ) : (
                        currentData.map(usuario => (
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
                                <td>
                                    <ul>
                                        {usuario.usuario_servicio.map(usuServ => (
                                            <li key={usuServ.id}>
                                                {usuServ.servicio.nombre_servicio}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <ul>
                                        {usuario.asignacion.map(usuAse => (
                                            <li key={usuAse.id}>
                                                {usuAse.asesor.nombre}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                <td>
                                    {1 === 1 ? (
                                        <>
                                            <button onClick={() => handleOk(1)}>Ok</button>
                                            <button onClick={handleCancelar}>Cancelar</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditar(1)}>Editar</button>
                                    )}
                                </td>
                                </td>
                                <td><button onClick={() => handleEliminar(usuario.id)}>Eliminar</button></td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <ReactPaginate
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={itemsCount}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );
}
