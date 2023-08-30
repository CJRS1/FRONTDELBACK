import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function Inicio() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [usuariosConServicios, setUsuariosConServicios] = useState([]);


    return (
        <div>

        </div>
    );
}