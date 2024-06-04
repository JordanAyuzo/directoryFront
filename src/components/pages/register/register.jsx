import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "./register.css";
import { registerService } from '../../../services/user/userService';
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


function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [motherLastName, setMotherLastName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPersonalInfo, setShowPersonalInfo] = useState(true);
    const [passwordRequirements, setPasswordRequirements] = useState({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
    });
    const navigate = useNavigate();

    const handlePersonalInfoSubmit = (event) => {
        event.preventDefault();
        setShowPersonalInfo(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const response = await registerService(email, password, firstName, lastName, motherLastName);
            console.log(response);
    
            if (response.message && response.message.includes("200")) {
                navigate('/');
            }
        } catch (error) {
            if (error.message.includes("409")) {
                setError('El correo electrónico ya ha sido usado');
            } else {
                setError('Ocurrió un error inesperado.');
            }
        } finally {
            setLoading(false);
        }
    }

    const handleChangePassword = (value) => {
        setPassword(value);

        const requirements = {
            minLength: value.length >= 8,
            hasUppercase: /[A-Z]/.test(value),
            hasLowercase: /[a-z]/.test(value),
            hasNumber: /\d/.test(value),
        };

        setPasswordRequirements(requirements);
    };

    const handleReturnToPersonalInfo = () => {
        setShowPersonalInfo(true);
    };

    return (
        <div className='full-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
            {showPersonalInfo && (
                <Card className="mx-auto max-w-sm h-auto w-80 ">
                    <CardHeader className="space-y-1 ">
                        <CardTitle className="text-4xl font-bold text-blue-500 text-center">Registrar</CardTitle>
                        <CardDescription className = "text-center">Ingresa tus datos personales para completar tu registro</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePersonalInfoSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Correo</Label>
                                <Input
                                    className = "border border-gray-300 " 
                                    id="email"
                                    placeholder=" correo@ejemplo.com"
                                    required
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="firstName">Nombre</Label>
                                <Input
                                    className = "border border-gray-300 " 
                                    id="firstName"
                                    placeholder="Nombre"
                                    required
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Apellido Paterno</Label>
                                <Input
                                    className = "border border-gray-300 " 
                                    id="lastName"
                                    placeholder="Apellido Paterno"
                                    required
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="motherLastName">Apellido Materno</Label>
                                <Input
                                    className = "border border-gray-300 " 
                                    id="motherLastName"
                                    placeholder="Apellido Materno"
                                    required
                                    type="text"
                                    value={motherLastName}
                                    onChange={(e) => setMotherLastName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center h-full">
                                <Button className="w-full" type="submit">
                                    Siguiente
                                </Button>
                                <a href="/" className="text-center text-blue-500 hover:underline mt-4">
                                    Ya tengo una cuenta
                                </a>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
            {!showPersonalInfo && (
                <Card className="mx-auto max-w-sm h-auto w-80">
                    <CardHeader className="space-y-1 ">
                        <CardTitle className="text-4xl font-bold text-blue-500 text-center">Registrar</CardTitle>
                        <CardDescription className = "text-center">Ingresa una contraseña segura para tu cuenta.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2 relative">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    className = "border border-gray-300 " 
                                    id="password"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => handleChangePassword(e.target.value)}
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
                            <div className="text-sm">
                                Requisitos de contraseña:
                                <ul className="list-disc ml-5">
                                    <li className={passwordRequirements.minLength ? "text-green-500" : "text-gray-400"}>8 letras o más</li>
                                    <li className={passwordRequirements.hasUppercase ? "text-green-500" : "text-gray-400"}>Al menos una mayúscula</li>
                                    <li className={passwordRequirements.hasLowercase ? "text-green-500" : "text-gray-400"}>Al menos una minúscula</li>
                                    <li className={passwordRequirements.hasNumber ? "text-green-500" : "text-gray-400"}>Al menos un número</li>
                                </ul>
                            </div>
                            <div className="flex justify-between">
                                <Button className="w-32 bg-gray-500" onClick={handleReturnToPersonalInfo}>
                                    Regresar
                                </Button>
                                <Button className="w-32 bg-green-500" type="submit" disabled={!Object.values(passwordRequirements).every(Boolean) || loading}>
                                    {loading ? 'Registrando...' : 'Registrar'}
                                </Button>
                                <div className="text-center mt-4">
                        </div>
                                
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default Register
