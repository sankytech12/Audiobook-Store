import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get('https://audiobook-store-backend.onrender.com/api/users/check');
                setUser(data.user);
            } catch (error) {
                setUser(null);
            }
        };
        checkAuth();
    },[]);

    const login = async (email, password) => {
        const { data } = await axios.post('https://audiobook-store-backend.onrender.com/api/users/login', { email, password });
        setUser(data.user);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post('https://audiobook-store-backend.onrender.com/api/users/register', { name, email, password });
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        // await axios.post('http://localhost:5050/api/users/logout');
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
