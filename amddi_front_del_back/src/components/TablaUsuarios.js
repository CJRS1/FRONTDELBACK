import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
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

    const [editingService, setEditingService] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const [servicios, setServicios] = useState([]);

    const [editingUserId, setEditingUserId] = useState(null);

    const [editedUserName, setEditedUserName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
    const [editedDepartment, setEditedDepartment] = useState("");
    const [editedCareer, setEditedCareer] = useState("");
    const [editedDNI, setEditedDNI] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedPDF_URL, setEditedPDF_URL] = useState("");
    const [editedMontoPagado, setEditedMontoPagado] = useState(0.0);
    const [editedMontoTotal, setEditedMontoTotal] = useState(0.0);


    useEffect(() => {
        async function fetchServicios() {
            try {
                console.log('Haciendo llamada a la API a:', 'http://localhost:5000/servicios');
                const res = await axios.get('http://localhost:5000/servicios');
                console.log(res.data.message);
                console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    console.log('Los servicios son:', res.data.content);
                    setServicios(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching servicios:', error);
            }
        }

        fetchServicios();
    }, []);

    const handleEditar = (id) => {
        setEditingUserId(id);
        const userToEdit = usuariosConServicios.find(usuario => usuario.id === id);
        if (userToEdit) {
            setEditedUserName(userToEdit.nombre);
            setEditedLastName(userToEdit.apePat);
            setEditedDepartment(userToEdit.departamento);
            setEditedCareer(userToEdit.carrera);
            setEditedDNI(userToEdit.dni);
            setEditedPhone(userToEdit.celular);
            setEditedEmail(userToEdit.email);
            setEditedPDF_URL(userToEdit.pdf_url);
            setEditedMontoPagado(userToEdit.monto_pagado);
            setEditedMontoTotal(userToEdit.monto_total);
            // Configuramos el servicio seleccionado para edición
            setSelectedService(userToEdit.usuario_servicio[0]?.servicio.id || null);
        }
        // Activamos la edición del servicio
        setEditingService(true);
        console.log(editingService);
    };

    const handleCancelar = () => {

        setEditingUserId(null);
        setEditedUserName("");
        setEditedLastName("");
        setEditedDepartment("");
        setEditedCareer("");
        setEditedEmail("");
        setEditedDNI("");
        setEditedPhone("");
        setEditedPDF_URL("");
        setEditedMontoPagado(0.0);
        setEditedMontoTotal(0.0);

        // Limpiamos el servicio seleccionado al cancelar
        setSelectedService(null);

        // Desactivamos la edición del servicio
        setEditingService(false);
    };

    const handleOk = async (id) => {
        try {
            // Actualiza el usuario
            const usuarioData = {
                nombre: editedUserName,
                apePat: editedLastName,
                departamento: editedDepartment,
                carrera: editedCareer,
                dni: editedDNI,
                email: editedEmail,
                celular: editedPhone,
                pdf_url: editedPDF_URL,
                monto_pagado: editedMontoPagado,
                monto_total: editedMontoTotal,
            };

            const usuarioRes = await axios.put(`http://localhost:5000/usuarios/${id}`, usuarioData);
            console.log('Usuario actualizado:', usuarioRes.data.message);
            window.location.reload();
            // Actualiza el servicio si se ha seleccionado uno nuevo
            if (selectedService !== null) {
                const servicioData = {
                    id_servicio: selectedService,
                };

                const servicioRes = await axios.put(`http://localhost:5000/usuario_servicio/${id}/${selectedService}`, servicioData);
                console.log('Servicio actualizado:', servicioRes.data.message);
            }

            setEditingUserId(null);
            // window.location.reload();
        } catch (error) {
            console.error('Error al actualizar usuario o servicio:', error);
        }
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
        <div className="tabla_usuarios">
            <div className="franja_verd">
                <h1>Lista de Usuarios</h1>
            </div>
            <div className="tabla_usuario_container">
                <div className="filtro_container">
                    <input
                        type="text"
                        className="input_filtro"
                        placeholder="Filtrar por Nombre, DNI o Email"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="button_backend_filtro" onClick={handleSearch}>Buscar</button>
                    <button className="button_backend_filtro" onClick={clearSearch}>Limpiar</button>
                </div>
                <table className="table">
                    <thead>
                        <tr className="fondo_header">
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
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
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedUserName}
                                                onChange={(e) => setEditedUserName(e.target.value)}
                                            />
                                        ) : (
                                            usuario.nombre
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedLastName}
                                                onChange={(e) => setEditedLastName(e.target.value)}
                                            />
                                        ) : (
                                            usuario.apePat
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedDepartment}
                                                onChange={(e) => setEditedDepartment(e.target.value)}
                                            />
                                        ) : (
                                            usuario.departamento
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedCareer}
                                                onChange={(e) => setEditedCareer(e.target.value)}
                                            />
                                        ) : (
                                            usuario.carrera
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedEmail}
                                                onChange={(e) => setEditedEmail(e.target.value)}
                                            />
                                        ) : (
                                            usuario.email
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedDNI}
                                                onChange={(e) => setEditedDNI(e.target.value)}
                                            />
                                        ) : (
                                            usuario.dni
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedPhone}
                                                onChange={(e) => setEditedPhone(e.target.value)}
                                            />
                                        ) : (
                                            usuario.celular
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedPDF_URL}
                                                onChange={(e) => setEditedPDF_URL(e.target.value)}
                                            />
                                        ) : (
                                            usuario.pdf_url
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedMontoPagado}
                                                onChange={(e) => setEditedMontoPagado(e.target.value)}
                                            />
                                        ) : (
                                            usuario.monto_pagado
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                type="text"
                                                value={editedMontoTotal}
                                                onChange={(e) => setEditedMontoTotal(e.target.value)}
                                            />
                                        ) : (
                                            usuario.monto_total
                                        )}
                                    </td>
                                    <td>
                                        {/* <ul>
                                        {usuario.usuario_servicio.map(usuServ => (
                                            <li key={usuServ.id}>
                                                {usuServ.servicio.nombre_servicio}
                                            </li>
                                        ))}
                                    </ul> */}
                                        {editingUserId === usuario.id ? (
                                            <select
                                                value={selectedService}
                                                onChange={(e) => setSelectedService(e.target.value)}
                                            >
                                                {servicios.map(servicio => (
                                                    <option key={servicio.id} value={servicio.id}>
                                                        {servicio.nombre_servicio}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            usuario.usuario_servicio[0]?.servicio.nombre_servicio || ""
                                        )}
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
                                        {editingUserId === usuario.id ? (
                                            <>
                                                <button onClick={() => handleOk(usuario.id)}>Ok</button>
                                                <button onClick={handleCancelar}>Cancelar</button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditar(usuario.id)}>Editar</button>
                                        )}
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
        </div>
    );
}
