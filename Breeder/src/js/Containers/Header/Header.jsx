import React from 'react';
import HeaderInfo from '../../Components/HeaderInfo/HeaderInfo';
import Navbar from '../../Components/UI/navbar/Navbar';
import './Header.scss';

function Header({ isAuth, toggleAuth, isMain = false }) {
    return (
        <header className="header container">
            <Navbar isMain={ isMain } isAuth={isAuth} toggleAuth={toggleAuth} />
            {isMain && <HeaderInfo />}
        </header>
    )
}

export default Header
