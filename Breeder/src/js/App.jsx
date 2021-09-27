import React, { useState, useEffect } from 'react';
import Router from './Router/router';
import { AuthContext } from "./auth-context";
import Header from './Containers/Header/Header';
import Footer from './Containers/Footer/Footer';

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        setIsAuth(JSON.parse(window.localStorage.getItem('isAuth')));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('isAuth', isAuth);
    }, [isAuth]);

    return (
        <AuthContext.Provider value={ { isAuth, setIsAuth } }>
            <Router isAuth={ isAuth } />
            <Footer />
        </AuthContext.Provider >
    )
}

export default App;