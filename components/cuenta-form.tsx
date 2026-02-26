'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/server';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    identificacion: string;
    contraseña: string
}

export default function Perfil() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Campos del formulario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [identificacion, setIdentificacion] = useState('');
    const [contraseña, setContraseña] = useState('');

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                setLoading(true);
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    router.push('/login');
                    return;
                }

                const { data: usuarioData, error } = await supabase
                    .from('Usuarios')
                    .select('*')
                    .eq('uid_authentication', user.id)
                    .single();

                if (error) throw error;
                if (!usuarioData) throw new Error('Usuario no encontrado');

                setUsuario(usuarioData);
                setNombre(usuarioData.nombre);
                setApellido(usuarioData.apellido);
                setEmail(usuarioData.email);
                setTelefono(usuarioData.telefono || '');
                setIdentificacion(usuarioData.identificacion || '');
            } catch (error: any) {
                setErrorMessage(error.message);
                setShowErrorModal(true);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuario();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!usuario) return;

        setLoading(true);
        try {
            // Actualizar datos en la tabla Usuarios
            const { error } = await supabase
                .from('Usuarios')
                .update({
                    nombre,
                    apellido,
                    email,
                    telefono,
                    identificacion,
                })
                .eq('id', usuario.id);

            if (error) throw error;

            // Actualizar email en auth si es necesario
            if (email !== usuario.email) {
                const { error: authError } = await supabase.auth.updateUser({ email });
                if (authError) throw authError;
            }

            if (contraseña && contraseña.trim().length >= 6) {
                const { error: passError } = await supabase.auth.updateUser({ password: contraseña });
                if (passError) throw passError;
            }

            // Actualizar el estado local
            setUsuario({
                ...usuario,
                nombre,
                apellido,
                email,
                telefono,
                identificacion,
            });

            setShowSuccessModal(true);
        } catch (error: any) {
            setErrorMessage(error.message);
            setShowErrorModal(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !usuario) {
        return (
            <div className="flex justify-center items-center h-64">
                <p>Cargando datos del usuario...</p>
            </div>
        );
    }

    if (!usuario) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-red-500">{errorMessage || 'No se pudo cargar la información del usuario'}</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-black">Mi Perfil</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <Input
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido
                        </label>
                        <Input
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* 
                <div>
                    <label htmlFor="identificacion" className="block text-sm font-medium text-gray-700 mb-1">
                        Identificación
                    </label>
                    <Input
                        id="identificacion"
                        type="identificacion"
                        value={identificacion}
                        onChange={(e) => setIdentificacion(e.target.value)}
                    />
                </div>
                */}
                <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                        Teléfono
                    </label>
                    <Input
                        id="telefono"
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>

                <div className="pt-4">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        {loading ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </div>
            </form>

            {/* Modales de feedback */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">¡Éxito!</h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                            La operación se ha completado correctamente.
                        </p>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => setShowSuccessModal(false)}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de error */}
            {showErrorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Error</h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                            {errorMessage}
                        </p>
                        <div className="flex justify-end">
                            <Button
                                onClick={() => setShowErrorModal(false)}
                            >
                                Aceptar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}