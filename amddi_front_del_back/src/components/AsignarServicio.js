import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/variables.css";

export default function MiInformacion() {
    const location = useLocation();

    const [dniInput, setDniInput] = useState("");
    const [usuarioporDNI, setusuarioporDNI] = useState([]);

    const [servicios, setServicios] = useState([]);
    const [formData, setFormData] = useState({
        monto_total: "",
        tema: "",
        id_servicio: "",
        id_usuarios: "",
        monto_pagado: "",
    });

    const [servicioMonto, setServicioMonto] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    async function buscarUsuarioPorDNI(dni) {
        try {
            const res = await axios.get(`http://localhost:5000/usuarios/${dni}`);

            if (res.data.content) {
                console.log(res.data.content.carrera);
                const IdUsuario = res.data.content.id;
                console.log(IdUsuario);
                setusuarioporDNI([res.data.content]);
                setFormData({ ...formData, id_usuarios: IdUsuario });
            } else {
                setusuarioporDNI([]); // No se encontró ningún usuario, establecer el estado como un array vacío
            }

        } catch (error) {
            console.error("Error buscando usuario por DNI:", error);
        }


    }

    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const response = await fetch("http://localhost:5000/servicios");
                const data = await response.json();
                console.log(data);

                // Accede a la propiedad 'content' para obtener el array de Servicios
                setServicios(data.content);
            } catch (error) {
                console.error("Error al obtener las Servicios:", error);
            }
        };

        obtenerServicios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("holaa");
        console.log(formData);
        try {
            const res = await axios.post("http://localhost:5000/monto_pagado", formData);
            console.log("larespuesta",res);
            if (res.status === 200) {
                console.log("Solicitud exitosa con código de estado 200");
                alert("Se realizó el proceso correctamente");
                window.location.reload();
            } else if (res.status === 400) {

                console.log("Solicitud exitosa con código de estado 400", res.data.msg);
                // Puedes manejar otros códigos de estado aquí si es necesario
                console.log("entroaqui")
                alert(res.data.msg);
            } else {
                console.log("Solicitud no exitosa. Código de estado:", res.status);
                
            }
            console.log(res.status);
        } catch (error) {
            if (error.response) {
                console.log("Datos del error:", error.response.data);
                console.log("Mensaje de error:", error.response.data.msg);
                alert(error.response.data.msg);
            } else {
                console.error("Error sin respuesta:", error);
            }
        }
    }


    return (
        <div className="miinfo_container">
            <div className="franja_verd">
                <h1>Asignar Servicio al Usuario y Monto</h1>
            </div>
            <div className="asignar_s_u">

                <div className="asignar_card asignar_servicio">
                    <h3>Coloque el DNI del usuario:</h3>
                    <div className="search_u">
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
                </div>
                <h3>Usuario Encontrado</h3>
                <table className="table usu_e">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>DNI</th>
                            <th>Celular</th>
                            <th>Carrera</th>
                            <th>Precio de Contrato</th>
                            <th>Pago 1era cuota</th>
                            <th>Pago 2da cuota</th>
                            <th>Pago 3ra cuota</th>
                            <th>Pago 4ta cuota</th>
                            <th>Pago Restante</th>
                            <th>Servicio</th>
                            <th>Tema</th>
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
                                <td>{usuario.monto_total}</td>
                                <td>
                                    {usuario.monto_pagado && usuario.monto_pagado.length > 0 ? (
                                        <>
                                            {usuario.monto_pagado[0].monto_pagado} <br />
                                            {usuario.monto_pagado[0].fecha_pago}
                                        </>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td>
                                    {usuario.monto_pagado && usuario.monto_pagado.length > 1 ? (
                                        <>
                                            {usuario.monto_pagado[1].monto_pagado} <br />
                                            {usuario.monto_pagado[1].fecha_pago}
                                        </>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td>
                                    {usuario.monto_pagado && usuario.monto_pagado.length > 2 ? (
                                        <>
                                            {usuario.monto_pagado[2].monto_pagado} <br />
                                            {usuario.monto_pagado[2].fecha_pago}
                                        </>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td>
                                    {usuario.monto_pagado && usuario.monto_pagado.length > 3 ? (
                                        <>
                                            {usuario.monto_pagado[3].monto_pagado} <br />
                                            {usuario.monto_pagado[3].fecha_pago}
                                        </>
                                    ) : (
                                        '-'
                                    )}
                                </td>
                                <td>{usuario.monto_restante}</td>
                                <td>{usuario.usuario_servicio[0].servicio.nombre_servicio}</td>
                                <td>{usuario.tema}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <form className="form_submit" onSubmit={handleSubmit}>
                    <div className="serviciomonto_eleccion">
                        <h3>Elija su acción:</h3>
                        <select
                            className="input_asignar_servicio_select"
                            id="servicioMonto"
                            name="servicioMonto"
                            onChange={(e) => setServicioMonto(e.target.value)}
                            value={servicioMonto}
                        >
                            <option value="">Escoja una opción</option>
                            <option value="ServicioMonto">Añadir servicio y monto</option>
                            <option value="MontoCuota">Añadir monto de cuota</option>
                        </select>
                    </div>
                    {servicioMonto === "ServicioMonto" && (
                        <>
                            <div className="input_asignar_servicio">
                                <h4>Monto Pagado:</h4>
                                <input type="text"
                                    name="especialidad"
                                    className="input_soe"
                                    placeholder="Ingrese el monto pagado"
                                    onChange={(e) => setFormData({ ...formData, monto_pagado: e.target.value })}
                                    value={formData.monto_pagado}
                                />
                            </div>
                            <div className="input_asignar_servicio">
                                <h4>Monto Total:</h4>
                                <input type="text"
                                    name="especialidad"
                                    className="input_soe"
                                    placeholder="Ingrese el monto total"
                                    onChange={(e) => setFormData({ ...formData, monto_total: e.target.value })}
                                    value={formData.monto_total}
                                />
                            </div>
                            <div className="input_asignar_servicio">
                                <h4>Servicio:</h4>
                                <select
                                    className="input_asignar_servicio_select"
                                    id="especialidad"
                                    name="carrera"
                                    onChange={(e) => setFormData({ ...formData, id_servicio: e.target.value })}
                                    value={formData.id_servicio}
                                >
                                    <option value="">Selecciona una Servicio</option>
                                    {servicios.map((servicio) => (
                                        <option key={servicio.id} value={servicio.id}>
                                            {servicio.nombre_servicio}
                                        </option>
                                    ))}
                                </select>

                            </div>
                            <div className="input_asignar_servicio">
                                <h4>Tema del Proyecto:</h4>
                                <input type="text"
                                    name="especialidad"
                                    className="input_soe"
                                    placeholder="Nombre del Proyecto"
                                    onChange={(e) => setFormData({ ...formData, tema: e.target.value })}
                                    value={formData.tema}
                                />
                            </div>
                            <button type="submit" className="button_agregar_soe">Asignar Servicio</button>
                        </>
                    )}
                    {servicioMonto === "MontoCuota" && (
                        <>
                            <div className="input_asignar_servicio">
                                <h4>Monto Pagado:</h4>
                                <input type="text"
                                    name="especialidad"
                                    className="input_soe"
                                    placeholder="Ingrese el monto pagado"
                                    onChange={(e) => setFormData({ ...formData, monto_pagado: e.target.value })}
                                    value={formData.monto_pagado}
                                />
                            </div>
                            <button type="submit" className="button_agregar_soe">Asignar Servicio</button>
                        </>
                    )}

                </form>
            </div>
        </div>
    );
}
