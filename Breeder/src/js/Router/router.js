import React from 'react';
import { Route, BrowserRouter, useHistory } from 'react-router-dom';

import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import MainPage from '../Pages/MainPage/MainPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import AccountSettings from '../Pages/AccountSettings/AccountSettings';
import KennelPage from '../Pages/KennelPage/KennelPage';
import AllAdsPage from '../Pages/AllAdsPage/AllAdsPage';


export const privateRoutes = [
    { path: '/profile', Component: AccountSettings },
];

export const publicRoutes = [
    { path: '/signup', Component: RegistrationPage },
    { path: '/signin', Component: LoginPage }
];

const Router = ({ isAuth }) => (
    <BrowserRouter>
        <div className="wrapper">
            <Route key='/' exact={ true } path='/' >
                <MainPage isMain={ true } isAuth={ isAuth } />
            </Route>
            <Route key='/broods' exact={ true } path='/broods' >
                <AllAdsPage isMain={ false } isAuth={ isAuth } />
            </Route>
            <Route key='/kennel' exact={ true } path='/kennel' >
                <KennelPage isMain={ false } isAuth={ isAuth } />
            </Route>
            { isAuth
                ? (
                    privateRoutes.map(({ path, Component, exact = false }) => (
                        <Route key={ path } exact={ exact } path={ path }>
                            <Component isMain={ false } isAuth={ isAuth } />
                        </Route>
                    ))
                )
                : (
                    publicRoutes.map(({ path, Component, exact = false }) => (
                        <Route key={ path } exact={ exact } path={ path }>
                            <Component isMain={ false } isAuth={ isAuth } />
                        </Route>
                    ))
                )
            }
        </div>
    </BrowserRouter>
)


export default Router;