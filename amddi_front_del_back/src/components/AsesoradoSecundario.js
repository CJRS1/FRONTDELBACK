import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export default function AsesoradoPrincipal() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);


    const settings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        dots: true,
        centerMode: true,
        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 1,
        //         }
        //     },
        //     {
        //         breakpoint: 800,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2,
        //             dots: true,
        //             infinite: true,
        //         }
        //     },
        //     {
        //         breakpoint: 480,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //             dots: true,
        //             infinite: true,
        //             autoplay: true,
        //             autoplaySpeed: 2000,
        //         }
        //     }
        // ]
    };

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://localhost:5000/asesor', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUserData(response.data.content);
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


    // console.log(userData.asignacion_secundaria.usuario.nombre);

    return (
        <div className="asesorado_container">
            <div className="franja_verd franja_ancho">
                <h1>Asesorados Principales</h1>
            </div>
            <Slider {...settings} className="slider_container_asesorado">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    userData.asignacion_secundaria.map(item => (
                        <div className="asesorado_card">
                            <div className="info_asesorado_container">
                                <div className="info_asesorado_card">
                                    <div className="form_asesorado1">
                                        <h4>Nombre:</h4>
                                    </div>
                                    <div className="form_asesorado">


                                        <h4>{item.usuario.nombre}</h4>

                                    </div>
                                </div>
                                <div className="info_asesorado_card">
                                    <div className="form_asesorado1">
                                        <h4>Apellidos:</h4>
                                    </div>
                                    <div className="form_asesorado">
                                        <h4>{item.usuario.apePat}&nbsp;{item.usuario.apeMat}</h4>
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
                                        <h4>Estado:</h4>
                                    </div>
                                    <div className="form_asesorado">
                                        <h4>Asesor Asignado</h4>
                                    </div>
                                </div>
                                <div className="info_asesorado_card info_asesorado_card_column">
                                    <div className="form_asesorado2">
                                        <h4>Fechas de los pagos:</h4>
                                    </div>
                                    <div className="form_asesorado2">
                                        <h4>14/10/2023</h4>
                                    </div>
                                </div>
                                <div className="info_asesorado_card info_asesorado_card_column">
                                    <div className="form_asesorado2">
                                        <h4>Los PDFs que fueron adjuntados:</h4>
                                    </div>
                                    <div className="form_asesorado2">
                                        <h4>PDF:</h4>
                                    </div>
                                </div>
                                <div className="info_asesorado_card info_asesorado_card_column">
                                    <div className="form_asesorado2">
                                        <h4>Adjuntar PDF:</h4>
                                    </div>
                                    <div className="form_asesorado2">
                                        <form
                                            // onSubmit={handleSubmit} 
                                            encType="multipart/form-data">
                                            <input type="file" accept=".pdf"
                                                // onChange={handlePdfChange} 
                                                className="input_asesorado" />
                                            <button type="submit">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#00d799" className="bi bi-cloud-plus-fill" viewBox="0 0 16 16">
                                                    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm.5 4v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                                                </svg>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="info_asesorado_card info_asesorado_card_column">
                                    <div className="form_asesorado2">
                                        <h4>Generar Link de Reunión:</h4>
                                    </div>
                                    <div className="form_asesorado2">
                                        <h4>www.hola.com</h4>
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
                    ))
                )}




            </Slider>
        </div>
    );
}