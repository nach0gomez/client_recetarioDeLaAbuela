import React, { createContext, useContext, useState } from 'react';
import { ACCESS_TOKEN } from '../constants';
import { Navigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem(ACCESS_TOKEN));

    const login = (token) => {
        localStorage.setItem(ACCESS_TOKEN, token);
        setIsAuth(true);
    };

    const deleteToken = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        setIsAuth(false);
       
    };

    
  

    return (
        <AuthContext.Provider value={{ isAuth, login, deleteToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
