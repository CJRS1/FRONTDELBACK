import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import ReactPaginate from 'react-js-pagination';

export default function TablaAsesorados() {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [urgencyLevel, setUrgencyLevel] = useState(0);

    const location = useLocation();

    console.log("usuarios", userData);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [displayData, setDisplayData] = useState([]);
    const itemsCount = userData ? (userData.asignacion_secundaria.length + userData.asignacion.length) : 0;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const token = localStorage.getItem('token');

        if (token) {
            axios.get('https://amddibackend-production-2880.up.railway.app/asesor', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUserData(response.data.content.asesor);
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false); // Set isLoading to false when data is received or in case of an error
                });
        } else {
            setIsLoading(false); // Set isLoading to false if there's no token
        }
    }, [location]);

    useEffect(() => {
        if (userData) {
            const slicedData = userData.asignacion.concat(userData.asignacion_secundaria).slice(startIndex, endIndex);
            setDisplayData(slicedData);
        }
    }, [userData, startIndex, endIndex]);

    const getColor = (fechaEstimada) => {
        // Convertimos las fechas a objetos Date
        const fechaActual = new Date();
        fechaActual.setHours(fechaActual.getHours() - 5);
        console.log(fechaActual);
        // Separar la fecha estimada en día, mes y año
        const partesFechaEstimada = fechaEstimada.split('/');
        const diaEstimado = parseInt(partesFechaEstimada[0], 10);
        const mesEstimado = parseInt(partesFechaEstimada[1], 10) - 1; // Restar 1 al mes, ya que en JavaScript los meses van de 0 a 11
        const añoEstimado = parseInt(partesFechaEstimada[2], 10);

        const fechaEstimadaDate = new Date(añoEstimado, mesEstimado, diaEstimado);

        // Calculamos la diferencia entre las dos fechas
        const diferencia = fechaEstimadaDate - fechaActual;

        const diferenciaDias = diferencia / (1000 * 60 * 60 * 24) + 1;
        console.log("dd", diferenciaDias);
        // Determinamos el color
        if (diferenciaDias >= 7) {
            return "#00d799";
        } else if ((diferenciaDias < 7) && (diferenciaDias >= 4)) {
            return "#ffd700";
        } else if ((diferenciaDias < 4) && (diferenciaDias >= 1)) {
            return "red";
        } else if (diferenciaDias <= 0) {
            return "black";
        }
    };

    const filterDataByUrgency = (data) => {
        if (urgencyLevel === 0) {
            return data; // Return all data
        } else {
            return data.filter(item => {
                const color = item.usuario.fecha_estimada ? getColor(item.usuario.fecha_estimada) : 'black';
                if (urgencyLevel === 1 && color === 'red') {
                    return true; // Return Urgencia 1 data (color: red)
                } else if (urgencyLevel === 2 && color === '#ffd700') {
                    return true; // Return Urgencia 2 data (color: yellow)
                } else if (urgencyLevel === 3 && color === '#00d799') {
                    return true; // Return Urgencia 3 data (color: green)
                } else if ((urgencyLevel === 4 && color === 'black') || item.usuario.estado === 'FINALIZADO') {
                    return true; // Return Urgencia 3 data (color: green)
                } else {
                    return false;
                }
            });
        }
    };

    const handleUrgencyLevelChange = (level) => {
        setUrgencyLevel(level);
    };

    return (
        <div className="tabla_asesorados">
            <div className="franja_verd">
                <h1>Lista de mis asesorados</h1>
            </div>
            <div className="tabla_container">
                <div className="urgency_buttons">
                    <button onClick={() => handleUrgencyLevelChange(0)} className="btn_urgencia">Todos</button>
                    <button onClick={() => handleUrgencyLevelChange(1)} className="btn_urgencia">Urgencia 1</button>
                    <button onClick={() => handleUrgencyLevelChange(2)} className="btn_urgencia">Urgencia 2</button>
                    <button onClick={() => handleUrgencyLevelChange(3)} className="btn_urgencia">Urgencia 3</button>
                    <button onClick={() => handleUrgencyLevelChange(4)} className="btn_urgencia">Finalizado</button>
                </div>
                <table className="table">
                    <thead>
                        <tr className="fondo_header">
                            <th>Nº</th>
                            <th>Id Usuario</th>
                            <th>Categoria</th>
                            <th>Asesorado como</th>
                            <th>Servicio</th>
                            <th>Titulo</th>
                            <th>Estado</th>
                            <th>Fecha Entrega</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            filterDataByUrgency(displayData).map((item, index) => (
                                <tr key={index}>
                                    {item.usuario.categoria === "Premium" && ( // Verificar si la categoría es "premium"
                                        <>
                                            <td>{startIndex + index + 1}</td>
                                            <td>{item.usuario.id_amddi}</td>
                                            <td>{item.usuario.categoria}</td>
                                            <td>{index < userData.asignacion.length ? "Principal" : "Secundario"}</td>
                                            <td>{item.usuario.usuario_servicio[0].servicio.nombre_servicio}</td>
                                            <td>{item.usuario.tema}</td>
                                            <td>{item.usuario.estado}</td>
                                            <td style={{ color: item.usuario.fecha_estimada ? getColor(item.usuario.fecha_estimada) : 'black' }}>
                                                <strong>{item.usuario.fecha_estimada}</strong>
                                            </td>
                                        </>
                                    )}
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
