import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import ReactPaginate from 'react-js-pagination';


export default function ServicioYEspecialidad() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [servicio, setservicio] = useState([]);
    const [agservicio, setagservicio] = useState("");
    const [especialidad, setespecialidad] = useState([]);
    const [agespecialidad, setagespecialidad] = useState("");

    const [editingServiceId, setEditingServiceId] = useState(null);
    const [editedServiceName, setEditedServiceName] = useState("");

    const [editingEspecialidadId, setEditingEspecialidadId] = useState(null);
    const [editedEspecialidadName, setEditedEspecialidadName] = useState("");

    const handleEditar = (id) => {
        // Cambia el estado de edición cuando se hace clic en Editar
        setEditingServiceId(id);
        // También guarda el nombre actual en caso de que el usuario lo edite
        const serviceToEdit = servicio.find(servicio => servicio.id === id);
        if (serviceToEdit) {
            setEditedServiceName(serviceToEdit.nombre_servicio);
        }
    };

    const handleEditar2 = (id) => {
        // Cambia el estado de edición cuando se hace clic en Editar
        setEditingEspecialidadId(id);
        // También guarda el nombre actual en caso de que el usuario lo edite
        const especialidadToEdit = especialidad.find(especialidad => especialidad.id === id);
        if (especialidadToEdit) {
            setEditedEspecialidadName(especialidadToEdit.nombre_especialidad);
        }
    };

    const handleCancelar = () => {
        // Cancela la edición
        setEditingServiceId(null);
        setEditedServiceName("");
    };

    const handleOk = async (id) => {
        console.log(editedServiceName);
        try {
            // Realiza la actualización del nombre del servicio
            const res = await axios.put(`http://localhost:5000/servicios/${id}`, {
                nombre_servicio: editedServiceName,
            });
            console.log('Servicio actualizado:', res.data.message);

            // Termina el modo de edición
            setEditingServiceId(null);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar servicio:', error);
        }
    };

    const handleCancelar2 = () => {
        // Cancela la edición
        setEditingEspecialidadId(null);
        setEditedEspecialidadName("");
    };

    const handleOk2 = async (id) => {
        console.log(editedEspecialidadName);
        try {
            // Realiza la actualización del nombre del servicio
            const res = await axios.put(`http://localhost:5000/especialidades/${id}`, {
                nombre_especialidad: editedEspecialidadName,
            });
            console.log('Servicio actualizado:', res.data.message);

            // Termina el modo de edición
            setEditingEspecialidadId(null);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar servicio:', error);
        }
    };


    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPage2, setCurrentPage2] = useState(1);

    useEffect(() => {
        async function fetchservicio() {
            try {
                console.log('Haciendo llamada a la API a:', 'http://localhost:5000/servicios');
                const res = await axios.get('http://localhost:5000/servicios');
                console.log(res.data.message);
                console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    const sortedServicio = res.data.content.sort((a, b) => a.id - b.id);
                    /* SE ORDENA POR ID */
                    console.log('Servicio con usuarios:', res.data.content);
                    setservicio(sortedServicio);
                }
            } catch (error) {
                console.error('Error fetching usuarios con servicios:', error);
            }
        }
        async function fetchespecialidad() {
            try {
                console.log('Haciendo llamada a la API a:', 'http://localhost:5000/especialidades');
                const res = await axios.get('http://localhost:5000/especialidades');
                console.log(res.data.message);
                console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    const sortedEspecialidad = res.data.content.sort((a, b) => a.id - b.id);
                    /* SE ORDENA POR ID */
                    console.log('Especialidad con usuarios:', res.data.content);
                    setespecialidad(sortedEspecialidad);
                }
            } catch (error) {
                console.error('Error fetching usuarios con servicios:', error);
            }
        }

        fetchespecialidad();
        fetchservicio();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePageChange2 = (pageNumber) => {
        setCurrentPage2(pageNumber);
    };

    const itemsCount = servicio.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = servicio.slice(startIndex, endIndex);

    const itemsCount2 = especialidad.length;

    const startIndex2 = (currentPage2 - 1) * itemsPerPage;
    const endIndex2 = startIndex2 + itemsPerPage;
    const currentData2 = especialidad.slice(startIndex2, endIndex2);


    const handleEliminarServicio = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/servicios/${id}`);
            console.log('Asesor eliminado:', res.data.message);

            // Actualizar la lista de asesores después de eliminar uno
            const updatedServicio = servicio.filter(asesor => asesor.id !== id);
            setservicio(updatedServicio);
            setCurrentPage(1);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar asesor:', error);
        }
    };

    const handleEliminarEspecialidad = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/especialidades/${id}`);
            console.log('Asesor eliminado:', res.data.message);

            // Actualizar la lista de asesores después de eliminar uno
            const updatedServicio = servicio.filter(asesor => asesor.id !== id);
            setservicio(updatedServicio);
            setCurrentPage(1);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar asesor:', error);
        }
    };

    const handleServicio = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/servicios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre_servicio: agservicio,
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Mostrar mensaje de éxito
                console.log(data.msg);
                window.location.reload();
            } else {
                // Mostrar mensaje de error
                console.error(data.msg);
            }
        } catch (error) {
            // Manejo de errores para la asignación de especialidades
            console.error("Error al asignar especialidades:", error);
        }
    }

    const handleInputChange = (event) => {
        const { value } = event.target;
        setagservicio(value); // Update agservicio with just the value
    };

    const handleEspecialidad = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/especialidades", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre_especialidad: agespecialidad,
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Mostrar mensaje de éxito
                console.log(data.msg);
                window.location.reload();
            } else {
                // Mostrar mensaje de error
                console.error(data.msg);
            }
        } catch (error) {
            // Manejo de errores para la asignación de especialidades
            console.error("Error al asignar especialidades:", error);
        }
    }

    const handleInputChange2 = (event) => {
        const { value } = event.target;
        setagespecialidad(value); // Update agespecialidad with just the value
    };

    return (
        <div className="servicio_especialidad">
            <div className="franja_verd">
                <h1>Lista de Servicios y Especialidades</h1>
            </div>
            <div className="se_container">
                <div className="servicios_c">
                    <h1>Lista de Servicios</h1>
                    <div className="ingresar_soe">
                        <input type="text"
                            name="servicio"
                            className="input_soe"
                            placeholder="Nombre del Servicio"
                            onChange={handleInputChange}
                            value={agservicio} />
                        <button className="button_agregar_soe" onClick={handleServicio}>
                            Agregar Servicio
                        </button>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map(servicio => (
                                <tr key={servicio.id}>
                                    <td>{servicio.id}</td>
                                    <td>
                                        {editingServiceId === servicio.id ? (
                                            <input
                                                type="text"
                                                value={editedServiceName}
                                                onChange={(e) => setEditedServiceName(e.target.value)}
                                            />
                                        ) : (
                                            servicio.nombre_servicio
                                        )}
                                    </td>
                                    <td>
                                        {editingServiceId === servicio.id ? (
                                            <>
                                                <button onClick={() => handleOk(servicio.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                    </svg>
                                                </button>
                                                <button onClick={handleCancelar}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditar(servicio.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg></button>
                                        )}
                                    </td>
                                    <td><button onClick={() => handleEliminarServicio(servicio.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
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
                <div className="especialidad_c">
                    <h1>Lista de Especialidades</h1>
                    <div className="ingresar_soe">

                        <input type="text"
                            name="especialidad"
                            className="input_soe"
                            placeholder="Nombre de la Especialidad"
                            onChange={handleInputChange2}
                            value={agespecialidad} />

                        <button className="button_agregar_soe" onClick={handleEspecialidad}>
                            Agregar Especialidad
                        </button>
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData2.map(especialidad => (
                                <tr key={especialidad.id}>
                                    <td>{especialidad.id}</td>
                                    {/* <td>{especialidad.nombre_especialidad}</td>
                                <td>
                                    <Link to={{ pathname: `/editar-especialidad/${especialidad.id}` }} >
                                        <button onClick={() => handleEditar(especialidad.id)}>Editar</button>
                                    </Link>
                                    editingEspecialidadId
                                    editedEspecialidadName
                                </td> */}
                                    <td>
                                        {editingEspecialidadId === especialidad.id ? (
                                            <input
                                                type="text"
                                                value={editedEspecialidadName}
                                                onChange={(e) => setEditedEspecialidadName(e.target.value)}
                                            />
                                        ) : (
                                            especialidad.nombre_especialidad
                                        )}
                                    </td>
                                    <td>
                                        {editingEspecialidadId === especialidad.id ? (
                                            <>
                                                <button onClick={() => handleOk2(especialidad.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                </svg></button>

                                                <button onClick={handleCancelar2}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg></button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditar2(especialidad.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg></button>
                                        )}
                                    </td>
                                    <td><button onClick={() => handleEliminarEspecialidad(especialidad.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <ReactPaginate
                        activePage={currentPage2}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={itemsCount2}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange2}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>

        </div>
    );
}