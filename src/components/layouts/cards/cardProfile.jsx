import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getUserService,updateUserService,deleteUserService } from "../../../services/user/userService";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

function CardProfile() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        paternalName: "",
        maternalName: "",
        newPassword: "",
        PasswordConfirm: "",
    });
    const [notification, setNotification] = useState(null);
    const [errorFields, setErrorFields] = useState([]);
    const [oldPassword, setOldPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userNumber = Cookies.get('id');
        if (userNumber) {
            getUserService(userNumber).then((data) => {
                if (data) {
                    setUserData({
                        name: data.name,
                        email: data.email,
                        paternalName: data.paternalSurname, 
                        maternalName: data.maternalSurname, 
                        newPassword: "",
                        PasswordConfirm: "",
                    });
                }
            });
        }
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [id]: value,
        }));
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
    
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
    };

    
    const handleSaveChanges = () => {
        const errorFields = [];
        if(userData.newPassword== undefined ||userData.newPassword == ""){
            setIsDialogOpen(true);
        }else{
            if (userData.newPassword.trim() !== userData.PasswordConfirm.trim()) {
                setNotification("Las contraseñas no coinciden");
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
                return;
            }else if(!validatePassword(userData.newPassword)){
                setNotification("Necesitas una contraseña mas segura.");
                setTimeout(() => {
                    setNotification(null);
                }, 3000);
    
            }else
            {
                setIsDialogOpen(true);
            }

        }
        
        
    };

    const handlePasswordSubmit = () => {

        if (oldPassword.trim() === "") {
            setNotification("contraseña incorrecta");
            setTimeout(() => {
                setNotification(null);
            }, 3000);
            setIsDialogOpen(false);
            return;
        }
        const userNumber = Cookies.get('id');
        if (userNumber) {
            updateUserService(userNumber, userData,oldPassword) 
                .then(response => {
                    setNotification("Usuario actualizado correctamente.");
                    setTimeout(() => {
                        setNotification(null);
                    }, 3000);
                    setUserData({
                        ...userData,
                        newPassword: "",
                        PasswordConfirm: ""
                    });
                    setOldPassword("");

                })
                .catch(error => {
                    setNotification("Error al actualizar el usuario.Revise contrseñas, Datos y vuelva a intentar");
                    setTimeout(() => {
                        setNotification(null);
                    }, 3000);
                });
                setIsDialogOpen(false);
        }



        
    };
    const handleDeleteAccount = () => {
        const userNumber = Cookies.get('id');
        if (userNumber) {
            deleteUserService(userNumber)
                .then(response => {
                    Cookies.remove('id');
                    navigate('/');
                    setTimeout(() => {
                        setNotification(null);
                    }, 3000);
                })
                .catch(error => {
                    setNotification("Error al eliminar la cuenta.");
                    setTimeout(() => {
                        setNotification(null);
                    }, 3000);
                });
            setIsDeleteDialogOpen(false);
        }
    };

    const isError = notification && (notification.includes("incorrecta") || notification.includes("no coinciden")|| notification.includes("mas segura")||notification.includes("Error"));

    return (
        <Card id="" className="border rounded-lg shadow-lg p-4">
            <CardHeader>
                <CardTitle className="text-center">Información Personal</CardTitle>
                
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
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="paternalName">Apellido Paterno:</Label>
                        <Input
                            className="border border-gray-400 rounded bg-gray-100 "
                            value={userData.paternalName}
                            id="paternalName"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="maternalName">Apellido Materno:</Label>
                        <Input
                            className="border border-gray-400 rounded bg-gray-100 "
                            value={userData.maternalName}
                            id="maternalName"
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
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <Label htmlFor="newPassword">Contraseña Nueva:</Label>
                        <p className="text-gray-600 text-sm">Puede modificar su contraseña si lo desea.</p>
                        <Input
                            className="border border-gray-400 rounded"
                            value={userData.newPassword}
                            id="newPassword"
                            type="password"
                            onChange={handleChange}
                        />
                        <p className="text-gray-600 text-sm">
                            Necesita al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número.
                        </p>
                    </div>

                    <div className="space-y-2 text-left ">
                        <Label htmlFor="PasswordConfirm">Confirma tu nueva contraseña:</Label>
                        <p className="text-gray-600 text-sm">Escriba nuevamente la contraseña</p>
                        <Input
                            className="border border-gray-400 rounded "
                            value={userData.PasswordConfirm}
                            id="PasswordConfirm"
                            type="password"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={() => setIsDeleteDialogOpen(true)} className="mt-4 mr-4 bg-red-500 text-white hover:bg-red-700">Borrar Cuenta</Button>
                <Button onClick={handleSaveChanges} className="mt-4">Guardar Cambios</Button>
            </CardFooter>



            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Contraseña</DialogTitle>
                        <DialogDescription>Por favor ingrese su contraseña antigua para confirmar los cambios</DialogDescription>
                    </DialogHeader>
                    <Input
                        className="border border-gray-400 rounded mt-4"
                        value={oldPassword}
                        id="oldPassword"
                        type="password"
                        placeholder="Contraseña Antigua"
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <DialogFooter className="mt-4">
                        <Button onClick={() => setIsDialogOpen(false)} className ="bg-gray-500 text-white hover:bg-gray-700 mt-4">Cancelar</Button>
                        <Button onClick={handlePasswordSubmit}  className ="mt-4">Confirmar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmar Eliminación</DialogTitle>
                        <DialogDescription>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button onClick={() => setIsDeleteDialogOpen(false)} className="bg-gray-500 text-white hover:bg-gray-700 mt-4">Cancelar</Button>
                        <Button onClick={handleDeleteAccount} className="bg-red-500 text-white hover:bg-red-700 mt-4">Confirmar Eliminación</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

export default CardProfile;
