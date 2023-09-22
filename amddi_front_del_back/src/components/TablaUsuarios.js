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
    const [selectedEstado, setSelectedEstado] = useState(null);

    const [servicios, setServicios] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    const [editingUserId, setEditingUserId] = useState(null);

    const [editedUserName, setEditedUserName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
    const [editedSLastName, setEditedSLastName] = useState("");
    const [editedDepartment, setEditedDepartment] = useState("");

    const [editedCareer, setEditedCareer] = useState("");

    const [editedDNI, setEditedDNI] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedTema, setEditedTema] = useState("");
    const [editedEmail, setEditedEmail] = useState("");

    const [editedMontoTotal, setEditedMontoTotal] = useState(0.0);

    const [editedDDate, setEditedDDate] = useState("");

    const [montoEditado, setMontoEditado] = useState([]);

    const [estados, setEstados] = useState([]);


    useEffect(() => {
        async function fetchServicios() {
            try {
                // console.log('Haciendo llamada a la API a:', 'http://localhost:5000/servicios');
                const res = await axios.get('http://localhost:5000/servicios');
                // console.log(res.data.message);
                // console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setServicios(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching servicios:', error);
            }
        }

        fetchServicios();
    }, []);

    useEffect(() => {
        async function fetchEspecialidades() {
            try {
                // console.log('Haciendo llamada a la API a:', 'http://localhost:5000/especialidades');
                const res = await axios.get('http://localhost:5000/especialidades');
                // console.log(res.data.message);
                // console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setEspecialidades(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchEspecialidades();
    }, []);

    useEffect(() => {
        async function fetchEstado() {
            try {
                // console.log('Haciendo llamada a la API a:', 'http://localhost:5000/especialidades');
                const res = await axios.get('http://localhost:5000/estado');
                // console.log(res.data.message);
                // console.log('Response from server:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    console.log('Los estados son:', res.data.content);
                    setEstados(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching servicios:', error);
            }
        }

        fetchEstado();
    }, []);


    const handleEditar = (id) => {
        setEditingUserId(id);
        const userToEdit = usuariosConServicios.find(usuario => usuario.id === id);
        if (userToEdit) {
            setEditedUserName(userToEdit.nombre);
            setEditedLastName(userToEdit.apePat);
            setEditedSLastName(userToEdit.apeMat);
            setEditedDepartment(userToEdit.departamento);
            setEditedCareer(userToEdit.carrera);
            setEditedDNI(userToEdit.dni);
            setEditedPhone(userToEdit.celular);
            setEditedEmail(userToEdit.email);
            setEditedTema(userToEdit.tema);
            // setEditedPDF_URL(userToEdit.pdf_url);
            setEditedDDate(userToEdit.fecha_estimada);
            // setEditedMontoPagado(userToEdit.monto_pagado);
            setEditedMontoTotal(userToEdit.monto_total);
            setSelectedService(userToEdit.usuario_servicio[0]?.servicio.id || null);
            setMontoEditado(userToEdit.monto_pagado);

            // setSelectedEstado(userToEdit.usuario_servicio[0]?.servicio.id || null);
        }
        setEditingService(true);
        // setEditingAseSec(false);
        console.log(editingService);
    };


    const handleCancelar = () => {

        setEditingUserId(null);
        setEditedUserName("");
        setEditedLastName("");
        setEditedDepartment("");
        setEditedCareer("");
        setEditedTema("");
        setEditedEmail("");
        setEditedDNI("");
        setEditedPhone("");
        // setEditedPDF_URL("");
        // setEditedMontoPagado(0.0);
        setEditedMontoTotal(0.0);
        setEditedDDate("");

        // Limpiamos el servicio seleccionado al cancelar
        setSelectedService(null);
        setSelectedEstado(null);
        // setSelectedEspecialidad(null);

        // Desactivamos la edición del servicio
        setEditingService(false);
        setAsesorSecundario({});
    };

    const handleEliminar2 = async (id) => {
        console.log("elid", id);
        try {
            await axios.delete(`http://localhost:5000/asignacionesSec/${id}`)
        } catch (e) {
            console.error('Error al actualizar usuario o servicio:', e);
        }
        window.location.reload();
    }

    const handleOk = async (id) => {
        try {
            // Actualiza el usuario
            const usuarioData = {
                nombre: editedUserName,
                apePat: editedLastName,
                apeMat: editedSLastName,
                departamento: editedDepartment,
                carrera: editedCareer,
                dni: editedDNI,
                email: editedEmail,
                celular: editedPhone,
                tema: editedTema,
                fecha_estimada: editedDDate,
                // pdf_url: editedPDF_URL,
                // monto_pagado: editedMontoPagado,
                monto_total: editedMontoTotal,
            };

            console.log("hola", usuarioData);

            const usuarioRes = await axios.put(`http://localhost:5000/usuarios/${id}`, usuarioData);
            console.log('Usuario actualizado:', usuarioRes.data.message);
            // window.location.reload();
            // Actualiza el servicio si se ha seleccionado uno nuevo
            if (selectedService !== null) {
                const servicioData = {
                    id_servicio: selectedService,
                };
                const servicioRes = await axios.put(`http://localhost:5000/usuario_servicio/${id}/${selectedService}`, servicioData);
                console.log('Servicio actualizado:', servicioRes.data.message);
            }

            if (montoEditado !== null) {
                const monto_pagado = montoEditado.map((montoEditadoObj, index) => ({
                    // index, 
                    monto: montoEditadoObj.monto_pagado,
                    fecha: montoEditadoObj.fecha_pago,
                }));
                // console.log("holaaaa", monto_pagado)

                const res = await axios.put(`http://localhost:5000/monto_pagado/${id}`, {
                    monto_pagado: monto_pagado,
                });
                console.log("Monto pago", res.data.message);
            }
            // console.log("elasesorp", asesorPrincipal);
            if (asesorPrincipal !== "") {
                const data = {
                    id_usuario: id,
                    id_asesor: asesorPrincipal
                }
                console.log(data);
                const res = await axios.put(`http://localhost:5000/asignaciones`,
                    data
                );
                console.log("la data", res.data.message)
            }

            if (Object.keys(asesorSecundario).length > 0) {
                const dataS = {
                    id_usuario: id,
                    id_asesor: asesorSecundario
                }
                console.log("latadasec", dataS);
                const resP = await axios.put(`http://localhost:5000/asignacionesSec`,
                    dataS)
                console.log(resP.data.message)
            }

            if (selectedEstado !== "null") {
                const rep = await axios.put(`http://localhost:5000/asignacionesEstados/${id}`,
                    {
                        estado: selectedEstado,
                    })
                console.log("el estado", rep.data.message)
            }

            setEditingUserId(null);
            window.location.reload();
        } catch (error) {
            console.error('Error al actualizar usuario o servicio:', error);
        }
    };


    useEffect(() => {
        async function fetchUsuariosConServicios() {
            try {
                // console.log('Haciendo llamada a la API a:', 'http://localhost:5000/usuarios_con_servicio');
                const res = await axios.get('http://localhost:5000/usuarios_con_servicio');
                console.log(res.data.message);
                // console.log('Response from server:', res.data);
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

    const [asesores, setAsesores] = useState([]); // Utiliza useState para inicializar asesores como un arreglo vacío
    console.log(asesores);
    const [asesorPrincipal, setAsesorPrincipal] = useState(""); // Utiliza useState
    const [asesorSecundario, setAsesorSecundario] = useState({}); // Utiliza useState

    console.log("los asesores secundarios", asesorSecundario);
    console.log("len", Object.keys(asesorSecundario).length);

    useEffect(() => {
        async function fetchAsesores() {
            try {
                const res = await axios.get('http://localhost:5000/asesores');
                console.log(res.data.message);
                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Asesores:', res.data.content);
                    setAsesores(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching asesores:', error);
            }
        }

        fetchAsesores();
    }, []);


    const handleSearch = () => {
        console.log("el search es", searchTerm);
        console.log("ingreso aquì en el search");
        console.log(usuariosConServicios);
        const foundUser = usuariosConServicios.find(usuario => (
            usuario.nombre.includes(searchTerm) ||
            usuario.dni.includes(searchTerm) ||
            usuario.email.includes(searchTerm)
        ));
        console.log("el usuario encontrado", foundUser)
        console.log("el usuario encontrado", filteredUser)
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
            const userConfirmed = window.confirm('¿Estás seguro de eliminar a este asesor?');
            if (userConfirmed) {
                const res = await axios.delete(`http://localhost:5000/usuarios/${id}`);
                console.log('Asesor eliminado:', res.data.message);

                // Actualizar la lista de asesores después de eliminar uno
                const updatedAsesores = usuariosConServicios.filter(asesor => asesor.id !== id);
                setUsuariosConServicios(updatedAsesores);
                setCurrentPage(1);
            } else {
                // El usuario eligió "No" o cerró la ventana emergente
                // Realiza alguna acción en caso de cancelación si es necesario
            }
        } catch (error) {
            console.error('Error al eliminar asesor:', error);
        }
    };

    const handleEliminarPDF = async (id) => {
        console.log("eliminar", id);
        try {
            console.log("editar", (id));

            const res = await axios.delete(`http://localhost:5000/eliminar-pdf/${id}`);
            alert(res.data.msg);
            console.log('Asesor eliminado:', res.data.message);
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar pdf:', error);
        }
    }
    const handleEditarPDF = async (id) => {
        // Crea un objeto FormData para enviar el archivo PDF
        const formData = new FormData();
        formData.append("pdf", pdf);
        try {
            const res = await axios.put(`http://localhost:5000/actualizar-pdf/${id}`, formData);
            alert(res.data.msg);
            // console.log(res.data.msg);
        } catch (error) {
            console.error('Error al editar pdf:', error);
        }
    }

    // const [editedPDF_URL, setEditedPDF_URL] = useState("");

    const [pdf, setPdf] = useState(null);

    const handlePdfChange = (e) => {
        // Actualiza el estado con el archivo PDF seleccionado
        setPdf(e.target.files[0]);
    };



    return (
        <div className="tabla_usuarios">
            <div className="franja_verd">
                <h1>Lista de Usuarios</h1>
            </div>
            <div className="tabla_usuario_container">
                <div className="filtro_container filtro_usuarios">
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
                            <th>Mes</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>País</th>
                            <th>Departamento</th>
                            <th>Profesión</th>
                            <th>Institución Educativa</th>
                            <th>Email</th>
                            <th>DNI</th>
                            <th>Celular</th>
                            <th>PDF_URL</th>
                            <th>Precio de Contrato</th>
                            <th>Pago 1era cuota</th>
                            <th>Pago 2da cuota</th>
                            <th>Pago 3ra cuota</th>
                            <th>Pago 4ta cuota</th>
                            <th>Pago Restante</th>
                            <th>Servicio</th>
                            <th>Tema</th>
                            <th>Asesor Principal</th>
                            <th>Asesor Secundario</th>
                            <th>Estado</th>
                            <th>Fecha de Entrega</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUser ? (
                            <tr key={filteredUser.id}>
                                <td>{filteredUser.id}</td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedUserName}
                                            onChange={(e) => setEditedUserName(e.target.value)}
                                        />
                                    ) : (
                                        filteredUser.nombre
                                    )}
                                </td>
                                <td>{editingUserId === filteredUser.id ? (
                                    <input
                                        className="input_table_usuario"
                                        type="text"
                                        value={editedLastName}
                                        onChange={(e) => setEditedLastName(e.target.value)}
                                    />
                                ) : (
                                    filteredUser.apePat

                                )}
                                    <br />
                                    {editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedSLastName}
                                            onChange={(e) => setEditedSLastName(e.target.value)}
                                        />
                                    ) : (
                                        filteredUser.apeMat

                                    )}</td>
                                <td>{editingUserId === filteredUser.id ? (
                                    <input
                                        className="input_table_usuario"
                                        type="text"
                                        value={editedDepartment}
                                        onChange={(e) => setEditedDepartment(e.target.value)}
                                    />
                                ) : (
                                    filteredUser.departamento
                                )}</td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <select
                                            className="select_serv"
                                            value={editedCareer}
                                            onChange={(e) => setEditedCareer(e.target.value)}
                                        >
                                            {especialidades.map(especialidad => (
                                                <option key={especialidad.id} value={especialidad.nombre_especialidad}>
                                                    {especialidad.nombre_especialidad}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        filteredUser.carrera
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedEmail}
                                            onChange={(e) => setEditedEmail(e.target.value)}
                                        />
                                    ) : (
                                        filteredUser.email
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedDNI}
                                            onChange={(e) => setEditedDNI(e.target.value)}
                                        />
                                    ) : (
                                        filteredUser.dni
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedPhone}
                                            onChange={(e) => setEditedPhone(e.target.value)}
                                        />
                                    ) : (
                                        filteredUser.celular
                                    )}
                                </td>
                                <td>

                                    {editingUserId === filteredUser.id ? (
                                        // <input
                                        //     className="input_table_usuario"
                                        //     type="text"
                                        //     value={editedPDF_URL}
                                        //     onChange={(e) => setEditedPDF_URL(e.target.value)}
                                        // />
                                        filteredUser.pdf_url.map((pdf, index) => (
                                            <li key={index}>
                                                <input
                                                    className="xdd"
                                                    key={index}
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handlePdfChange}
                                                // Asegúrate de especificar el tipo de archivo permitido
                                                // onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                                />
                                                <div className="button_pdf">

                                                    <button onClick={() => handleEditarPDF(pdf.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" class="bi bi-send-check" viewBox="0 0 16 16">
                                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                                        </svg>
                                                    </button >
                                                    <button onClick={() => handleEliminarPDF(pdf.id)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        filteredUser.pdf_url.map((pdf, index) => (
                                            <li key={index}>
                                                <a href={`http://localhost:5000${pdf.pdf_url}`} target="_blank" rel="noopener noreferrer" downlad="true">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                                    </svg>
                                                </a>
                                                <br />
                                                {pdf.fecha_pdf_url}
                                                <br />
                                            </li>
                                        ))
                                    )}


                                </td>
                                <td>
                                    {filteredUser.monto_pagado.map((monto, index) => (
                                        <div key={index}>
                                            {editingUserId === filteredUser.id ? (
                                                <div>
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={montoEditado[index].monto_pagado}
                                                        onChange={(e) =>
                                                            setMontoEditado((prevMontoEditado) => {
                                                                const updatedMontoEditado = [...prevMontoEditado];
                                                                updatedMontoEditado[index] = {
                                                                    ...updatedMontoEditado[index],
                                                                    monto_pagado: e.target.value
                                                                };
                                                                return updatedMontoEditado;
                                                            })}

                                                    />
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={montoEditado[index].fecha_pago}
                                                        onChange={(e) => setMontoEditado((prevMontoEditado) => {
                                                            const updatedMontoEditado = [...prevMontoEditado];
                                                            updatedMontoEditado[index] = {
                                                                ...updatedMontoEditado[index],
                                                                fecha_pago: e.target.value
                                                            };
                                                            return updatedMontoEditado;
                                                        })}
                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    Monto: {monto.monto_pagado}
                                                    <br />
                                                    Fecha: {monto.fecha_pago}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedMontoTotal}
                                            onChange={(e) => setEditedMontoTotal(e.target.value)}
                                        />
                                    ) : (
                                        filteredUser.monto_total
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <select
                                            className="select_serv"
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
                                        filteredUser.usuario_servicio[0]?.servicio.nombre_servicio || ""
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedTema}
                                            onChange={(e) => setEditedTema(e.target.value)}
                                        />
                                    ) : (
                                        filteredUser.tema
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <>
                                            <ul>
                                                {filteredUser.asignacion.map(usuAse => (
                                                    <li key={usuAse.id}>
                                                        {usuAse.asesor.nombre}
                                                        <br />
                                                        {usuAse.asesor.apePat}
                                                    </li>
                                                ))}
                                            </ul>
                                            <select
                                                className="select_serv"
                                                value={asesorPrincipal}
                                                onChange={(e) => setAsesorPrincipal(e.target.value)}
                                            >
                                                <option value="">Seleccione un asesor</option>
                                                {asesores.map(asesor => (
                                                    <option key={asesor.id} value={asesor.id}>
                                                        {asesor.nombre} {asesor.apePat}

                                                    </option>
                                                ))}
                                            </select>
                                        </>

                                    ) : (
                                        <ul>
                                            {filteredUser.asignacion.map(usuAse => (
                                                <li key={usuAse.id}>
                                                    {usuAse.asesor.nombre}
                                                    <br />
                                                    {usuAse.asesor.apePat}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <ul>
                                            {filteredUser.asignacion_secundaria.map((usuAseSec, i) => (
                                                <li key={usuAseSec.id} className="asesor_li">
                                                    <div className="ase_eli">
                                                        {usuAseSec.asesor.nombre}
                                                        <br />
                                                        {usuAseSec.asesor.apePat}
                                                        <br />
                                                        <button onClick={() => handleEliminar2(usuAseSec.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    <select
                                                        className="select_serv"
                                                        value={asesorSecundario[i] || ''}
                                                        onChange={(e) => {
                                                            const selectedAsesorId = e.target.value;
                                                            setAsesorSecundario((prevAsesores) => ({
                                                                ...prevAsesores,
                                                                [i]: selectedAsesorId,
                                                            }));
                                                        }}
                                                    >
                                                        <option value="">Seleccione un asesor</option>
                                                        {asesores.map((asesor) => (
                                                            <option key={asesor.id} value={asesor.id}>
                                                                {asesor.nombre} {asesor.apePat}
                                                            </option>
                                                        ))}
                                                    </select>

                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <ul>
                                            {filteredUser.asignacion_secundaria.map((usuAseSec) => (
                                                <li key={usuAseSec.id}>
                                                    {usuAseSec.asesor.nombre}
                                                    <br />
                                                    {usuAseSec.asesor.apePat}
                                                    <br />
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <select
                                            className="select_serv"
                                            value={selectedEstado}
                                            onChange={(e) => setSelectedEstado(e.target.value)}
                                        >
                                            {estados.map(estado => (
                                                <option key={estado.id} value={estado.id}>
                                                    {estado.estado}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <ul>
                                            {filteredUser.asignacion.map(usuAse => (
                                                <li key={usuAse.id}>
                                                    {usuAse.estado.estado}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </td>
                                <td>
                                    {editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedDDate}
                                            onChange={(e) => setEditedDDate(e.target.value)}
                                        />
                                    ) : (
                                        filteredUser.fecha_estimada
                                    )}
                                </td>
                                <td>

                                    {editingUserId === filteredUser.id ? (
                                        <>
                                            <button onClick={() => handleOk(filteredUser.id)}>
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
                                        <button onClick={() => handleEditar(filteredUser.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                        </button>
                                    )}
                                </td>

                                <td><button onClick={() => handleEliminar(filteredUser.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </button></td>
                            </tr>
                        ) : (
                            currentData.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
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
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedLastName}
                                                onChange={(e) => setEditedLastName(e.target.value)}
                                            />
                                        ) : (
                                            usuario.apePat

                                        )}
                                        <br />
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedSLastName}
                                                onChange={(e) => setEditedSLastName(e.target.value)}
                                            />
                                        ) : (
                                            usuario.apeMat

                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
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
                                            <select
                                                className="select_serv"
                                                value={editedCareer}
                                                onChange={(e) => setEditedCareer(e.target.value)}
                                            >
                                                {especialidades.map(especialidad => (
                                                    <option key={especialidad.id} value={especialidad.nombre_especialidad}>
                                                        {especialidad.nombre_especialidad}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            usuario.carrera
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
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
                                                className="input_table_usuario"
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
                                                className="input_table_usuario"
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
                                            // <input
                                            //     className="input_table_usuario"
                                            //     type="text"
                                            //     value={editedPDF_URL}
                                            //     onChange={(e) => setEditedPDF_URL(e.target.value)}
                                            // />
                                            usuario.pdf_url.map((pdf, index) => (
                                                <li key={index}>
                                                    <input
                                                        className="xdd"
                                                        key={index}
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={handlePdfChange}
                                                    // Asegúrate de especificar el tipo de archivo permitido
                                                    // onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                                    />
                                                    <div className="button_pdf">

                                                        <button onClick={() => handleEditarPDF(pdf.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-send-check" viewBox="0 0 16 16">
                                                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                                            </svg>
                                                        </button >
                                                        <button onClick={() => handleEliminarPDF(pdf.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            usuario.pdf_url.map((pdf, index) => (
                                                <li key={index}>
                                                    <a href={`http://localhost:5000${pdf.pdf_url}`} target="_blank" rel="noopener noreferrer" downlad="true">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                                        </svg>
                                                    </a>
                                                    <br />
                                                    {pdf.fecha_pdf_url}
                                                    <br />
                                                </li>
                                            ))
                                        )}
                                    </td>
                                    <td>
                                        {usuario.monto_pagado.map((monto, index) => (
                                            <div key={index}>
                                                {editingUserId === usuario.id ? (
                                                    <div>
                                                        <input
                                                            className="input_table_usuario"
                                                            type="text"
                                                            value={montoEditado[index].monto_pagado}
                                                            onChange={(e) =>
                                                                setMontoEditado((prevMontoEditado) => {
                                                                    const updatedMontoEditado = [...prevMontoEditado];
                                                                    updatedMontoEditado[index] = {
                                                                        ...updatedMontoEditado[index],
                                                                        monto_pagado: e.target.value
                                                                    };
                                                                    return updatedMontoEditado;
                                                                })}

                                                        />
                                                        <input
                                                            className="input_table_usuario"
                                                            type="text"
                                                            value={montoEditado[index].fecha_pago}
                                                            onChange={(e) => setMontoEditado((prevMontoEditado) => {
                                                                const updatedMontoEditado = [...prevMontoEditado];
                                                                updatedMontoEditado[index] = {
                                                                    ...updatedMontoEditado[index],
                                                                    fecha_pago: e.target.value
                                                                };
                                                                return updatedMontoEditado;
                                                            })}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        Monto: {monto.monto_pagado}
                                                        <br />
                                                        Fecha: {monto.fecha_pago}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                    </td>

                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedMontoTotal}
                                                onChange={(e) => setEditedMontoTotal(e.target.value)}
                                            />
                                        ) : (
                                            usuario.monto_total
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <select
                                                className="select_serv"
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
                                    {/* TEMAAAAAAAAAAAAA */}
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedTema}
                                                onChange={(e) => setEditedTema(e.target.value)}
                                            />
                                        ) : (
                                            usuario.tema
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <>
                                                <ul>
                                                    {usuario.asignacion.map(usuAse => (
                                                        <li key={usuAse.id}>
                                                            {usuAse.asesor.nombre}
                                                            <br />
                                                            {usuAse.asesor.apePat}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <select
                                                    className="select_serv"
                                                    value={asesorPrincipal}
                                                    onChange={(e) => setAsesorPrincipal(e.target.value)}
                                                >
                                                    <option value="">Seleccione un asesor</option>
                                                    {asesores.map(asesor => (
                                                        <option key={asesor.id} value={asesor.id}>
                                                            {asesor.nombre} {asesor.apePat}

                                                        </option>
                                                    ))}
                                                </select>
                                            </>

                                        ) : (
                                            <ul>
                                                {usuario.asignacion.map(usuAse => (
                                                    <li key={usuAse.id}>
                                                        {usuAse.asesor.nombre}
                                                        <br />
                                                        {usuAse.asesor.apePat}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <ul>
                                                {usuario.asignacion_secundaria.map((usuAseSec, i) => (
                                                    <li key={usuAseSec.id} className="asesor_li">
                                                        <div className="ase_eli">
                                                            {usuAseSec.asesor.nombre}
                                                            <br />
                                                            {usuAseSec.asesor.apePat}
                                                            <br />
                                                            <button onClick={() => handleEliminar2(usuAseSec.id)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        <select
                                                            className="select_serv"
                                                            value={asesorSecundario[i] || ''}
                                                            onChange={(e) => {
                                                                const selectedAsesorId = e.target.value;
                                                                setAsesorSecundario((prevAsesores) => ({
                                                                    ...prevAsesores,
                                                                    [i]: selectedAsesorId,
                                                                }));
                                                            }}
                                                        >
                                                            <option value="">Seleccione un asesor</option>
                                                            {asesores.map((asesor) => (
                                                                <option key={asesor.id} value={asesor.id}>
                                                                    {asesor.nombre} {asesor.apePat}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <ul>
                                                {usuario.asignacion_secundaria.map((usuAseSec) => (
                                                    <li key={usuAseSec.id}>
                                                        {usuAseSec.asesor.nombre}
                                                        <br />
                                                        {usuAseSec.asesor.apePat}
                                                        <br />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>


                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <select
                                                className="select_serv"
                                                value={selectedEstado}
                                                onChange={(e) => setSelectedEstado(e.target.value)}
                                            >
                                                {estados.map(estado => (
                                                    <option key={estado.id} value={estado.id}>
                                                        {estado.estado}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <ul>
                                                {usuario.asignacion.map(usuAse => (
                                                    <li key={usuAse.id}>
                                                        {usuAse.estado.estado}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedDDate}
                                                onChange={(e) => setEditedDDate(e.target.value)}
                                            />
                                        ) : (
                                            usuario.fecha_estimada
                                        )}
                                    </td>
                                    <td>

                                        {editingUserId === usuario.id ? (
                                            <>
                                                <button onClick={() => handleOk(usuario.id)}>
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
                                            <button onClick={() => handleEditar(usuario.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            </button>
                                        )}
                                    </td>

                                    <td><button onClick={() => handleEliminar(usuario.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </button></td>
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
