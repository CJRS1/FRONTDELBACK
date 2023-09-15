import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function NavBarLat() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    // const storedData = localStorage.getItem('data');
    // const parsedData = storedData ? JSON.parse(storedData) : null;


    // const primeraLetraN = parsedData?.nombre?.charAt(0) || '';
    // const primeraLetraA = parsedData?.apePat?.charAt(0) || '';
    // const email = parsedData?.email || '';

    const [navClass, setNavClass] = useState('navbar_header_container');
    const [opcionesClass, setOpcionesClass] = useState('opciones_backend');
    const [imgClass, setImgClass] = useState('img_navlat');
    const [imgClass1, setImgClass1] = useState('img_navlat1');
    const [nameClass, setNameClass] = useState('name_text');
    const [imgNext, setImgNext] = useState('btn_left_right hidden');
    const [imgPrev, setImgPrev] = useState('btn_left_right ');
    const [linkClass, setLinkClass] = useState('Link_anc');

    // Función para manejar el clic en el botón de minimizar/mostrar
    const handleToggleNav = () => {
        if (navClass === 'navbar_header_container') {
            setNavClass('navbar_header_container minimized');
            setOpcionesClass('opciones_backend hidden');
            setImgClass('img_navlat hidden');
            setImgClass1('img_navlat block');
            setNameClass('name_text block');
            setImgPrev('btn_left_right hidden');
            setImgNext('btn_left_right block');
            setLinkClass('Link_anc center');
        } else {
            setNavClass('navbar_header_container');
            setOpcionesClass('opciones_backend');
            setImgClass('img_navlat');
            setImgClass1('img_navlat1');
            setNameClass('name_text');
            setImgPrev('btn_left_right')
            setImgNext('btn_left_right hidden');
            setLinkClass('Link_anc');
        }
    };

    const handleLogout = async () => {
        try{
            const res = await axios.post('http://localhost:5000/logoutA');
            console.log(res.data);
            localStorage.removeItem('data');
            localStorage.removeItem('token');
            navigate("/login_a")
        }catch(e){
            console.log(e);
        }
    }

    const [userData, setUserData] = useState(null); 

    useEffect(() => {
        window.scrollTo(0, 0);

        // Obtener el token del localStorage
        const token = localStorage.getItem('token');

        // Verificar si el token existe
        if (token) {
            // Si el token existe, realiza una solicitud al servidor para obtener los datos del usuario
            axios.get('http://localhost:5000/asesor', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data.content);
                setUserData(response.data.content); // Almacena los datos del usuario en el estado
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, [location]);

    // console.log(userData.asesor_especialidad[1].especialidad.nombre_especialidad);
    const storedData = localStorage.getItem('data');
    const parsedData = storedData ? JSON.parse(storedData) : null;

    const primeraLetraN = userData?.nombre?.charAt(0) || parsedData?.nombre?.charAt(0) || '';
    const primeraLetraA = userData?.apePat?.charAt(0) || parsedData?.apePat?.charAt(0) || '';
    const email = userData?.email || parsedData?.email || '';

    return (

        <div className={navClass}>

            <div className="datos_backend_card">
                <img className={imgClass} src={require('../images/Logo_plomo.png')} alt='logo' />
                <img className={imgClass1} src={require('../images/Logo_plomo_solo.png')} alt='logo' />
                {/* <h3 className={opcionesClass}>{parsedData ? `${parsedData.nombre} ${parsedData.apePat}` : ''} </h3> */}
                <h3 className={opcionesClass}>{userData ? `${userData.nombre} ${userData.apePat}` : (parsedData ? `${parsedData.nombre} ${parsedData.apePat}` : '')}</h3>

                <h3 className={nameClass} >{primeraLetraN}{primeraLetraA} </h3>
                <h4 className={opcionesClass}>{email} </h4>
                <button className={imgPrev} onClick={handleToggleNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#666666" className="bi bi-arrow-left-circle-fill btn_ho" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                </button>
                <button className={imgNext} onClick={handleToggleNav}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#666666" className="bi bi-arrow-right-circle-fill btn_ho" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                </button>
            </div>
            <hr />
            <nav className="navlat_container">
                <ul className="navlat_list">
                    <li>
                        <Link to="" className={linkClass}>
                            <svg className="icon bi bi-house-door-fill" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
                            </svg>
                            <h5 className={opcionesClass} >Inicio</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/registrar_asesor" className={linkClass}>
                            <svg className="icon bi bi-person-fill-add" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                            </svg>
                            <h5 className={opcionesClass} >Registrar Asesor</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/tabla_usuarios" className={linkClass}>
                            <svg className="icon bi bi-person-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                            <h5 className={opcionesClass} >Usuarios</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/tabla_asesores" className={linkClass}>
                            <svg className="icon bi bi-person-workspace" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4 16s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H4Zm4-5.95a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path d="M2 1a2 2 0 0 0-2 2v9.5A1.5 1.5 0 0 0 1.5 14h.653a5.373 5.373 0 0 1 1.066-2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9h-2.219c.554.654.89 1.373 1.066 2h.653a1.5 1.5 0 0 0 1.5-1.5V3a2 2 0 0 0-2-2H2Z" />
                            </svg>
                            <h5 className={opcionesClass} >Asesores</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/subir_archivo" className={linkClass}>
                            <svg className="icon bi bi-cloud-arrow-up-fill" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
                            </svg>
                            <h5 className={opcionesClass} >Subir Archivo</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/asignar_usuario" className={linkClass}>
                            <svg className="icon bi bi-diagram-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM3 11.5A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                            </svg>
                            <h5 className={opcionesClass} >Asignar Asesor</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/asignar_servicio" className={linkClass}>
                            <svg className="icon bi bi-wallet-fill" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z" />
                                <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z" />
                            </svg>
                            <h5 className={opcionesClass} >Asignar Asesor</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/servicio_especialidad" className={linkClass}>
                            <svg className="icon bi bi-mortarboard" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z" />
                                <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z" />
                            </svg>
                            <h5 className={opcionesClass} >Servicios y Especialidades</h5>
                        </Link>
                    </li>
                    <li>
                        <Link to="/mi_info" className={linkClass}>
                            <svg className="icon bi bi-info-circle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                            <h5 className={opcionesClass} >Mi información</h5>
                        </Link>
                    </li>
                    <li>
                        <Link className={linkClass} onClick={handleLogout}>
                            <svg className="icon bi bi-door-open-fill" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z" />
                            </svg>
                            <h5 className={opcionesClass} >Cerrar Sesión</h5>
                        </Link>
                    </li>
                </ul>
            </nav>

        </div>
    );
}