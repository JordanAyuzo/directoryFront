import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = !!Cookies.get('id'); // Verificar si hay una cookie de 'id'

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
