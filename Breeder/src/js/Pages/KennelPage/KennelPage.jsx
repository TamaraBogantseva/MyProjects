import React from 'react'
import Footer from '../../Containers/Footer/Footer';
import KennelInfo from '../../Components/KennelInfo/KennelInfo';
import Header from '../../Containers/Header/Header';

function KennelPage({ isAuth, isMain }) {
    return (
        <div>
            <Header isAuth={ isAuth } isMain={ isMain } />
            <main className="main">
                <KennelInfo />
            </main>
        </div>
    )
}

export default KennelPage
