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
        setEditingServiceId(null);
        setEditedServiceName("");
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
        <div className="container mt-5">
            <div className="servicios_c">
                <h1>Lista de Servicios</h1>
                <input type="text"
                    name="servicio"
                    placeholder="Nombre del Servicio"
                    onChange={handleInputChange}
                    value={agservicio} />

                <button onClick={handleServicio}>
                    Agregar Servicio
                </button>

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
                                            <button onClick={() => handleOk(servicio.id)}>Ok</button>
                                            <button onClick={handleCancelar}>Cancelar</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditar(servicio.id)}>Editar</button>
                                    )}
                                </td>
                                <td><button onClick={() => handleEliminarServicio(servicio.id)}>Eliminar</button></td>
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
                <input type="text"
                    name="especialidad"
                    placeholder="Nombre de la Especialidad"
                    onChange={handleInputChange2}
                    value={agespecialidad} />

                <button onClick={handleEspecialidad}>
                    Agregar Servicio
                </button>
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
                                            <button onClick={() => handleOk2(especialidad.id)}>Ok</button>
                                            <button onClick={handleCancelar2}>Cancelar</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditar2(especialidad.id)}>Editar</button>
                                    )}
                                </td>
                                <td><button onClick={() => handleEliminarEspecialidad(especialidad.id)}>Eliminar</button></td>
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
    );
}