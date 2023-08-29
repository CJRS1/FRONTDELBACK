import React, { useEffect} from "react";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function SubirArchivo() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);


    return (
        <div className="subarchivo_container">
            
        </div>
    );
}