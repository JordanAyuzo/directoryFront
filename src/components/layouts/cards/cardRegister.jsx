import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { createContactService } from "../../../services/contact/contactService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function CardRegister() {
    const [userData, setUserData] = useState({
        id_user: Cookies.get('id') || "",
        name: "",
        email: "",
        paternalSurname: "",
        maternalSurname: "",
        phoneNumber: "",
        address: "",
    });
    const [notification, setNotification] = useState(null);
    const [errorFields, setErrorFields] = useState([]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [id]: value,
        }));
    };

    const handleAddContact = async () => {
        const requiredFields = ['name', 'email', 'paternalSurname', 'phoneNumber', 'address'];
        const missingFields = requiredFields.filter(field => !userData[field]);
        if (missingFields.length > 0) {
            setNotification('Por favor completa los campos requeridos');
            return;
        } else {
            setErrorFields([]);
        }

        try {
            const response = await createContactService(userData);
            setNotification('Contacto creado exitosamente');
        } catch (error) {
            setNotification('Error al guardar al contacto.Revise si el contacto ya existe ya existe');
        }
    };

    const isError = notification && (notification.includes("Error") || notification.includes("campos requeridos"));

    return (
        <Card id="" className="border rounded-lg shadow-lg p-4">
            <CardHeader>
                <CardTitle className="text-center">Agregar Contacto</CardTitle>
                
                {notification && (
                    <div className={isError ? "bg-red-200 p-2 rounded-md" : "bg-green-200 p-2 rounded-md"}>
                        <Label className={isError ? "text-red-500" : "text-green-500"}>
                            {notification}
                        </Label>
                    </div>
                )}
                {errorFields.length > 0 && (
                    <div className="bg-red-200 p-2 rounded-md">
                        <Label className="text-red-500">Por favor completa los campos requeridos</Label>
                    </div>
                )}
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 items-start gap-6">
                    <div className="space-y-2 text-left">
                        <Label htmlFor="name">Nombre(s):</Label>
                        <Input
                            className="border border-gray-400 rounded bg-gray-100 "
                            value={userData.name}
                            id="name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="paternalSurname">Apellido Paterno:</Label>
                        <Input
                            className="border border-gray-400 rounded bg-gray-100 "
                            value={userData.paternalSurname}
                            id="paternalSurname"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="maternalSurname">Apellido Materno:</Label>
                        <Input
                            className="border border-gray-400 rounded bg-gray-100 "
                            value={userData.maternalSurname}
                            id="maternalSurname"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="email">Correo:</Label>
                        <Input
                            className="border border-gray-400 rounded bg-gray-100 "
                            value={userData.email}
                            id="email"
                            type="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="phoneNumber">Número teléfonico:</Label>
                        <Input
                            className="border border-gray-400 rounded bg-gray-100 "
                            value={userData.phoneNumber}
                            id="phoneNumber"
                            type="tel"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="address">Dirección:</Label>
                        <Input
                            className="border border-gray-400 rounded bg-gray-100 "
                            value={userData.address}
                            id="address"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleAddContact}>Guardar Contacto</Button>
            </CardFooter>
        </Card>
    );
}

export default CardRegister;
