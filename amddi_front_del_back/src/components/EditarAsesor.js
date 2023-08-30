import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
// import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function EditarAsesor() {
    const location = useLocation();
    const asesorId = location.pathname.split("/")[2]; // Obtener el ID del asesor de la URL

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const [formData, setFormData] = useState({
        nombre: "",
        apePat: "",
        apeMat: "",
        dni: "",
        email: "",
        pwd_hash: "",
        confirma_pwd_hash: "",
        especialidades: []
    });

    useEffect(() => {
        const obtenerDatosAsesor = async () => {
            try {
                const response = await fetch(`http://localhost:5000/asesores/${asesorId}`);
                const data = await response.json();
                // console.log(data.content.nombre);
                setFormData(data.content); // Establecer los datos del asesor en el estado formData
            } catch (error) {
                console.error("Error al obtener los datos del asesor:", error);
            }
        };

        obtenerDatosAsesor();
    }, [asesorId]);

    // const [especialidades, setEspecialidades] = useState({ content: [] });

    // useEffect(() => {
    //     const obtenerEspecialidades = async () => {
    //         try {
    //             const response = await fetch("http://localhost:5000/especialidades");
    //             const data = await response.json();
    //             console.log(data);
    //             setEspecialidades(data);
    //         } catch (error) {
    //             console.error("Error al obtener las especialidades:", error);
    //         }
    //     };

    //     obtenerEspecialidades();
    // }, []);

    // const handleEspecialidadesChange = (selectedOptions) => {
    //     const selectedValues = selectedOptions.map(option => option.value);
    //     setFormData({ ...formData, especialidades: selectedValues });
    // };

    const handleUpdateAsesor = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/asesores/${asesorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Asesor actualizado:", data.msg);
                window.alert(data.msg);
            } else {
                console.error("Error al actualizar asesor:", data.msg);
                window.alert(data.msg);
            }
        } catch (error) {
            console.error("Error al actualizar asesor:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section className="resiasesor">
            <div className="registro_asesor_container">
                <h2>Editar Datos Del Asesor</h2>
                <div className="regisasesor_container">
                    <form className="form_registro_asesor" onSubmit={handleUpdateAsesor}>
                        <input className="input_registro_asesor"
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                        <input className="input_registro_asesor"
                            type="text"
                            name="apePat"
                            placeholder="Apellido Paterno"
                            value={formData.apePat}
                            onChange={handleInputChange}
                        />
                        <input className="input_registro_asesor"
                            type="text"
                            name="apeMat"
                            placeholder="Apellido Materno"
                            value={formData.apeMat}
                            onChange={handleInputChange}
                        />
                        <input className="input_registro_asesor"
                            type="text"
                            name="dni"
                            placeholder="DNI"
                            value={formData.dni}
                            onChange={handleInputChange}
                        />
                        <input className="input_registro_asesor"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />

                        {/* Select de especialidades */}
                        {/* {especialidades.content ? (
                            <div className="form-group">
                                <label>Especialidades:</label>
                                <Select
                                    isMulti
                                    options={especialidades.content.map(especialidad => ({
                                        value: especialidad.id,
                                        label: especialidad.nombre_especialidad
                                    }))}
                                    value={formData.especialidades.map(id => ({
                                        value: id,
                                        label: especialidades.content.find(especialidad => especialidad.id === id).nombre_especialidad
                                    }))}
                                    onChange={handleEspecialidadesChange}
                                    className="custom-select"
                                />
                            </div>
                        ) : (
                            <p>Cargando especialidades...</p>
                        )} */}

                        <button type="submit" className="button_backend">Editar</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
