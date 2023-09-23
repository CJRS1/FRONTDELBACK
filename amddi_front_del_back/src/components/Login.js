import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function Inicio({ setIsLoggedIn}) {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [data, setData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Realiza una solicitud de inicio de sesión al servidor
            const response = await axios.post("http://localhost:5000/loginA", {
                email,
                password, // Aquí enviamos el email y la contraseña en el cuerpo de la solicitud
            });

            if (response.status === 200) {
                // Inicio de sesión exitoso
                const data = response.data; // No es necesario usar await ni .json()

                // Almacena el token en el almacenamiento local o en una cookie
                localStorage.setItem("token", data.token);
                localStorage.setItem('isLoggedIn', true);
                // Decodifica el token para obtener el rol
                const decodedToken = jwt_decode(data.token);
                console.log("Rol del usuario:", decodedToken.rol);
                setIsLoggedIn(true);
                // Redirige a la página correspondiente según el rol
                if (decodedToken.rol === "admin") {
                    // navigate("/admin"); 
                    console.log(decodedToken.rol);
                } else if (decodedToken.rol === "asesor") {
                    console.log("Este es un", decodedToken.rol);
                    try {
                        const res = await axios.get(`http://localhost:5000/asesoress/${email}`);
                        if (res.status === 200) {
                            // La solicitud fue exitosa (código de estado 200)
                            const responseData = res.data.content;
                            console.log(responseData);
                            // setData(responseData);
                            
                            // Opcional: Guardar los datos en el localStorage
                            localStorage.setItem('data', JSON.stringify(responseData));
                        } else {
                            console.log(`La solicitud no fue exitosa. Código de estado: ${res.status}`);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    navigate("/");
                }
            } else {
                // Error en el inicio de sesión
                console.error("Error en el inicio de sesión");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            // alert("La contraseña o el correo es incorrecto");

            setIsLoggedIn(false);
        }
    };


    return (
        <div className="login_a_form">
            <div className="titulo_login">
                <h2>Ingresar</h2>
                <span className="linea"></span>
            </div>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="form_iniciar_sesion">
                <input type="email"
                    name="email"
                    className="input_ingreso_a"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                    name="pwd_hash"
                    className="input_ingreso_a"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="button_backend" type="submit">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
}