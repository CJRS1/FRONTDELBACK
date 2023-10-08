import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function AsesoradoSecundario() {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [estados, setEstados] = useState([]);
    const [estadoSelected, setEstadoSelected] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    let slidesToShow = 1; // Default to 1 slide
    if (userData && userData.asignacion_secundaria.length >= 2) {
        slidesToShow = 2; // If there are 2 or more elements, show 2 slides
    }


    const settings = {
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        dots: true,
        // centerMode: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    infinite: true,
                    autoplay: true,
                    autoplaySpeed: 2000,
                }
            }
        ]
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
                    setEstados(response.data.content.estados);
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

    const [pdf, setPdf] = useState(null);

    const handleEditarPDF = async (id) => {
        // Crea un objeto FormData para enviar el archivo PDF

        const formData = new FormData();
        formData.append("pdf", pdf);
        // console.log(id);
        try {
            const res = await axios.put(`https://amddibackend-production-2880.up.railway.app/actualizar-pdf/${id}`, formData);
            alert(res.data.msg);
            // console.log(res.data.msg);
        } catch (error) {
            console.error('Error al editar pdf:', error);
        }
    }

    const handlePdfChange = (e) => {
        // Actualiza el estado con el archivo PDF seleccionado
        setPdf(e.target.files[0]);
    };

    const handleSubmit = async (id) => {
        // e.preventDefault();

        // Crea un objeto FormData para enviar el archivo PDF
        const formData = new FormData();
        formData.append("pdf", pdf);

        try {
            // Realiza una solicitud POST para subir el archivo PDF
            // console.log(`https://amddibackend-production-2880.up.railway.app/subir-pdf/${id}`)
            const response = await axios.post(`https://amddibackend-production-2880.up.railway.app/subir-pdf/${id}`, formData);

            // Muestra la respuesta del servidor
            alert(response.data.msg);
            // window.location.reload();
            // console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            console.error("Error al subir el PDF:", error);
        }
    };

    const getColor = (fechaEstimada) => {
        // Convertimos las fechas a objetos Date
        const fechaActual = new Date();
        fecha_pago.setHours(fecha_pago.getHours() - 5);
        // Separar la fecha estimada en día, mes y año
        const partesFechaEstimada = fechaEstimada.split('/');
        const diaEstimado = parseInt(partesFechaEstimada[0], 10);
        const mesEstimado = parseInt(partesFechaEstimada[1], 10) - 1; // Restar 1 al mes, ya que en JavaScript los meses van de 0 a 11
        const añoEstimado = parseInt(partesFechaEstimada[2], 10);

        const fechaEstimadaDate = new Date(añoEstimado, mesEstimado, diaEstimado);

        // Calculamos la diferencia entre las dos fechas
        const diferencia = fechaEstimadaDate - fechaActual;

        // Convertimos la diferencia a días
        const diferenciaDias = diferencia / (1000 * 60 * 60 * 24) + 1;

        // Determinamos el color
        if (diferenciaDias > 7) {
            return "#00d799";
        } else if ((diferenciaDias < 7) && (diferenciaDias >= 4)) {
            return "#ffd700";
        } else if ((diferenciaDias < 4) && (diferenciaDias >= 1)){
            return "red";
        }
    };

    const handleEditarEstado = async (id) => {
        try {

            const estado = {
                estado: estadoSelected
            }

            await axios.put(`https://amddibackend-production-2880.up.railway.app/usuarios/${id}`, estado);
            // console.log('Usuario actualizado:', res.data.message);

            window.location.reload();
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className="asesorado_container">
            <div className="franja_verd franja_ancho">
                <h1>Asesorados Principal</h1>
            </div>
            <Slider {...settings}
                className="slider_container_asesorado"
            >
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    userData.asignacion.map((item, index) => (
                        item.usuario.estado !== "Finalizado" && (
                            <div className="asesorado_card" key={index} >
                                <div className="info_asesorado_container" style={{ borderColor: item.usuario.fecha_estimada ? getColor(item.usuario.fecha_estimada) : 'black' }}>
                                    <div className="info_asesorado_card">
                                        <div className="form_asesorado1">
                                            <h4>Id Amddi:</h4>
                                        </div>
                                        <div className="form_asesorado">
                                            <h4>{item.usuario.id_amddi}</h4>
                                        </div>
                                    </div>
                                    <div className="info_asesorado_card">
                                        <div className="form_asesorado1">
                                            <h4>Tema:</h4>
                                        </div>
                                        <div className="form_asesorado">
                                            <h4>{item.usuario.tema}</h4>
                                        </div>
                                    </div>
                                    <div className="info_asesorado_card">
                                        <div className="form_asesorado1">
                                            <h4>Servicio:</h4>
                                        </div>
                                        <div className="form_asesorado">
                                            <h4>{item.usuario.usuario_servicio[0].servicio.nombre_servicio}</h4>
                                        </div>
                                    </div>
                                    <div className="info_asesorado_card">
                                        <div className="form_asesorado1">
                                            <h4>Estado:</h4>
                                        </div>
                                        <div className="form_estado">
                                            <h4>{item.usuario.estado}</h4>
                                            <select
                                                className="select_estado_principal"
                                                value={estadoSelected}
                                                onChange={(e) => setEstadoSelected(e.target.value)}
                                            >
                                                {estados.map(estados => (
                                                    <option key={estados.id} value={estados.estado}>
                                                        {estados.estado}
                                                    </option>
                                                ))}
                                            </select>
                                            <button onClick={() => handleEditarEstado(item.usuario.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-send-check" viewBox="0 0 16 16">
                                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="info_asesorado_card info_asesorado_card_column">
                                        <div className="form_asesorado2">
                                            <h4>Fechas de los pagos:</h4>
                                        </div>
                                        <div className="form_asesorado2">
                                            {item.usuario.monto_pagado.map((fecha, index) => (
                                                <span key={index}>
                                                    {fecha.fecha_pago}
                                                    {index < item.usuario.monto_pagado.length - 1 && ','}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="info_asesorado_card info_asesorado_card_column">
                                        <div className="form_asesorado2">
                                            <h4>Los PDFs que fueron adjuntados:</h4>
                                        </div>
                                        {item.usuario.pdf_url.map((pdf) => (
                                            <div className="form_asesorado2" key={pdf.id}>

                                                <a href={`https://amddibackend-production-2880.up.railway.app${pdf.pdf_url}`} target="_blank" rel="noopener noreferrer" downlad="true">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fillRule="currentColor" className="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                                        <path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                                    </svg>
                                                </a>
                                                <h4>{pdf.fecha_pdf_url} </h4>
                                                <input
                                                    className="xdd"
                                                    key={pdf.usuarioId}
                                                    type="file"
                                                    accept=".pdf"
                                                    onChange={handlePdfChange}
                                                // Asegúrate de especificar el tipo de archivo permitido
                                                // onChange={(e) => handleFileUpload(index, e.target.files[0])}
                                                />
                                                <button onClick={() => handleEditarPDF(pdf.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-send-check" viewBox="0 0 16 16">
                                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                                    </svg>
                                                </button >

                                            </div>
                                        ))}
                                    </div>
                                    <div className="info_asesorado_card info_asesorado_card_column">
                                        <div className="form_asesorado2">
                                            <h4>Adjuntar PDF nuevo:</h4>
                                        </div>
                                        <div className="form_asesorado2">
                                            <form
                                                onSubmit={() => handleSubmit(item.usuario.id)}
                                                encType="multipart/form-data">
                                                <input type="file" accept=".pdf"
                                                    onChange={handlePdfChange}
                                                    className="input_asesorado" />
                                                <button type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-cloud-plus-fill" viewBox="0 0 16 16">
                                                        <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                                                    </svg>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="info_asesorado_card info_asesorado_card_column">
                                        <div className="form_asesorado2">
                                            <h4>Fecha de Entrega:</h4>
                                        </div>
                                        <div className="form_asesorado2">
                                            <h4>{item.usuario.fecha_estimada}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                )}
            </Slider>
        </div>
    );
}
