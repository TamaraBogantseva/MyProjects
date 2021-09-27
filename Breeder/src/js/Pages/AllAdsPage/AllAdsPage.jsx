import React from 'react'
import AdsContainer from '../../Containers/AdsContainer/AdsContainer'
import Footer from '../../Containers/Footer/Footer'
import './AllAdsPage.scss';
import '../../../scss/App.scss';
import Header from '../../Containers/Header/Header';

function AllAdsPage({isAuth, isMain}) {

    return (
        <>
            <Header isMain={ isMain } isAuth={isAuth} />
            <main className="main container">
                <div className="container broods-page__container">
                    <h1 className="broods_heading">Объявления о продаже щенков</h1>
                    <AdsContainer />
                </div>
            </main>
        </>
    )
}

export default AllAdsPage
