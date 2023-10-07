import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/variables.css';

export default function EditarUsuario() {
    const location = useLocation();

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
        especialidades: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistrationSuccess = () => {
        // Limpiar los campos del formulario después del registro exitoso
        setFormData({
            nombre: "",
            apePat: "",
            apeMat: "",
            dni: "",
            email: "",
            pwd_hash: "",
            confirma_pwd_hash: ""
        });
    };

    const [formErrors, setFormErrors] = useState({
        nombre: "",
        apePat: "",
        apeMat: "",
        dni: "",
        email: "",
        pwd_hash: "",
        confirma_pwd_hash: ""
    });

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        for (const [key, value] of Object.entries(formData)) {
            if (!value) {
                errors[key] = "Campo obligatorio";
                isValid = false;
            }
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (formData.especialidades.length === 0) {
            setFormErrors({
                ...formErrors,
                especialidades: "Seleccione al menos una especialidad"
            });
            return;
        }
        try {

            if (!formData.pwd_hash || !formData.confirma_pwd_hash) {
                console.error("Por favor, completa ambos campos de contraseña");
                window.alert("Por favor, completa ambos campos de contraseña");
                return;
            }

            if (formData.pwd_hash !== formData.confirma_pwd_hash) {
                console.error("Las contraseñas no coinciden");
                window.alert("Las contraseñas no coinciden");
                return;
            }

            const response = await fetch("https://amddibackend-production-2880.up.railway.app/asesores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Mostrar mensaje de éxito
                console.log(data.msg);
                window.alert(data.msg);
                handleRegistrationSuccess();
            } else {
                // Mostrar mensaje de error
                window.alert(data.msg);
                console.error(data.msg);
            }
        } catch (error) {
            // Manejo de errores
        }
    };


    const [especialidades, setEspecialidades] = useState({ content: [] });



    useEffect(() => {
        const obtenerEspecialidades = async () => {
            try {
                const response = await fetch("https://amddibackend-production-2880.up.railway.app/especialidades");
                const data = await response.json();
                setEspecialidades(data);
            } catch (error) {
                console.error("Error al obtener las especialidades:", error);
            }
        };

        obtenerEspecialidades();
    }, []);


    const handleEspecialidadesChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setFormData({ ...formData, especialidades: selectedValues });
        setFormErrors({ ...formErrors, especialidades: selectedValues.length === 0 ? "Seleccione al menos una especialidad" : "" });
    };


    return (
        <section className="resiasesor">
            <div className="registro_asesor_container">
                <h2>Registre un Asesor</h2>
                <div className="regisasesor_container" onSubmit={handleSubmit}>
                    <form className="form_registro_asesor">
                        <input className="input_registro_asesor"
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            onChange={handleInputChange}
                            value={formData.nombre}
                        />
                        {formErrors.nombre && <span className="error-message">{formErrors.nombre}</span>}
                        <input className="input_registro_asesor"
                            type="text"
                            name="apePat"
                            placeholder="Apellido Paterno"
                            onChange={handleInputChange}
                            value={formData.apePat}
                        />
                        {formErrors.apePat && <span className="error-message">{formErrors.apePat}</span>}
                        <input className="input_registro_asesor"
                            type="text"
                            name="apeMat"
                            placeholder="Apellido Materno"
                            onChange={handleInputChange}
                            value={formData.apeMat}
                        />
                        {formErrors.apeMat && <span className="error-message">{formErrors.apeMat}</span>}
                        <input className="input_registro_asesor"
                            type="text"
                            name="dni"
                            placeholder="DNI"
                            onChange={handleInputChange}
                            value={formData.dni}
                        />
                        {formErrors.dni && <span className="error-message">{formErrors.dni}</span>}
                        <input className="input_registro_asesor"
                            type="text"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                        <input className="input_registro_asesor"
                            type="password"
                            name="pwd_hash"
                            placeholder="Contraseña"
                            onChange={handleInputChange}
                            value={formData.pwd_hash}
                        />
                        {formErrors.pwd_hash && <span className="error-message">{formErrors.pwd_hash}</span>}
                        <input className="input_registro_asesor"
                            type="password"
                            name="confirma_pwd_hash"
                            placeholder="Confirmar Contraseña"
                            onChange={handleInputChange}
                            value={formData.confirma_pwd_hash}
                        />
                        {formErrors.confirma_pwd_hash && <span className="error-message">{formErrors.confirma_pwd_hash}</span>}

                        {/* Aqui va lo de especialidades */}
                        {especialidades.content ? (
                            <div>
                                <Select
                                    isMulti
                                    options={especialidades.content ? especialidades.content.map(especialidad => ({
                                        value: especialidad.id,
                                        label: especialidad.nombre_especialidad
                                    })) : []}
                                    value={formData.especialidades ? formData.especialidades.map(id => ({
                                        value: id,
                                        label: especialidades.content.find(especialidad => especialidad.id === id).nombre_especialidad
                                    })) : []}
                                    onChange={handleEspecialidadesChange}
                                    className="custom-select"
                                />

                                {formErrors.especialidades && <span className="error-message">{formErrors.especialidades}</span>}
                            </div>
                        ) : (
                            <p>Cargando especialidades...</p>
                        )}



                        <button type="submit" className="button_backend">Registrarse</button>
                    </form>
                </div>
            </div>

        </section>
    );
}