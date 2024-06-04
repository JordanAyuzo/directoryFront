import * as API from "../utils/consts.js";

export const loginService = async (email, pass) => {
    const user_json = {
        email: email,
        password: pass,
    };
    try {
        return await fetch(API.BASEURL + "/user/login", {
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify(user_json),
        }).then((res) => res.json());
    } catch (e) {}
};

export const registerService = async (email, password, firstName, lastName, motherLastName) => {
    const userJSON = {
        email: email,
        password: password,
        name: firstName,
        paternalSurname: lastName,
        maternalSurname: motherLastName
    };

    try {
        const response = await fetch(API.BASEURL + "/user/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userJSON),
        });

        if (!response.ok) {
            throw response;
        }

        return await response.json();
    } catch (error) {
        const errorMessage = await error.json();
        throw new Error(errorMessage.error);
    }
};

export const getUserService = async (userId) => {
    try {
        const response = await fetch(`${API.BASEURL}/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error al obtener usuario');
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }

    
};

export const updateUserService = async (userId, data, oldpass) => {
    const userJSON = {
        email: data.email,
        password: data.newPassword,
        name: data.name,
        paternalSurname: data.paternalName,
        maternalSurname: data.maternalName,
        oldPassword: oldpass
    };
    console.log(userJSON);

    try {
        const response = await fetch(`${API.BASEURL}/user/updateUser/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userJSON),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el usuario');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const deleteUserService = async (userId) => {
    try {
        const response = await fetch(`${API.BASEURL}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = response.status === 404 ? '404 User not found' :
                'Error al eliminar usuario';
            throw new Error(errorText);
        }

        return { message: '200 User deleted successfully' };
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
};
