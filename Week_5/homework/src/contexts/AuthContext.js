import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [loginError, setLoginError] = useState(null);

    const VALID_USERNAME = "admin";
    const VALID_PASSWORD = "racecar";

    const login = (username, password) => {
        if (username === VALID_USERNAME && password === VALID_PASSWORD) {
            setCurrentUser({username});
            localStorage.setItem('user', JSON.stringify({username}));
            navigate("/home");
        } else {
            setLoginError("Invalid username or password");
        }
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
        navigate("/");
    };

    const contextValue = {
        currentUser,
        login,
        logout,
        loginError
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}