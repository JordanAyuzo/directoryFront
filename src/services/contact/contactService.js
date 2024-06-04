import * as API from "../utils/consts.js";

export const getContactService = async (userId) => {
    try {
        const response = await fetch(`${API.BASEURL}/contact/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al obtener informacion');
        }
    } catch (error) {
        console.error('Error al obtener informacion:', error);
        throw error;
    }
};
export const createContactService = async (contactData) => {
    console.log(contactData);
    try {
        const response = await fetch(`${API.BASEURL}/contact/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactData),
        });

        if (!response.ok) {
            const errorText = response.status === 400 ? '400 Missing required fields' :
                                response.status === 409 ? '409 Contact with this email already exists for the user' :
                                'Error al crear contacto';
            throw new Error(errorText);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al crear contacto:', error);
        throw error;
    }
};
export const updateContactService = async (contactId, updatedData) => {
    try {
        const response = await fetch(`${API.BASEURL}/contact/${contactId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorText = response.status === 404 ? '404 Contact not found' :
                                'Error al actualizar contacto';
            throw new Error(errorText);
        }

        return { message: '200 Contact updated successfully' };
    } catch (error) {
        console.error('Error al actualizar contacto:', error);
        throw error;
    }
};

export const deleteContactService = async (contactId) => {
    try {
        const response = await fetch(`${API.BASEURL}/contact/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = response.status === 404 ? '404 Contact not found' :
                                'Error al eliminar contacto';
            throw new Error(errorText);
        }

        return { message: '200 Contact deleted successfully' };
    } catch (error) {
        console.error('Error al eliminar contacto:', error);
        throw error;
    }
};
