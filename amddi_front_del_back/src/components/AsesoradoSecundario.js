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


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);


    const settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        dots: true,
        centerMode: true,
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
        formData.append('file', pdf);
        console.log(id);
        try {
            const res = await axios.put(`https://amddibackend-production-2880.up.railway.app/update/${id}`, formData);
            alert(res.data.msg);
            window.location.reload();
            // console.log(res.data.msg);
        } catch (error) {
            console.error('Error al editar pdf:', error);
        }
    }

    const handlePdfChange = (e) => {
        // Actualiza el estado con el archivo PDF seleccionado
        setPdf(e.target.files[0]);
    };

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        if (!pdf) {
            alert('Por favor, selecciona un archivo.');
            return;
        }
        setLoading(true);
        // Crea un objeto FormData para enviar el archivo PDF
        const formData = new FormData();
        formData.append('file', pdf);

        try {
            // Realiza una solicitud POST para subir el archivo PDF
            // console.log(`https://amddibackend-production-2880.up.railway.app/subir-pdf/${id}`)
            const response = await axios.post(`https://amddibackend-production-2880.up.railway.app/upload/${id}`, formData);

            // Muestra la respuesta del servidor
            alert(response.data.msg);
            window.location.reload();
            // console.log("Respuesta del servidor:", response.data);
        } catch (error) {
            console.error("Error al subir el PDF:", error);
        } finally {
            setLoading(false); // Oculta el indicador de carga cuando la solicitud se completa, ya sea con éxito o con error
        }
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

        // Convertimos la diferencia a días
        const diferenciaDias = diferencia / (1000 * 60 * 60 * 24);

        // Determinamos el color
        if (diferenciaDias > 7) {
            return "#00d799";
        } else if ((diferenciaDias < 7) && (diferenciaDias >= 4)) {
            return "#ffd700";
        } else if ((diferenciaDias < 4) && (diferenciaDias >= 1)) {
            return "red";
        }
    };


    return (
        <div className="asesorado_container">
            <div className="franja_verd franja_ancho">
                <h1>Asesorados Secundarios</h1>
            </div>
            <Slider {...settings}
                className="slider_container_asesorado"
            >
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    userData.asignacion_secundaria.map((item, index) => (
                        item.usuario.estado !== "FINALIZADO" 
                        // && item.usuario.categoria === "Premium" 
                        && (
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
                                        <div className="form_asesorado">
                                            <h4>{item.usuario.estado}</h4>
                                        </div>
                                    </div>
                                    <div className="info_asesorado_card">
                                        <div className="form_asesorado1">
                                            <h4>Link del drive:</h4>
                                        </div>
                                        <div className="form_asesorado">
                                            {item.usuario.link_reunion ? (
                                                <a href={item.usuario.link_reunion} target="_blank" rel="noopener noreferrer">
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
                                            )}
                                        </div>
                                    </div>
                                    <div className="info_asesorado_card info_asesorado_card_column">
                                        <div className="form_asesorado2">
                                            <h4>Los documentos que fueron adjuntados:</h4>
                                        </div>
                                        {item.usuario.pdf_url.map((pdf) => (
                                            <div className="form_asesorado2" key={pdf.id}>

                                                <a key={pdf.id} href={`https://amddibackend-production-2880.up.railway.app${pdf.pdf_url}`} target="_blank" rel="noopener noreferrer" downlad="true">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#00d799" class="bi bi-file-earmark-word" viewBox="0 0 16 16">
                                                        <path d="M5.485 6.879a.5.5 0 1 0-.97.242l1.5 6a.5.5 0 0 0 .967.01L8 9.402l1.018 3.73a.5.5 0 0 0 .967-.01l1.5-6a.5.5 0 0 0-.97-.242l-1.036 4.144-.997-3.655a.5.5 0 0 0-.964 0l-.997 3.655L5.485 6.88z" />
                                                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                                    </svg>
                                                </a>
                                                <h4>{pdf.fecha_pdf_url} </h4>
                                                <input
                                                    className="xdd"
                                                    key={pdf.usuarioId}
                                                    type="file"
                                                    accept=".doc, .docx"
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
                                            <h4>Adjuntar documento nuevo:</h4>
                                        </div>
                                        <div className="form_asesorado2">
                                            <form
                                                onSubmit={(e) => handleSubmit(e, item.usuario.id)}
                                                encType="multipart/form-data">
                                                <input type="file" accept=".doc, .docx"
                                                    onChange={handlePdfChange}
                                                    className="input_asesorado" />
                                                <button type="submit">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fillRule="#00d799" className="bi bi-cloud-plus-fill" viewBox="0 0 16 16">
                                                        <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                                                    </svg>
                                                </button>
                                                {loading && <p>Cargando...</p>}
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
