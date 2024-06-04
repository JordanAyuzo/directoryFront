import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/login/login.jsx';
import Register from './components/pages/register/register.jsx';
import Home from './components/pages/home/home.jsx';
import ProtectedRoute from './services/utils/protectedRoute.jsx';

function RoutesComponent() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<ProtectedRoute element={<Home />} />} />
            </Routes>
        </div>
    );
}

export default RoutesComponent;
