import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

export default function AuthGuard({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        // Comprueba si hay un token en el almacenamiento local
        const token = localStorage.getItem('token');
        const currentpath = window.location.pathname;

        if (requiresAuthentication(currentpath) && !token) {
            // Si no hay token, redirige al usuario a la página de inicio de sesión
            navigate('/login_a');
        } else if (token) {

            try {
                // Verifica el token
                const decodedToken = jwt_decode(token);
                const currentTime = Date.now() / 1000;

                // Comprueba la firma y la caducidad del token
                if (decodedToken.exp < currentTime) {
                    navigate('/login_a');
                } else if (decodedToken.rol !== 'asesor' && decodedToken.rol !== 'admin') {
                    navigate('/acceso_no_autorizado'); // Cambia esto a la página deseada
                }
            } catch (error) {
                console.error('Error al verificar el token:', error);
                navigate('/login_a');
            }
        }
    }, [navigate]);

    function requiresAuthentication(path) {
        const protectedRoutes = [
            '/tabla_usuarios',
            '/asignar_usuario',
            '/tabla_asesores',
            '/mi_info',
            '/asignar_servicio',
            '/editar-asesor',
            '/servicio_especialidad',
            '/registrar_asesor',
            '/subir_archivo',
            '/asesorado_principal',
            '/asesorado_secundario',
            '/asesorado_finalizado'
        ];

        // Comprueba si la ruta está en la lista de rutas protegidas
        return protectedRoutes.includes(path);
    }

    return children;
}