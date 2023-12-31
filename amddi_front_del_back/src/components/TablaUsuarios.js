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
    // const [estados, setEstados] = useState([]);


    const [listaEstadosTesis, setListaEstadosTesis] = useState([]);
    const [listaEstadosObservacion, setListaEstadosObservacion] = useState([]);
    const [listaEstadosMonografia, setListaEstadosMonografia] = useState([]);
    const [listaEstadosPlanDeNegocio, setListaEstadosPlanDeNegocio] = useState([]);
    const [listaEstadosInformePracticas, setListaEstadosInformePracticas] = useState([]);
    const [listaEstadosTesinas, setListaEstadosTesinas] = useState([]);
    const [listaEstadosDiapositivas, setListaEstadosDiapositivas] = useState([]);
    const [listaEstadosParafraseo, setListaEstadosParafraseo] = useState([]);
    const [listaEstadosTrabajoSuficiencia, setListaEstadosTrabajoSuficiencia] = useState([]);
    const [listaEstadosArticulo, setListaEstadosArticulo] = useState([]);


    const [servicios, setServicios] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);

    const [editingUserId, setEditingUserId] = useState(null);

    const [editedUserName, setEditedUserName] = useState("");
    const [editedLastName, setEditedLastName] = useState("");
    const [editedSLastName, setEditedSLastName] = useState("");
    const [editedDepartment, setEditedDepartment] = useState("");

    const [editedCareer, setEditedCareer] = useState("");

    const [editedIdAmddi, setEditedIdAmddi] = useState("");
    const [editedPais, setEditedPais] = useState("");
    const [editedInstitucionEducativa, setEditedInstitucionEducativa] = useState("");

    const [editedDNI, setEditedDNI] = useState("");
    const [editedLink, setEditedLink] = useState("");
    const [editedPhone, setEditedPhone] = useState("");
    const [editedTema, setEditedTema] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedAsesorVentas, setEditedAsesorVentas] = useState("");

    const [editedMontoPagado, setEditedMontoPagado] = useState("");
    const [editedFechaPago, setEditedFechaPago] = useState("");
    const [editedMontoPagado1, setEditedMontoPagado1] = useState("");
    const [editedFechaPago1, setEditedFechaPago1] = useState("");
    const [editedMontoPagado2, setEditedMontoPagado2] = useState("");
    const [editedFechaPago2, setEditedFechaPago2] = useState("");
    const [editedMontoPagado3, setEditedMontoPagado3] = useState("");
    const [editedFechaPago3, setEditedFechaPago3] = useState("");
    const [editedCategoria, setEditedCategoria] = useState("");

    const [editedMontoTotal, setEditedMontoTotal] = useState(0.0);

    const [editedDDate, setEditedDDate] = useState("");

    // const [montoEditado, setMontoEditado] = useState([]);



    useEffect(() => {
        async function fetchServicios() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/servicios');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/servicios');
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
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/especialidades');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/especialidades');
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
        async function fetchTesis() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_tesis');
                // console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosTesis(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchTesis();
    }, []);


    useEffect(() => {
        async function fetchObservacion() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Observacion');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_observacion');
                // console.log(res.data.message);
                // console.log('Response from server o:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosObservacion(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchObservacion();
    }, []);

    useEffect(() => {
        async function fetchTrabajoSuficiencia() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_trabajo_suficiencia');
                // console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosTrabajoSuficiencia(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchTrabajoSuficiencia();
    }, []);
    useEffect(() => {
        async function fetchTesinas() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_tesinas');
                console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosTesinas(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchTesinas();
    }, []);
    useEffect(() => {
        async function fetchPlanDeNegocio() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_plan_de_negocio');
                // console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosPlanDeNegocio(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchPlanDeNegocio();
    }, []);
    useEffect(() => {
        async function fetchMonografia() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_monografia');
                // console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosMonografia(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchMonografia();
    }, []);
    useEffect(() => {
        async function fetchInformePracticas() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_informe_de_practicas');
                // console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosInformePracticas(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchInformePracticas();
    }, []);
    useEffect(() => {
        async function fetchDiapositivas() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_diapositivas');
                console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosDiapositivas(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchDiapositivas();
    }, []);

    useEffect(() => {
        async function fetchParafraseo() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_tesis');
                // console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosParafraseo(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchParafraseo();
    }, []);
    useEffect(() => {
        async function fetchArticulo() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/Tesis');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/estado_articulo');
                // console.log(res.data.message);
                // console.log('Response from server t:', res.data);

                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Los servicios son:', res.data.content);
                    setListaEstadosArticulo(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching estados:', error);
            }
        }

        fetchArticulo();
    }, []);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;

        // Validar el formato y eliminar caracteres no permitidos
        if (inputValue.trim() !== '') {
            // Validar el formato y eliminar caracteres no permitidos
            const cleanedValue = inputValue.replace(/[^0-9/]/g, '');

            // Dividir la entrada en partes (día, mes, año) utilizando las barras diagonales
            const parts = cleanedValue.split('/');

            // Obtener los valores numéricos de día, mes y año
            const day = parseInt(parts[0]) || '';
            const month = parseInt(parts[1]) || '';
            const year = parseInt(parts[2]) || '';

            // Verificar si el primer dígito de día y mes es cero y corregirlo
            if (day.toString().length > 1 && day.toString()[0] === '0') {
                // Eliminar el cero al inicio
                parts[0] = day.toString().substring(1);
            }
            if (month.toString().length > 1 && month.toString()[0] === '0') {
                // Eliminar el cero al inicio
                parts[1] = month.toString().substring(1);
            }

            // Formatear la fecha en el formato deseado (día/mes/año)
            const formattedDate = `${parts[0]}/${parts[1]}/${year}`;

            // Actualizar el estado con la fecha formateada
            setEditedDDate(formattedDate);
        }
    };

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
            setEditedLink(userToEdit.link);
            setEditedPhone(userToEdit.celular);
            setEditedEmail(userToEdit.email);
            setEditedAsesorVentas(userToEdit.asesor_ventas);
            setEditedTema(userToEdit.tema);
            setEditedIdAmddi(userToEdit.id_amddi);
            setEditedPais(userToEdit.pais);
            setEditedCategoria(userToEdit.categoria);
            setEditedInstitucionEducativa(userToEdit.institucion_educativa);

            setSelectedEstado(userToEdit.estado);

            // setEditedMontoPagado(userToEdit.monto_pagado[0].monto_pagado || 0);
            setEditedMontoPagado(userToEdit.monto_pagado && userToEdit.monto_pagado[0] ? parseFloat(userToEdit.monto_pagado[0].monto_pagado) || 0 : 0);

            setEditedFechaPago(userToEdit.monto_pagado && userToEdit.monto_pagado[0] && userToEdit.monto_pagado[0].fecha_pago ? userToEdit.monto_pagado[0].fecha_pago : '');


            if (userToEdit.monto_pagado.length > 1) {

                setEditedMontoPagado1(userToEdit.monto_pagado[1].monto_pagado || '');
                setEditedFechaPago1(userToEdit.monto_pagado[1].fecha_pago || '');
            }

            if (userToEdit.monto_pagado.length > 2) {

                setEditedMontoPagado2(userToEdit.monto_pagado[2].monto_pagado || '');
                setEditedFechaPago2(userToEdit.monto_pagado[2].fecha_pago || '');
            }


            if (userToEdit.monto_pagado.length > 3) {
                setEditedMontoPagado3(userToEdit.monto_pagado[3].monto_pagado || '');
                setEditedFechaPago3(userToEdit.monto_pagado[3].fecha_pago || '');

            }


            setEditedDDate(userToEdit.fecha_estimada);
            // setEditedMontoPagado(userToEdit.monto_pagado);
            setEditedMontoTotal(userToEdit.monto_total);
            setSelectedService(userToEdit.usuario_servicio[0]?.servicio.id || null);
            // setMontoEditado(userToEdit.monto_pagado);

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
        setEditedAsesorVentas("");
        setEditedDNI("");
        setEditedLink("");
        setEditedPhone("");
        setEditedIdAmddi("");
        setEditedPais("");
        setEditedCategoria("");
        // setEditedPDF_URL("");
        // setEditedMontoPagado(0.0);
        setEditedMontoTotal(0.0);
        setEditedDDate("");
        setEditedInstitucionEducativa("");

        // Limpiamos el servicio seleccionado al cancelar
        setSelectedService(null);
        setSelectedEstado(null);

        setSelectedEstado("");

        setEditedFechaPago("");
        setEditedFechaPago1("");
        setEditedFechaPago2("");
        setEditedFechaPago3("");

        setEditedMontoPagado("");
        setEditedMontoPagado1("");
        setEditedMontoPagado2("");
        setEditedMontoPagado3("");

        // Desactivamos la edición del servicio
        setEditingService(false);
        setAsesorSecundario({});
    };

    const handleEliminar2 = async (id) => {
        console.log("elid", id);
        try {
            await axios.delete(`https://amddibackend-production-2880.up.railway.app/asignacionesSec/${id}`)
        } catch (e) {
            console.error('Error al actualizar usuario o servicio:', e);
        }
        window.location.reload();
    }

    const handleOk = async (id) => {
        // Utilizamos una expresión regular para verificar el formato "día/mes/año"
        const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;

        if (editedDDate !== null && editedDDate.trim() !== '') {
            // Verificar si el formato no es válido
            if (!dateFormat.test(editedDDate)) {
                // Si el formato no es válido, mostrar una alerta
                window.alert('Formato de fecha incorrecto. El formato debe ser día/mes/año sin ceros adelante de los días y meses.');
                return;
            }
        }


        try {
            // Actualiza el usuario
            const usuarioData = {
                nombre: editedUserName,
                apePat: editedLastName,
                apeMat: editedSLastName,
                departamento: editedDepartment,
                carrera: editedCareer,
                dni: editedDNI,
                link_reunion: editedLink,
                email: editedEmail,
                celular: editedPhone,
                categoria: editedCategoria,
                asesor_ventas: editedAsesorVentas,
                tema: editedTema,
                pais: editedPais,
                institucion_educativa: editedInstitucionEducativa,
                id_amddi: editedIdAmddi,
                fecha_estimada: editedDDate,
                estado: selectedEstado,
                monto_total: editedMontoTotal,
            };

            console.log("hola", usuarioData);

            await axios.put(`https://amddibackend-production-2880.up.railway.app/usuarios/${id}`, usuarioData);
            // console.log('Usuario actualizado:', usuarioRes.data.message);
            // window.location.reload();
            // Actualiza el servicio si se ha seleccionado uno nuevo
            if (selectedService !== null) {
                const servicioData = {
                    id_servicio: selectedService,
                };
                await axios.put(`https://amddibackend-production-2880.up.railway.app/usuario_servicio/${id}/${selectedService}`, servicioData);
                // console.log('Servicio actualizado:', servicioRes.data.message);
            }

            if (asesorPrincipal !== "") {
                const data = {
                    id_usuario: id,
                    id_asesor: asesorPrincipal
                }
                // console.log(data);
                await axios.put(`https://amddibackend-production-2880.up.railway.app/asignaciones`,
                    data
                );
                // console.log("la data", res.data.message)
            }

            if (Object.keys(asesorSecundario).length > 0) {
                const dataS = {
                    id_usuario: id,
                    id_asesor: asesorSecundario
                }
                // console.log("latadasec", dataS);
                await axios.put(`https://amddibackend-production-2880.up.railway.app/asignacionesSec`,
                    dataS)
                // console.log(resP.data.message)
            }

            const monto_pagado = [];

            function agregarMontoPagado(position, monto, fecha) {
                if (monto !== "" || fecha !== "") {
                    monto_pagado.push({
                        position,
                        monto_pagado: monto !== "" ? parseFloat(monto) : null,
                        fecha_pago: fecha !== "" ? fecha : null,
                    });
                }
            }

            agregarMontoPagado(0, editedMontoPagado, editedFechaPago);
            agregarMontoPagado(1, editedMontoPagado1, editedFechaPago1);
            agregarMontoPagado(2, editedMontoPagado2, editedFechaPago2);
            agregarMontoPagado(3, editedMontoPagado3, editedFechaPago3);

            if (monto_pagado.length > 0) {
                await axios.put(`https://amddibackend-production-2880.up.railway.app/monto_pagado/${id}`, {
                    monto_pagado,
                });
                // alert("Monto pagado actualizado");
                // console.log("hoal", monto_pagado);
            }

            setEditingUserId(null);
            window.location.reload();
        } catch (error) {
            const errorMessage = error.response.data.message;
            console.error('Error al actualizar usuario o servicio:', errorMessage);
            alert('Error al actualizar usuario o servicio: ' + errorMessage);
        }
    };


    useEffect(() => {
        async function fetchUsuariosConServicios() {
            try {
                // console.log('Haciendo llamada a la API a:', 'https://amddibackend-production-2880.up.railway.app/usuarios_con_servicio');
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/usuarios_con_servicio');
                // console.log('Response from server:', res.data);
                if (res.data.content && Array.isArray(res.data.content)) {
                    // console.log('Usuarios con servicios recibidos:', res.data.content);
                    setUsuariosConServicios(res.data.content);
                }
            } catch (error) {
                console.error('Error fetching usuarios con servicios:', error);
            }
        }

        fetchUsuariosConServicios();
    }, []);

    // console.log("usuario", usuariosConServicios);

    const [asesores, setAsesores] = useState([]); // Utiliza useState para inicializar asesores como un arreglo vacío
    // console.log(asesores);
    const [asesorPrincipal, setAsesorPrincipal] = useState(""); // Utiliza useState
    const [asesorSecundario, setAsesorSecundario] = useState({}); // Utiliza useState

    // console.log("los asesores secundarios", asesorSecundario);
    // console.log("len", Object.keys(asesorSecundario).length);

    useEffect(() => {
        async function fetchAsesores() {
            try {
                const res = await axios.get('https://amddibackend-production-2880.up.railway.app/asesores');
                // console.log(res.data.message);
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


    // const handleSearch = () => {
    //     const searchTerms1 = searchTerm.trim().replace(/\s+/g, ' ');
    //     let cleanedSearchTerm = searchTerm.replace(/\s/g, "");

    //     console.log(searchTerms1);
    //     const foundUser = usuariosConServicios.map(usuario => {
    //         const urgencia = usuario.fecha_estimada ? getColor(usuario.fecha_estimada) : null;
    //         const mes = usuario.monto_pagado[0]?.fecha_pago ? obtenerNombreMes(usuario.monto_pagado[0].fecha_pago) : null;
    //         if (cleanedSearchTerm === '1') {
    //             cleanedSearchTerm = 'red'
    //         }
/*             if (cleanedSearchTerm === '2') {
                cleanedSearchTerm = '#ffd700'
            }
            if (cleanedSearchTerm === '3') {
                cleanedSearchTerm = '#00d799'
            } */
    //         if (cleanedSearchTerm === 'FINALIZADO') {
    //             cleanedSearchTerm = 'black'
    //         }
    //         const idAmddiMatches = usuario.id_amddi && usuario.id_amddi.startsWith(cleanedSearchTerm);

    //         return {
    //             ...usuario,
    //             urgencia,
    //             mes,
    //             idAmddiMatches
    //         };

    //     }).filter(usuario => {
    //         return (
    //             usuario.urgencia.includes(cleanedSearchTerm) ||
    //             usuario.mes.includes(cleanedSearchTerm) ||
    //             usuario.departamento.includes(cleanedSearchTerm) ||
    //             (usuario.asesor_ventas && usuario.asesor_ventas.includes(searchTerms1)) ||
    //             usuario.pais.includes(cleanedSearchTerm) ||
    //             usuario.dni.includes(cleanedSearchTerm) ||
    //             usuario.email.includes(cleanedSearchTerm) ||
    //             (usuario.id_amddi && usuario.id_amddi.toString().includes(cleanedSearchTerm)) || usuario.idAmddiMatches
    //         );
    //     });
    //     console.log(foundUser);
    //     setFilteredUser(foundUser);
    // };

    const handleSearch = () => {
        const searchTerms1 = searchTerm.trim().replace(/\s+/g, ' ');
        let cleanedSearchTerm = searchTerm.trim();

        console.log(searchTerms1);
        const foundUser = usuariosConServicios.map(usuario => {
            const urgencia = usuario.fecha_estimada ? getColor(usuario.fecha_estimada) : null;
            const mes = usuario.monto_pagado[0]?.fecha_pago ? obtenerNombreMes(usuario.monto_pagado[0].fecha_pago) : null;
            let idAmddiMatches = false;

            if (cleanedSearchTerm === 'URGENCIA1') {
                cleanedSearchTerm = 'red';
            }
            if (cleanedSearchTerm === 'URGENCIA2') {
                cleanedSearchTerm = '#ffd700'
            }
            if (cleanedSearchTerm === 'URGENCIA3') {
                cleanedSearchTerm = '#00d799'
            }

            idAmddiMatches = cleanedSearchTerm.includes('-') ? usuario.id_amddi?.toString().includes(cleanedSearchTerm) : false;

            return {
                ...usuario,
                urgencia,
                mes,
                idAmddiMatches
            };
        }).filter(usuario => {
            const searchTermLower = cleanedSearchTerm.toLowerCase();
            return (
                (usuario.urgencia && usuario.urgencia === cleanedSearchTerm) || // Filtrar por coincidencia exacta de urgencia
                (usuario.mes && usuario.mes.includes(cleanedSearchTerm)) ||
                (usuario.departamento && usuario.departamento.includes(cleanedSearchTerm)) ||
                (usuario.asesor_ventas && usuario.asesor_ventas.includes(searchTerms1)) ||
                (usuario.pais && usuario.pais.includes(cleanedSearchTerm)) ||
                (usuario.nombre && usuario.nombre.includes(cleanedSearchTerm)) ||
                (usuario.dni && usuario.dni.includes(cleanedSearchTerm)) ||
                ((searchTermLower.includes('@') ? usuario.email === searchTermLower : false)) || // Búsqueda estricta por correo electrónico
                (usuario.estado && usuario.estado === cleanedSearchTerm) || // Filtrar por estado
                usuario.idAmddiMatches
            );
        });

        console.log(foundUser);
        console.log(foundUser);
        console.log(foundUser);
        console.log(foundUser);
        setFilteredUser(foundUser);
    };




    const clearSearch = () => {
        setSearchTerm("");
        setFilteredUser(null);
        window.location.reload();
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
                const res = await axios.delete(`https://amddibackend-production-2880.up.railway.app/usuarios/${id}`);
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
        // Mostrar una confirmación al usuario
        const confirmarEliminacion = window.confirm('¿Estás seguro de que deseas eliminar este PDF?');

        if (confirmarEliminacion) {
            try {
                console.log("eliminar", id);

                const res = await axios.delete(`https://amddibackend-production-2880.up.railway.app/eliminar-pdf/${id}`);
                alert(res.data.msg);
                console.log('PDF eliminado:', res.data.message);
                window.location.reload();
            } catch (error) {
                console.error('Error al eliminar PDF:', error);
            }
        } else {
            // El usuario canceló la eliminación, no hacer nada
            console.log('Eliminación cancelada por el usuario');
        }
    };


    const handleEditarPDF = async (id) => {
        // Mostrar una confirmación al usuario
        const confirmarEdicion = window.confirm('¿Estás seguro de que deseas editar este PDF?');

        if (confirmarEdicion) {
            // Crea un objeto FormData para enviar el archivo PDF
            const formData = new FormData();
            formData.append("file", pdf);

            try {
                await axios.put(`https://amddibackend-production-2880.up.railway.app/update/${id}`, formData);
                alert('PDF editado exitosamente');
            } catch (error) {
                console.error('Error al editar PDF:', error);
            }
        } else {
            // El usuario canceló la edición, no hacer nada
            console.log('Edición cancelada por el usuario');
        }
    };


    // const [editedPDF_URL, setEditedPDF_URL] = useState("");

    const [pdf, setPdf] = useState(null);

    const handlePdfChange = (e) => {
        // Actualiza el estado con el archivo PDF seleccionado
        setPdf(e.target.files[0]);
    };


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

    function obtenerNombreMes(fecha) {
        const meses = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        if (fecha) {
            const partesFecha = fecha.split('/');
            console.log(partesFecha);
            if (partesFecha.length === 3) {
                const numeroMes = parseInt(partesFecha[1], 10);
                console.log(numeroMes);
                if (!isNaN(numeroMes) && numeroMes >= 1 && numeroMes <= 12) {
                    return meses[numeroMes - 1];
                }
            }
        }

        return '-';
    }

    return (
        <div className="tabla_usuarios">
            <div className="franja_verd">
                <h1>Lista de Usuarios</h1>
            </div>
            <div className="tabla_usuario_container">
                <div className="filtro_container filtro_usuarios">
                    <input
                        type="text"
                        className="input_filtro input_usuario_filtro"
                        placeholder="Filtrar por Id Usuario, DNI, Mes, Email, Nombre Asesor o Urgencia(1,2,3,FINALIZADO)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="button_backend_filtro" onClick={handleSearch}>Buscar</button>
                    <button className="button_backend_filtro" onClick={clearSearch}>Limpiar</button>
                </div>
                <table className="table">
                    <thead>
                        <tr className="fondo_header">
                            <th>Nº</th>
                            <th>Mes</th>
                            <th>Id Usuario</th>
                            <th>Categoría</th>
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
                            <th>Link del drive</th>
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
                            <th>Asesor de Ventas</th>
                            <th>Estado</th>
                            <th>Fecha de Entrega</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUser ? (
                            filteredUser.map(filteredUser => (

                                <tr key={filteredUser.id}>
                                    <td>{filteredUser.id}</td>
                                    <td>
                                        {filteredUser.monto_pagado && filteredUser.monto_pagado.length > 0
                                            ? obtenerNombreMes(filteredUser.monto_pagado[0].fecha_pago)
                                            : '-'}
                                    </td>
                                    <td>{editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedIdAmddi}
                                            onChange={(e) => setEditedIdAmddi(
                                                e.target.value
                                            )}
                                        />
                                    ) : (
                                        filteredUser.id_amddi ? filteredUser.id_amddi : '-'
                                    )}
                                    </td>
                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <select
                                                className="select_serv"
                                                value={editedCategoria}
                                                onChange={(e) => setEditedCategoria(e.target.value)}
                                            >
                                                <option value="Premium">Premium</option>
                                                <option value="Normal">Normal</option>
                                            </select>
                                        ) : (
                                            filteredUser.categoria
                                        )}
                                    </td>

                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedUserName}
                                                onChange={(e) => setEditedUserName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
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
                                            onChange={(e) => setEditedLastName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
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
                                                onChange={(e) => setEditedSLastName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                                            />
                                        ) : (
                                            filteredUser.apeMat

                                        )}</td>
                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedPais}
                                                onChange={(e) => setEditedPais(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                                            />
                                        ) : (
                                            filteredUser.pais ? filteredUser.pais : '-'
                                        )}
                                    </td>
                                    <td>{editingUserId === filteredUser.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedDepartment}
                                            onChange={(e) => setEditedDepartment(e.target.value.replace(/[^a-zA-Z]/g, ''))}
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
                                                value={editedInstitucionEducativa}
                                                onChange={(e) => setEditedInstitucionEducativa(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                                            />
                                        ) : (
                                            filteredUser.institucion_educativa ? filteredUser.institucion_educativa : '-'
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="email"
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
                                                onChange={(e) => setEditedDNI(e.target.value.replace(/[^0-9]/g, ''))}
                                            />
                                        ) : (
                                            filteredUser.dni
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="number"
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
                                                        accept=".doc, .docx"
                                                        onChange={handlePdfChange}
                                                    // Asegúrate de especificar el tipo de archivo permitido
                                                    // onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                                    />
                                                    <div className="button_pdf">

                                                        <button onClick={() => handleEditarPDF(pdf.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-send-check" viewBox="0 0 16 16">
                                                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                                            </svg>
                                                        </button >
                                                        <button onClick={() => handleEliminarPDF(pdf.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="red" className="bi bi-trash" viewBox="0 0 16 16">
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
                                                    <a href={`https://amddibackend-production-2880.up.railway.app${pdf.pdf_url}`} target="_blank" rel="noopener noreferrer" downlad="true">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#00d799" class="bi bi-file-earmark-word" viewBox="0 0 16 16">
                                                            <path d="M5.485 6.879a.5.5 0 1 0-.97.242l1.5 6a.5.5 0 0 0 .967.01L8 9.402l1.018 3.73a.5.5 0 0 0 .967-.01l1.5-6a.5.5 0 0 0-.97-.242l-1.036 4.144-.997-3.655a.5.5 0 0 0-.964 0l-.997 3.655L5.485 6.88z" />
                                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                                        </svg>
                                                    </a>
                                                    <br />
                                                    {pdf.fecha_pdf_url}
                                                    <br />
                                                </li>
                                            ))
                                        )}


                                    </td>
                                    {/* <td>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedLink}
                                                onChange={(e) => setEditedLink(e.target.value.replace(/[^0-9]/g, ''))}
                                            />
                                        ) : (
                                            filteredUser.link_reunion
                                        )}
                                    </td> */}
                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedLink}
                                                onChange={(e) =>
                                                    setEditedLink(e.target.value.replace(/[^0-9]/g, ''))
                                                }
                                            />
                                        ) : (
                                            filteredUser.link_reunion ? (
                                                <a href={filteredUser.link_reunion} target="_blank" rel="noopener noreferrer">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="#00d799"
                                                        className="bi bi-browser-chrome"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                                                        />
                                                    </svg>
                                                </a>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="red"
                                                    className="bi bi-browser-chrome"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                                                    />
                                                </svg>
                                            )
                                        )}
                                    </td>

                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="number"
                                                step="0.1"
                                                value={editedMontoTotal}
                                                onChange={(e) => setEditedMontoTotal(e.target.value)}
                                            />
                                        ) : (
                                            filteredUser.monto_total
                                        )}
                                    </td>
                                    {/* <td>
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

                                </td> */}
                                    <td>
                                        {filteredUser.monto_pagado && filteredUser.monto_pagado.length > 0 ? (
                                            <>                                        {editingUserId === filteredUser.id ? (
                                                <input
                                                    className="input_table_usuario"
                                                    type="number"
                                                    step="0.1"
                                                    value={editedMontoPagado}
                                                    onChange={(e) => setEditedMontoPagado(e.target.value)}
                                                />
                                            ) : (
                                                filteredUser.monto_pagado[0].monto_pagado
                                            )}
                                                <br />
                                                {editingUserId === filteredUser.id ? (
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={editedFechaPago}
                                                        onChange={(e) => setEditedFechaPago(e.target.value)}
                                                    />
                                                ) : (
                                                    filteredUser.monto_pagado[0].fecha_pago
                                                )}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        {filteredUser.monto_pagado && filteredUser.monto_pagado.length > 1 ? (
                                            <>                                        {editingUserId === filteredUser.id ? (
                                                <input
                                                    className="input_table_usuario"
                                                    type="number"
                                                    step="0.1"
                                                    value={editedMontoPagado}
                                                    onChange={(e) => setEditedMontoPagado(e.target.value)}
                                                />
                                            ) : (
                                                filteredUser.monto_pagado[1].monto_pagado
                                            )}
                                                <br />
                                                {editingUserId === filteredUser.id ? (
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={editedFechaPago}
                                                        onChange={(e) => setEditedFechaPago(e.target.value)}
                                                    />
                                                ) : (
                                                    filteredUser.monto_pagado[1].fecha_pago
                                                )}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        {filteredUser.monto_pagado && filteredUser.monto_pagado.length > 2 ? (
                                            <>                                        {editingUserId === filteredUser.id ? (
                                                <input
                                                    className="input_table_usuario"
                                                    type="number"
                                                    step="0.1"
                                                    value={editedMontoPagado}
                                                    onChange={(e) => setEditedMontoPagado(e.target.value)}
                                                />
                                            ) : (
                                                filteredUser.monto_pagado[2].monto_pagado
                                            )}
                                                <br />
                                                {editingUserId === filteredUser.id ? (
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={editedFechaPago}
                                                        onChange={(e) => setEditedFechaPago(e.target.value)}
                                                    />
                                                ) : (
                                                    filteredUser.monto_pagado[2].fecha_pago
                                                )}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        {filteredUser.monto_pagado && filteredUser.monto_pagado.length > 3 ? (
                                            <>                                        {editingUserId === filteredUser.id ? (
                                                <input
                                                    className="input_table_usuario"
                                                    type="number"
                                                    step="0.1"
                                                    value={editedMontoPagado}
                                                    onChange={(e) => setEditedMontoPagado(e.target.value)}
                                                />
                                            ) : (
                                                filteredUser.monto_pagado[3].monto_pagado
                                            )}
                                                <br />
                                                {editingUserId === filteredUser.id ? (
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={editedFechaPago}
                                                        onChange={(e) => setEditedFechaPago(e.target.value)}
                                                    />
                                                ) : (
                                                    filteredUser.monto_pagado[3].fecha_pago
                                                )}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>{filteredUser.monto_restante} </td>
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
                                                onChange={(e) =>
                                                    setEditedTema(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, ''))
                                                }
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
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="red" className="bi bi-trash" viewBox="0 0 16 16">
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
                                    {/* <td>
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
                                </td> */}
                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedAsesorVentas}
                                                onChange={(e) => setEditedAsesorVentas(e.target.value.replace(/[^a-zA-Z ]/g, ''))}
                                            />
                                        ) : (
                                            filteredUser.asesor_ventas ? filteredUser.asesor_ventas : '-'
                                        )}
                                    </td>
                                    {/* <td>
                                        {editingUserId === filteredUser.id ? (
                                            <select
                                                className="select_serv"
                                                value={selectedEstado}
                                                onChange={(e) => setSelectedEstado(e.target.value)}
                                            >
                                                {filteredUser.usuario_servicio[0].servicio.id === 1 || filteredUser.usuario_servicio[0].servicio.id === 2 || filteredUser.usuario_servicio[0].servicio.id === 3 ? (
                                                    listaEstadosTesis.map(estado => (
                                                        <option key={estado.id} value={estado.estado}>
                                                            {estado.estado}
                                                        </option>
                                                    ))
                                                ) : filteredUser.usuario_servicio[0].servicio.id === 4 || filteredUser.usuario_servicio[0].servicio.id === 5 ? (
                                                    listaEstadosObservacion.map(estado => (
                                                        <option key={estado.id} value={estado.estado}>
                                                            {estado.estado}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">Falta asignar servicio</option>
                                                )}
                                            </select>
                                        ) : (
                                            <ul>
                                                {filteredUser.estado}
                                            </ul>
                                        )}
                                    </td> */}
                                    <td>
                                        {editingUserId === filteredUser.id ? (
                                            <select
                                                className="select_serv"
                                                value={selectedEstado}
                                                onChange={(e) => setSelectedEstado(e.target.value)}
                                            >
                                                {filteredUser.usuario_servicio[0] ? (
                                                    <>
                                                        {filteredUser.usuario_servicio[0].servicio.id === 1 ||
                                                            filteredUser.usuario_servicio[0].servicio.id === 2 ||
                                                            filteredUser.usuario_servicio[0].servicio.id === 3 ? (
                                                            listaEstadosTesis.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 4 ||
                                                            filteredUser.usuario_servicio[0].servicio.id === 5 ? (
                                                            listaEstadosObservacion.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 6 ? (
                                                            listaEstadosParafraseo.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 7 ? (
                                                            listaEstadosTrabajoSuficiencia.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 8 ||
                                                            filteredUser.usuario_servicio[0].servicio.id === 9 ||
                                                            filteredUser.usuario_servicio[0].servicio.id === 10 ? (
                                                            listaEstadosArticulo.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 11 ? (
                                                            listaEstadosMonografia.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 12 ? (
                                                            listaEstadosPlanDeNegocio.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 13 ? (
                                                            listaEstadosInformePracticas.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 14 ? (
                                                            listaEstadosTesinas.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : filteredUser.usuario_servicio[0].servicio.id === 15 ? (
                                                            listaEstadosDiapositivas.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="">Falta asignar servicio</option>
                                                        )}
                                                    </>
                                                ) : (
                                                    <option value="">-</option>
                                                )}
                                            </select>
                                        ) : (
                                            <ul>
                                                {filteredUser.usuario_servicio[0] ? filteredUser.estado : "-"}
                                            </ul>
                                        )}
                                    </td>


                                    <td style={{ color: filteredUser.fecha_estimada ? getColor(filteredUser.fecha_estimada) : 'black' }}>
                                        {editingUserId === filteredUser.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedDDate}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <strong>{filteredUser.fecha_estimada} </strong>
                                        )}
                                    </td>
                                    <td>

                                        {editingUserId === filteredUser.id ? (
                                            <>
                                                <button onClick={() => handleOk(filteredUser.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                    </svg>
                                                </button>
                                                <button onClick={handleCancelar}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditar(filteredUser.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            </button>
                                        )}
                                    </td>

                                    <td><button onClick={() => handleEliminar(filteredUser.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="red" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </button></td>
                                </tr>

                            ))
                        ) : (
                            currentData.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>{usuario.id}</td>
                                    <td>
                                        {usuario.monto_pagado && usuario.monto_pagado.length > 0
                                            ? obtenerNombreMes(usuario.monto_pagado[0].fecha_pago)
                                            : '-'}
                                    </td>

                                    <td>{editingUserId === usuario.id ? (
                                        <input
                                            className="input_table_usuario"
                                            type="text"
                                            value={editedIdAmddi}
                                            onChange={(e) => setEditedIdAmddi(e.target.value)}
                                        />
                                    ) : (
                                        usuario.id_amddi ? usuario.id_amddi : '-'
                                    )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <select
                                                className="select_serv"
                                                value={editedCategoria}
                                                onChange={(e) => setEditedCategoria(e.target.value)}
                                            >
                                                <option value="Oro">Servicio Oro</option>
                                                <option value="Plata">Servicio Plata</option>
                                                <option value="Bronce">Servicio Bronce</option>
                                            </select>
                                        ) : (
                                            usuario.categoria
                                        )}
                                    </td>


                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedUserName}
                                                onChange={(e) => setEditedUserName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
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
                                                onChange={(e) => setEditedLastName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
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
                                                onChange={(e) => setEditedSLastName(e.target.value.replace(/[^a-zA-Z]/g, ''))}
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
                                                value={editedPais}
                                                onChange={(e) => setEditedPais(e.target.value.replace(/[^a-zA-Z]/g, ''))}
                                            />
                                        ) : (
                                            usuario.pais ? usuario.pais : '-'
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedDepartment}
                                                onChange={(e) => setEditedDepartment(e.target.value.replace(/[^a-zA-Z]/g, '').replace(/[^a-zA-Z]/g, ''))}
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
                                                value={editedInstitucionEducativa}
                                                onChange={(e) => setEditedInstitucionEducativa(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                                            />
                                        ) : (
                                            usuario.institucion_educativa ? usuario.institucion_educativa : '-'
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="email"
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
                                                onChange={(e) => setEditedDNI(e.target.value.replace(/[^0-9]/g, ''))}
                                            />
                                        ) : (
                                            usuario.dni
                                        )}
                                    </td>
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="number"
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
                                                        accept=".doc, .docx"
                                                        onChange={handlePdfChange}
                                                    // Asegúrate de especificar el tipo de archivo permitido
                                                    // onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                                    />
                                                    <div className="button_pdf">

                                                        <button onClick={() => handleEditarPDF(pdf.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-send-check" viewBox="0 0 16 16">
                                                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                                <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                                            </svg>
                                                        </button >
                                                        <button onClick={() => handleEliminarPDF(pdf.id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="red" className="bi bi-trash" viewBox="0 0 16 16">
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
                                                    <a href={`https://amddibackend-production-2880.up.railway.app${pdf.pdf_url}`} target="_blank" rel="noopener noreferrer" downlad="true">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#00d799" class="bi bi-file-earmark-word" viewBox="0 0 16 16">
                                                            <path d="M5.485 6.879a.5.5 0 1 0-.97.242l1.5 6a.5.5 0 0 0 .967.01L8 9.402l1.018 3.73a.5.5 0 0 0 .967-.01l1.5-6a.5.5 0 0 0-.97-.242l-1.036 4.144-.997-3.655a.5.5 0 0 0-.964 0l-.997 3.655L5.485 6.88z" />
                                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
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
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedLink}
                                                onChange={(e) => setEditedLink(e.target.value)}
                                            />
                                        ) : (
                                            usuario.link_reunion ? (
                                                <a href={usuario.link_reunion} target="_blank" rel="noopener noreferrer">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="#00d799"
                                                        className="bi bi-browser-chrome"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                                                        />
                                                    </svg>
                                                </a>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="red"
                                                    className="bi bi-browser-chrome"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16 8a8.001 8.001 0 0 1-7.022 7.94l1.902-7.098a2.995 2.995 0 0 0 .05-1.492A2.977 2.977 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8ZM0 8a8 8 0 0 0 7.927 8l1.426-5.321a2.978 2.978 0 0 1-.723.255 2.979 2.979 0 0 1-1.743-.147 2.986 2.986 0 0 1-1.043-.7L.633 4.876A7.975 7.975 0 0 0 0 8Zm5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a2.979 2.979 0 0 0-1.252.243 2.987 2.987 0 0 0-1.81 2.59ZM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                                                    />
                                                </svg>
                                            )
                                        )}
                                    </td>

                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="number"
                                                step="0.1"
                                                value={editedMontoTotal}
                                                onChange={(e) => setEditedMontoTotal(e.target.value)}
                                            />
                                        ) : (
                                            usuario.monto_total
                                        )}
                                    </td>
                                    <td>
                                        {usuario.monto_pagado && usuario.monto_pagado.length > 0 ? (
                                            <>                                        {editingUserId === usuario.id ? (
                                                <input
                                                    className="input_table_usuario"
                                                    type="number"
                                                    step="0.1"
                                                    value={editedMontoPagado}
                                                    onChange={(e) => setEditedMontoPagado(e.target.value)}
                                                />
                                            ) : (
                                                usuario.monto_pagado[0].monto_pagado
                                            )}
                                                <br />
                                                {editingUserId === usuario.id ? (
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={editedFechaPago}
                                                        onChange={(e) => setEditedFechaPago(e.target.value)}
                                                    />
                                                ) : (
                                                    usuario.monto_pagado[0].fecha_pago
                                                )}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        {usuario.monto_pagado && usuario.monto_pagado.length > 1 ? (
                                            <>                                        {editingUserId === usuario.id ? (
                                                <input
                                                    className="input_table_usuario"
                                                    type="number"
                                                    step="0.1"
                                                    value={editedMontoPagado1}
                                                    onChange={(e) => setEditedMontoPagado1(e.target.value)}
                                                />
                                            ) : (
                                                usuario.monto_pagado[1].monto_pagado
                                            )}
                                                <br />
                                                {editingUserId === usuario.id ? (
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={editedFechaPago1}
                                                        onChange={(e) => setEditedFechaPago1(e.target.value)}
                                                    />
                                                ) : (
                                                    usuario.monto_pagado[1].fecha_pago
                                                )}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        {usuario.monto_pagado && usuario.monto_pagado.length > 2 ? (
                                            <>                                        {editingUserId === usuario.id ? (
                                                <input
                                                    className="input_table_usuario"
                                                    type="number"
                                                    step="0.1"
                                                    value={editedMontoPagado2}
                                                    onChange={(e) => setEditedMontoPagado2(e.target.value)}
                                                />
                                            ) : (
                                                usuario.monto_pagado[2].monto_pagado
                                            )}
                                                <br />
                                                {editingUserId === usuario.id ? (
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={editedFechaPago2}
                                                        onChange={(e) => setEditedFechaPago2(e.target.value)}
                                                    />
                                                ) : (
                                                    usuario.monto_pagado[2].fecha_pago
                                                )}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td>
                                        {usuario.monto_pagado && usuario.monto_pagado.length > 3 ? (
                                            <>                                        {editingUserId === usuario.id ? (
                                                <input
                                                    className="input_table_usuario"
                                                    type="number"
                                                    step="0.1"
                                                    value={editedMontoPagado3}
                                                    onChange={(e) => setEditedMontoPagado3(e.target.value)}
                                                />
                                            ) : (
                                                usuario.monto_pagado[3].monto_pagado
                                            )}
                                                <br />
                                                {editingUserId === usuario.id ? (
                                                    <input
                                                        className="input_table_usuario"
                                                        type="text"
                                                        value={editedFechaPago3}
                                                        onChange={(e) => setEditedFechaPago3(e.target.value)}
                                                    />
                                                ) : (
                                                    usuario.monto_pagado[3].fecha_pago
                                                )}
                                            </>
                                        ) : (
                                            '-'
                                        )}
                                    </td>


                                    {/* 
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

                                    </td> */}

                                    <td>{usuario.monto_restante} </td>
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
                                            usuario.usuario_servicio[0]?.servicio.nombre_servicio || "-"
                                        )}
                                    </td>
                                    {/* TEMAAAAAAAAAAAAA */}
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedTema}
                                                onChange={(e) =>
                                                    setEditedTema(e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, ''))
                                                }
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
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="red" className="bi bi-trash" viewBox="0 0 16 16">
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
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedAsesorVentas}
                                                onChange={(e) => setEditedAsesorVentas(e.target.value.replace(/[^a-zA-Z ]/g, ''))}
                                            />
                                        ) : (
                                            usuario.asesor_ventas ? usuario.asesor_ventas : '-'
                                        )}
                                    </td>
                                    {/* <td>
                                        {editingUserId === usuario.id ? (
                                            <select
                                                className="select_serv"
                                                value={selectedEstado}
                                                onChange={(e) => setSelectedEstado(e.target.value)}
                                            >
                                                {usuario.usuario_servicio[0].servicio.id === 1 || usuario.usuario_servicio[0].servicio.id === 2 || usuario.usuario_servicio[0].servicio.id === 3 ? (
                                                    listaEstadosTesis.map(estado => (
                                                        <option key={estado.id} value={estado.estado}>
                                                            {estado.estado}
                                                        </option>
                                                    ))
                                                ) : usuario.usuario_servicio[0].servicio.id === 4 || usuario.usuario_servicio[0].servicio.id === 5 ? (
                                                    listaEstadosObservacion.map(estado => (
                                                        <option key={estado.id} value={estado.estado}>
                                                            {estado.estado}
                                                        </option>
                                                    ))
                                                ) : (
                                                    <option value="">Falta asignar servicio</option>
                                                )}
                                            </select>
                                        ) : (
                                            <ul>
                                                {usuario.estado}
                                            </ul>
                                        )}
                                    </td> */}
                                    <td>
                                        {editingUserId === usuario.id ? (
                                            <select
                                                className="select_serv"
                                                value={selectedEstado}
                                                onChange={(e) => setSelectedEstado(e.target.value)}
                                            >
                                                {usuario.usuario_servicio[0] ? (
                                                    <>
                                                        {usuario.usuario_servicio[0].servicio.id === 1 ||
                                                            usuario.usuario_servicio[0].servicio.id === 2 ||
                                                            usuario.usuario_servicio[0].servicio.id === 3 ? (
                                                            listaEstadosTesis.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 4 ||
                                                            usuario.usuario_servicio[0].servicio.id === 5 ? (
                                                            listaEstadosObservacion.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 6 ? (
                                                            listaEstadosParafraseo.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 7 ? (
                                                            listaEstadosTrabajoSuficiencia.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 8 ||
                                                            usuario.usuario_servicio[0].servicio.id === 9 ||
                                                            usuario.usuario_servicio[0].servicio.id === 10 ? (
                                                            listaEstadosArticulo.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 11 ? (
                                                            listaEstadosMonografia.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 12 ? (
                                                            listaEstadosPlanDeNegocio.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 13 ? (
                                                            listaEstadosInformePracticas.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 14 ? (
                                                            listaEstadosTesinas.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : usuario.usuario_servicio[0].servicio.id === 15 ? (
                                                            listaEstadosDiapositivas.map((estado) => (
                                                                <option key={estado.id} value={estado.estado}>
                                                                    {estado.estado}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option value="">Falta asignar servicio</option>
                                                        )}
                                                    </>
                                                ) : (
                                                    <option value="">-</option>
                                                )}
                                            </select>
                                        ) : (
                                            <ul>
                                                {usuario.usuario_servicio[0] ? usuario.estado : "-"}
                                            </ul>
                                        )}
                                    </td>




                                    <td style={{ color: usuario.fecha_estimada ? getColor(usuario.fecha_estimada) : 'black' }}>
                                        {editingUserId === usuario.id ? (
                                            <input
                                                className="input_table_usuario"
                                                type="text"
                                                value={editedDDate}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            <strong>{usuario.fecha_estimada} </strong>
                                        )}
                                    </td>
                                    <td>

                                        {editingUserId === usuario.id ? (
                                            <>
                                                <button onClick={() => handleOk(usuario.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                    </svg>
                                                </button>
                                                <button onClick={handleCancelar}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="red" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={() => handleEditar(usuario.id)}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                            </button>
                                        )}
                                    </td>

                                    <td><button onClick={() => handleEliminar(usuario.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="red" className="bi bi-trash" viewBox="0 0 16 16">
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
