import React from 'react';

import Footer from '../../Containers/Footer/Footer';
import RegistrationForm from '../../Components/RegistrationForm/RegistrationForm';

import './RegistrationPage.scss'
import '../../../scss/App.scss'
import Header from '../../Containers/Header/Header';

function RegistrationPage({isMain}) {
    return (
            <>
                <Header isMain={ isMain } type={ 'registration' } />
                <main className="main">
                    <RegistrationForm />
                </main>
            </>
    )
}

export default RegistrationPage;