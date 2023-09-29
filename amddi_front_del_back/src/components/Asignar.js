import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';
import ReactPaginate from 'react-js-pagination';


export default function Asignar() {
    const location = useLocation();

    const [dniInput, setDniInput] = useState("");
    const [usuarioporDNI, setusuarioporDNI] = useState([]);
    const [asesorPorEspecialidad, setasesorPorEspecialidad] = useState([]);
    const [AsesorConUsuario, setAsesorConUsuario] = useState([]);;
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [tieneAsesorPrincipal, setTieneAsesorPrincipal] = useState(false)

    const itemsCount = AsesorConUsuario.length;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = AsesorConUsuario.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        async function fetchAsesorConUsuario() {
            try {
                // console.log('Haciendo llamada a la API a:', 'http://localhost:5000/asesores_usuarios');
                const res = await axios.get('http://localhost:5000/asesores_usuarios');
                // console.log(res.data.message);
                // console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    const sortedAsesores = res.data.content.sort((a, b) => a.id - b.id);
                    /* SE ORDENA POR ID */
                    // console.log('Los asesores con usuarios son:', res.data.content);
                    setAsesorConUsuario(sortedAsesores);

                }
            } catch (error) {
                console.error('Error fetching usuarios con servicios:', error);
            }
        }

        fetchAsesorConUsuario();
    }, []);

    async function buscarUsuarioPorDNI(dni) {
        setTieneAsesorPrincipal(false);
        // console.log("DNI antes de limpiar:", dni);
        const cleanedDNI = dni.replace(/\s/g, '');
        // console.log("DNI limpio:", cleanedDNI);

        try {
            const res = await axios.get(`http://localhost:5000/usuarios/${cleanedDNI}`);
            // console.log("Usuario encontrado:", res.data);

            if (res.data.content) {
                // console.log("xddd", res.data.content);
                // console.log("xddd", res.data.content.asignacion[0]);
                if (res.data.content.asignacion[0]) {
                    setTieneAsesorPrincipal(true);
                }
                setusuarioporDNI([res.data.content]);

                try {
                    const resp = await axios.get(`http://localhost:5000/asesor/${res.data.content.carrera}`);
                    // console.log("Asesor encontrado:", resp.data);

                    if (resp.data.content && resp.data.content.length > 0) {
                        // console.log("Asesores encontrados:", resp.data.content);

                        setasesorPorEspecialidad([resp.data.content]);
                        // console.log("hola", asesorPorEspecialidad)
                    } else {
                        setasesorPorEspecialidad([]); // 
                    }

                } catch (error) {
                    console.error("Error buscando asesor por especialidad:", error);
                }
            } else {
                setusuarioporDNI([]); // No se encontró ningún usuario, establecer el estado como un array vacío
            }

        } catch (error) {
            console.error("Error buscando usuario por DNI:", error);
        }
    }

    async function asignarUsuarioAsesor(id_usuarios, id_asesor) {
        // console.log(id_asesor, id_usuarios);

        const userConfirmed = window.confirm('¿Estás seguro de realizar esta acción?');
        if (userConfirmed) {
            // El usuario eligió "Sí", realiza la acción correspondiente aquí
            try {
                await axios.post(`http://localhost:5000/asignaciones/${id_asesor}/${id_usuarios}`);
                // console.log("Asignación exitosa:", res.data);
                alert("La asignación fue exitosa");
                // alert(res.data.msg);
                window.location.reload();
            } catch (error) {
                console.error("Error al asignar:", error);
            }
        } else {
            // El usuario eligió "No" o cerró la ventana emergente
            // Realiza alguna acción en caso de cancelación si es necesario
        }

    }

    async function asignarUsuarioAsesorSec(id_usuarios, id_asesor) {
        if (id_usuarios) {

            const userConfirmed = window.confirm('¿Estás seguro de realizar esta acción?');
            // console.log(id_usuarios);
            if (userConfirmed) {
                try {
                    await axios.post(`http://localhost:5000/asignaciones_sec/${id_asesor}/${id_usuarios}`);
                    // console.log("Asignación exitosa:", res.data.msg);
                    alert("La asignación fue exitosa");
                    window.location.reload();
                } catch (error) {
                    console.error("Error al asignar:", error);
                }
            } else {
                // El usuario eligió "No" o cerró la ventana emergente
                // Realiza alguna acción en caso de cancelación si es necesario
            }
        } else {
            alert("Ingrese el DNI y presione el botón 'Buscar' para asignar un asesor secundario")
        }

    }

    return (
        <div className="asignar_container">
            <div className="franja_verd">
                <h1>Asignar Asesor Principal</h1>
            </div>
            <div className="asinar_asesor_container">
                <div className="asignar_card">
                    <h3>Coloque el DNI del usuario:</h3>
                    <div className="asesor_c">

                        <input
                            type="text"
                            className="input_dni_usuario"
                            value={dniInput}
                            onChange={(e) => setDniInput(e.target.value)}
                            placeholder="DNI"
                        />
                        <button className="button_backend_filtro" onClick={() => buscarUsuarioPorDNI(dniInput)}>Buscar</button>
                        <button className="button_backend_filtro" onClick={() => setusuarioporDNI([])}>Limpiar</button>
                    </div>
                </div>
                <h3>Usuario Encontrado</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>DNI</th>
                            <th>Celular</th>
                            <th>Carrera</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarioporDNI.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nombre}</td>
                                <td>
                                    {usuario.apePat}
                                    <br />
                                    {usuario.apeMat}
                                </td>
                                <td>{usuario.dni}</td>
                                <td>{usuario.celular}</td>
                                <td>{usuario.carrera}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Asignar Asesor Principal</h3>

                {tieneAsesorPrincipal === true ? (
                    <div>
                        {usuarioporDNI[0] ? (
                            <p className="texto_asesor_principal">
                                El usuario ya tiene un asesor principal: {usuarioporDNI[0].asignacion[0].asesor.nombre} {usuarioporDNI[0].asignacion[0].asesor.apePat}
                            </p>
                        ) : (
                            <p></p>
                        )}
                    </div>
                ) : (

                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Especialidad</th>
                                <th>Asesorados</th>
                                <th>Asignar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {asesorPorEspecialidad.map((innerArray, outerIndex) => (
                                innerArray.map((asesor) => (
                                    <tr key={`${outerIndex}-${asesor.id}`}>
                                        <td>{asesor.id}</td>
                                        <td>{asesor.nombre}</td>
                                        <td>{asesor.apePat}
                                            <br />
                                            {asesor.apeMat}</td>
                                        <td>
                                            <ul>
                                                {asesor.asesor_especialidad && asesor.asesor_especialidad.map(aseEsp => (
                                                    <li key={aseEsp.id}>
                                                        {aseEsp.especialidad.nombre_especialidad}
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        {/* console.log("Asesor encontradoxx:", resp.data.content[1].asignacion[0].id_estado); */}
                                        <td>
                                            {/* <ul>
                                            {asesor.asignacion && asesor.asignacion.map(aseEsp => (
                                                <li key={aseEsp.id}>
                                                    {aseEsp.usuario.nombre}
                                                    <br />
                                                    {aseEsp.usuario.apePat}
                                                    {aseEsp.id_estado}
                                                </li>
                                            ))}
                                        </ul> */}
                                            <ul>
                                                {asesor.asignacion.map(aseEsp => (
                                                    aseEsp.id_estado === 1 ? (
                                                        <li key={aseEsp.id}>
                                                            {aseEsp.usuario.nombre}
                                                            <br />
                                                            {aseEsp.usuario.apePat}
                                                            {aseEsp.id_estado}
                                                        </li>
                                                    ) : (
                                                        <li key={aseEsp.id}></li>
                                                    )
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            <button onClick={() => asignarUsuarioAsesor(usuarioporDNI[outerIndex].id, asesor.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-award-fill" viewBox="0 0 16 16">
                                                    <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
                                                    <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>

                )}

                <h3>Asignar Asesor Secundario</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Especialidad</th>
                            <th>Asesorados como <br /> Principal</th>
                            <th>Asesorados como <br /> Secundario</th>
                            <th>Asignar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(asesor => (
                            <tr key={asesor.id}>
                                <td>{asesor.id}</td>
                                <td>{asesor.nombre}</td>
                                <td>{asesor.apePat}</td>
                                <td>
                                    <ul>
                                        {asesor.asesor_especialidad && asesor.asesor_especialidad.map(aseEsp => (
                                            <li key={aseEsp.id}>
                                                {aseEsp.especialidad.nombre_especialidad}
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
                                    <ul>
                                        {asesor.asignacion_secundaria.map(AseUsu => (
                                            <li key={AseUsu.id}>
                                                {AseUsu.usuario.nombre}
                                                <br />
                                                {AseUsu.usuario.apePat}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>
                                    <button onClick={() => asignarUsuarioAsesorSec(usuarioporDNI[0]?.id || "", asesor.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-award-fill" viewBox="0 0 16 16">
                                            <path d="m8 0 1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z" />
                                            <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
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
