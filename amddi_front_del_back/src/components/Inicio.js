import React, { useEffect} from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function Inicio() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const nombre = "Christian"

    return (
        <div className="inicio_container">
            <h1>Hola {nombre}, bienvenido a la plataforma de AMDDI</h1>
            
        </div>
    );
}