import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./login.css";
import { loginService } from '@/services/user/userService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";


function Login() {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await loginService(email, password);

            if (response.user && response.user.id) {
                Cookies.set('id', response.user.id)// Usuario autenticado correctamente
                navigate('/home');
            } else {
                if (response.error && response.error.includes("401")) {
                    setError('Correo o contraseña incorrecta.');
                } else {
                    setError('Ocurrió un error inesperado.');
                }
            }
        } catch (error) {
            setError('Error del servidor');
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div className='full-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1 ">
                    <CardTitle className="text-4xl font-bold text-blue-500 text-center">Inicio</CardTitle>
                    <CardDescription>Rellena los datos solicitados para ingresar al sistema</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Correo</Label>
                            <Input
                                className = "border border-gray-300 " 
                                id="email"
                                placeholder=" correo@ejemplo.com"
                                required
                                type="text"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                className = "border border-gray-300 " 
                                id="password"
                                required
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 py-2"
                            >
                                {showPassword ? "Ocultar" : "Mostrar"}
                            </button>
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </Button>
                        <div className="text-center mt-4">
                            <a href="/register" className="text-sm text-blue-500 hover:underline">
                                Crea una cuenta nueva.
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default Login;
