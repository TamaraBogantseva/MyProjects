import React from 'react';
import FeedbackForm from '../../Components/FeedbackForm/FeedbackForm';
import About from '../../Containers/About/About';
import Header from '../../Containers/Header/Header';


function MainPage({isAuth, toggleAuth, isMain}) {

    return (
        <>
            <Header isMain={true} isAuth={isAuth} toggleAuth={toggleAuth} />
            <section className="main" itemScope itemType="http://schema.org/Article">

                <main>
                    <About isAuth={ isAuth } />
                    <FeedbackForm />
                </main>

            </section>
        </>
    )
}

export default MainPage;
