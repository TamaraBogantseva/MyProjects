import React from 'react';
import ReactDom from 'react-dom';

import '@styles/main.scss';

import Router from './Core/router/';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { history, initStore } from './Core/Store';

const { store, persistor } = initStore();

const container = document.querySelector('#app');

ReactDom.render(
    <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
            <ConnectedRouter history={ history }>
                <Router />
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    container
);