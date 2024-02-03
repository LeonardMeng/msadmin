/**
 * Created by KanadeM on 3/2/2024
 */
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({ children }) => {
    const isAuthenticated = () => {
        // Implement your authentication logic here
        // For example, check if a user token exists
        return !!localStorage.getItem('userToken');
    };

    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default AuthWrapper;
