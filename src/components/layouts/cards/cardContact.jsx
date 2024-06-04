import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFolderOpen, faUserPlus,faTrash } from '@fortawesome/free-solid-svg-icons';
import "./CardContact.css"; 
import { getContactService ,updateContactService ,deleteContactService} from "../../../services/contact/contactService";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

function ContactCard({ contact, onClick }) {
    const handleClick = () => {
        onClick(contact);
    };

    return (
        <div className="contactCard" onClick={handleClick}>
            <FontAwesomeIcon icon={faUser} className="contactIcon" />
            <div className="contactInfo">
                <h3>{contact.name}</h3>
                <p>Email: {contact.email}</p>
                <p>Teléfono: {contact.phoneNumber}</p>
            </div>
        </div>
    );
}

function ContactList({ contacts, onClick }) {
    return (
        <div>
            {contacts.map(contact => (
                <ContactCard key={contact.id} contact={contact} onClick={onClick} />
            ))}
        </div>
    );
}

function CardContact({ onViewAddContact }) {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const userId = Cookies.get('id');
                const data = await getContactService(userId);
                setContacts(data.contacts);
            } catch (error) {}
        }
        fetchContacts();
    }, []);

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setIsDialogOpen(true);
    };
    const handleUpdateData = async () => {
        try {
            await updateContactService(selectedContact.id, selectedContact);
            setIsDialogOpen(false);
            const userId = Cookies.get('id');
            const data = await getContactService(userId);
            setContacts(data.contacts);
        } catch (error) {}
    };

    const handleDeleteContact = async () => {
        try {
            await deleteContactService(selectedContact.id);
            setIsDialogOpen(false);

            // Actualizar la lista de contactos después de una eliminación exitosa
            const userId = Cookies.get('id');
            const data = await getContactService(userId);
            setContacts(data.contacts);

            console.log('Contacto eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar contacto:', error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSelectedContact((prevContact) => ({
            ...prevContact,
            [id]: value,
        }));
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phoneNumber.includes(searchTerm)
    );

    return (
        <div className="card">
            <h2 className="title">Mis Contactos</h2>
            <div className="searchContainer">
                <Input
                    className="border border-gray-400 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nombre o teléfono"
                />
            </div>
            <div className="contactListContainer">
                {filteredContacts.length === 0 && (
                    <div className="noContactsMessage">
                        <FontAwesomeIcon icon={faFolderOpen} className="noContactsIcon fa-5x" />
                        <p>Vaya, aún no tienes ningún contacto. ¡Vamos a agregar uno nuevo!</p>
                    </div>
                )}
                {filteredContacts.length > 0 && (
                    <ContactList contacts={filteredContacts} onClick={handleContactClick} />
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                <Button onClick={onViewAddContact}><FontAwesomeIcon icon={faUserPlus} /> Agregar Contacto</Button>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Contacto</DialogTitle>
                        <DialogDescription>Por favor ingrese su contraseña antigua para confirmar los cambios</DialogDescription>
                    </DialogHeader>
                    {selectedContact && (
                        <>
                            <div className="inputContainer">
                                <label htmlFor="name">Nombre:</label>
                                <Input
                                    className="border border-gray-400 rounded mt-2"
                                    value={selectedContact.name}
                                    id="name"
                                    type="text"
                                    placeholder="Nombre"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="paternalSurname">Apellido Paterno:</label>
                                <Input
                                    className="border border-gray-400 rounded mt-2"
                                    value={selectedContact.paternalSurname}
                                    id="paternalSurname"
                                    type="text"
                                    placeholder="Apellido Paterno"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="maternalSurname">Apellido Materno:</label>
                                <Input
                                    className="border border-gray-400 rounded mt-2"
                                    value={selectedContact.maternalSurname}
                                    id="maternalSurname"
                                    type="text"
                                    placeholder="Apellido Materno"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="email">Correo:</label>
                                <Input
                                    className="border border-gray-400 rounded mt-2"
                                    value={selectedContact.email}
                                    id="email"
                                    type="email"
                                    placeholder="Correo"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="phoneNumber">Número Telefónico:</label>
                                <Input
                                    className="border border-gray-400 rounded mt-2"
                                    value={selectedContact.phoneNumber}
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="Número Telefónico"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="address">Dirección:</label>
                                <Input
                                    className="border border-gray-400 rounded mt-2"
                                    value={selectedContact.address}
                                    id="address"
                                    type="text"
                                    placeholder="Dirección"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    )}
                    <DialogFooter className="mt-4">
                        <Button onClick={() => setIsDialogOpen(false)} className="bg-gray-500 text-white hover:bg-gray-700 mt-4">Cancelar</Button>
                        <Button onClick={() => handleDeleteContact(selectedContact.id)} className="bg-red-500 text-white hover:bg-red-700 mt-4"><FontAwesomeIcon icon={faTrash} /> Borrar</Button>
                        <Button onClick={handleUpdateData} className= "mt-4"> Guardar cambios</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CardContact;
