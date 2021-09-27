import React from 'react';
import MessageList from '@containers/MessageList';
import ChatsList from '@containers/ChatsList';
import Header from '@components/Header';

import { StylesProvider } from '@material-ui/core/styles';

import './style.scss';

export default (props) => {

    return <StylesProvider>
        <>
            <Header name={ props.name } />
            <ChatsList />
            { props.name && <MessageList /> }
        </>
    </StylesProvider>;
}