
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '@pages/Home';

class Router extends Component {
    render() {
        const { chats } = this.props;
        const ChatsRoutes = chats.map((el) => <Route
            exact path={ `/chat/${el.id}` }
            render={ () => <Home name={ el.name } /> }
            key={ el.id }
        />
        );
        return (
            <Switch>
                <Route exact path="/" component={ Home } />
                { ChatsRoutes }
            </Switch>
        );
    }
};

const mapState = ({ chatsReducer }) => ({
    chats: chatsReducer.chats
});

const mapActions = dispatch => bindActionCreators({}, dispatch);

export default connect(mapState, mapActions)(Router);