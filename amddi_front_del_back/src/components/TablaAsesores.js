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
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

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
                <h1>Lista de Asesores con Servicio</h1>
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
                            <th>Editar</th>
                            <th>Eliminar</th>
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
                                                {AseUsu.asesor.nombre}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
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
                                <td><button onClick={() => handleEliminar(asesor.id)}>Eliminar</button></td>
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