import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/variables.css";

export default function MiInformacion() {
    const location = useLocation();

    const [dniInput, setDniInput] = useState("");
    const [usuarioporDNI, setusuarioporDNI] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    async function buscarUsuarioPorDNI(dni) {
        try {
            const res = await axios.get(`http://localhost:5000/usuarios/${dni}`);

            if (res.data.content) {
                console.log(res.data.content.carrera);
                setusuarioporDNI([res.data.content]);

            } else {
                setusuarioporDNI([]); // No se encontró ningún usuario, establecer el estado como un array vacío
            }

        } catch (error) {
            console.error("Error buscando usuario por DNI:", error);
        }


    }

    return (
        <div className="miinfo_container">
            <div className="franja_verd">
                <h1>Asignar Servicio al Usuario</h1>
            </div>
            <div className="asignar_card asignar_servicio">
                <h3>Coloque el DNI del usuario:</h3>
                <input
                    type="text"
                    className="input_dni_usuario"
                    value={dniInput}
                    onChange={(e) => setDniInput(e.target.value)}
                    placeholder="DNI"
                />
                <button className="button_backend_filtro" onClick={() => buscarUsuarioPorDNI(dniInput)}>Buscar</button>
                <button className="button_backend_filtro" onClick={() => setusuarioporDNI([])}>Limpiar</button>
            </div>
            <h3>Usuario Encontrado</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>DNI</th>
                        <th>Celular</th>
                        <th>Carrera</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarioporDNI.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apePat}</td>
                            <td>{usuario.dni}</td>
                            <td>{usuario.celular}</td>
                            <td>{usuario.carrera}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="input_asignar_servicio">
                <h4>Monto Pagado:</h4>
                <input type="text"
                    name="especialidad"
                    className="input_soe"
                    placeholder="Ingrese el monto pagado"
                // onChange={handleInputChange2}
                // value={agespecialidad}
                />
            </div>
            <div className="input_asignar_servicio">
                <h4>Monto Total:</h4>
                <input type="text"
                    name="especialidad"
                    className="input_soe"
                    placeholder="Ingrese el monto total"
                // onChange={handleInputChange2}
                // value={agespecialidad}
                />
            </div>
            <div className="input_asignar_servicio">
                <h4>Servicio:</h4>
                <input type="text"
                    name="especialidad"
                    className="input_soe"
                    placeholder="Nombre del Servicio"
                // onChange={handleInputChange2}
                // value={agespecialidad}
                />
            </div>
            <div className="input_asignar_servicio">
                <h4>Tema del Proyecto:</h4>
                <input type="text"
                    name="especialidad"
                    className="input_soe"
                    placeholder="Nombre del Proyecto"
                // onChange={handleInputChange2}
                // value={agespecialidad}
                />
            </div>
            <button className="button_agregar_soe">Asignar Servicio</button>
        </div>
    );
}
