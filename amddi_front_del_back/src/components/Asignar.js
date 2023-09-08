import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function Asignar() {
    const location = useLocation();

    const [dniInput, setDniInput] = useState("");
    const [usuarioporDNI, setusuarioporDNI] = useState([]);

    const [asesorPorEspecialidad, setasesorPorEspecialidad] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    async function buscarUsuarioPorDNI(dni) {
        try {
            const res = await axios.get(`http://localhost:5000/usuarios/${dni}`);
            console.log("Usuario encontrado:", res.data);

            if (res.data.content) {
                console.log(res.data.content.carrera);
                setusuarioporDNI([res.data.content]);

                try {
                    const resp = await axios.get(`http://localhost:5000/asesor/${res.data.content.carrera}`);
                    console.log("Asesor encontrado:", resp.data);

                    if (resp.data.content && resp.data.content.length > 0) {
                        console.log("Asesores encontrados:", resp.data.content);

                        setasesorPorEspecialidad([resp.data.content]);
                        console.log("hola", asesorPorEspecialidad)
                    } else {
                        setasesorPorEspecialidad([]); // 
                    }

                } catch (error) {
                    console.error("Error buscando asesor por especialidad:", error);
                }
            } else {
                setusuarioporDNI([]); // No se encontró ningún usuario, establecer el estado como un array vacío
            }

        } catch (error) {
            console.error("Error buscando usuario por DNI:", error);
        }


    }


    async function asignarUsuarioAsesor(id_usuarios, id_asesor) {
        console.log(id_asesor, id_usuarios);
        try {
            const res = await axios.post(`http://localhost:5000/asignaciones/${id_asesor}/${id_usuarios}`);
            console.log("Asignación exitosa:", res.data);
        } catch (error) {
            console.error("Error al asignar:", error);
        }

    }


    return (
        <div className="asignar_container">
            <div className="franja_verd">
                <h1>Buscar usuario por DNI</h1>
            </div>
            <div className="asinar_asesor_container">
                <div className="asignar_card">
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
                <h3>Posibles Asesores</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Especialidad</th>
                            <th>Asesorados</th>
                            <th>Escoger</th>
                            <th>Asignar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {asesorPorEspecialidad.map((innerArray, outerIndex) => (
                            innerArray.map((asesor) => (
                                <tr key={`${outerIndex}-${asesor.id}`}>
                                    <td>{asesor.id}</td>
                                    <td>{asesor.nombre}</td>
                                    <td>{asesor.apePat}</td>

                                    <td>
                                        <ul>
                                            {asesor.asesor_especialidad && asesor.asesor_especialidad.map(aseEsp => (
                                                <li key={aseEsp.id}>
                                                    {aseEsp.especialidad.nombre_especialidad}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>

                                    <td>
                                        <ul>
                                            {asesor.asignacion && asesor.asignacion.map(aseEsp => (
                                                <li key={aseEsp.id}>
                                                    {aseEsp.usuario.nombre}
                                                </li>
                                            ))}
                                        </ul>
                                    </td>

                                    <td>
                                        <input
                                            type="checkbox"


                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => asignarUsuarioAsesor(usuarioporDNI[outerIndex].id, asesor.id)}>
                                            Asignar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
