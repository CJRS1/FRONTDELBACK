import React, { useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function NavBarLat() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (

        <div className="navbar_header_container">
            <img className="img-navlat" src={require('../images/Logo_plomo.png')} alt='logo' />
            <nav className="navlat_container">
                <ul className="navlat_list">
                    <li>
                        <Link to="" className="Link_anc">
                            X INICIO
                        </Link>
                    </li>
                    <li>
                        <Link to="/registrar_asesor" className="Link_anc">
                            X REGISTRAR ASESOR
                        </Link>
                    </li>
                    <li>
                        <Link to="/tabla_usuarios" className="Link_anc">
                            X USUARIO
                        </Link>
                    </li>
                    <li>
                        <Link to="/tabla_asesores" className="Link_anc">
                            X ASESOR
                        </Link>
                    </li>
                    <li>
                        <Link to="/subir_archivo" className="Link_anc">
                            X SUBIR ARCHIVO
                        </Link>
                    </li>
                    <li>
                        <Link to="/asignar_usuario" className="Link_anc">
                            X ASIGNAR
                        </Link>
                    </li>
                    <li>
                        <Link to="/mi_info" className="Link_anc">
                            X MI INFORMACIÓN
                        </Link>
                    </li>
                    <li>
                        X CONFIGURACIÓN
                    </li>
                </ul>
            </nav>
        </div>
    );
}