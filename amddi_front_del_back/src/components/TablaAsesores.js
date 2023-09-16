import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import ReactPaginate from 'react-js-pagination';


export default function TablaAsesores() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [AsesorConUsuario, setAsesorConUsuario] = useState([]);
    const [editingServiceId, setEditingServiceId] = useState([]);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const handleEditar = (id) => {
        setEditingServiceId(id);
        // const serviceToEdit = servicio.find(servicio => servicio.id === id);
        // if (serviceToEdit) {
        //     setEditedServiceName(serviceToEdit.nombre_servicio);
        // }
    };

    const handleCancelar = () => {

        setEditingServiceId(null);
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

    const handleSearch = () => {

    }
    const clearSearch = () => {

    }
    useEffect(() => {
        async function fetchAsesorConUsuario() {
            try {
                console.log('Haciendo llamada a la API a:', 'http://localhost:5000/asesores_usuarios');
                const res = await axios.get('http://localhost:5000/asesores_usuarios');
                console.log(res.data.message);
                console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    const sortedAsesores = res.data.content.sort((a, b) => a.id - b.id);
                    /* SE ORDENA POR ID */
                    console.log('Asesores con usuarios:', res.data.content);
                    setAsesorConUsuario(sortedAsesores);
                }
            } catch (error) {
                console.error('Error fetching usuarios con servicios:', error);
            }
        }

        fetchAsesorConUsuario();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const itemsCount = AsesorConUsuario.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = AsesorConUsuario.slice(startIndex, endIndex);


    const handleEliminar = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/asesores/${id}`);
            console.log('Asesor eliminado:', res.data.message);

            // Actualizar la lista de asesores después de eliminar uno
            const updatedAsesores = AsesorConUsuario.filter(asesor => asesor.id !== id);
            setAsesorConUsuario(updatedAsesores);
            setCurrentPage(1);
        } catch (error) {
            console.error('Error al eliminar asesor:', error);
        }
    };
    
    return (
        <div className="tabla_asesores">
            <div className="franja_verd">
                <h1>Lista de Asesores</h1>
            </div>
            <div className="tabla_asesor_container">
                <div className="filtro_container">
                    <input
                        type="text"
                        className="input_filtro_asesor"
                        placeholder="Filtrar por Nombre, DNI o Email"
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="button_backend_filtro" onClick={handleSearch}>Buscar</button>
                    <button className="button_backend_filtro" onClick={clearSearch}>Limpiar</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Email</th>
                            <th>DNI</th>
                            <th>Especialidad</th>
                            <th>Asesorados</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(asesor => (
                            <tr key={asesor.id}>
                                <td>{asesor.id}</td>
                                <td>{asesor.nombre}</td>
                                <td>{asesor.apePat}</td>
                                <td>{asesor.email}</td>
                                <td>{asesor.dni}</td>
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
                                                {AseUsu.usuario.nombre}
                                                <br />
                                                {AseUsu.usuario.apePat}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    {editingServiceId === asesor.id ?(
                                        <>
                                            <button onClick={() => handleOk(asesor.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                            </svg></button>
                                            <button onClick={handleCancelar}>                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                            </svg></button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEditar(asesor.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg></button>
                                    )}
                                </td>
                                <td><button onClick={() => handleEliminar(asesor.id)}>                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
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
        </div>
    );
}