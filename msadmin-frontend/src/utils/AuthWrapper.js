/**
 * Created by KanadeM on 3/2/2024
 */
import React, {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import {getToken} from "./auth";
import {showMessage} from "./showMessage";

const AuthWrapper = ({ children }) => {
    const isAuthenticated = getToken() && getToken() !== '';

    useEffect(() => {
        if (!isAuthenticated) {
            showMessage('Your session has expired, and you have been logged out.', 'error');
        }
    }, [isAuthenticated]); // Dependency array ensures this runs only when isAuthenticated changes


    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthWrapper;
