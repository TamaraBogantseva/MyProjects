import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import ReactDom from 'react-dom';

import './style.scss';

import ContactsList from '@containers/ContactsList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

// const avatarsPath = '../../src/resources/img/avatars/';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadChats, addChats } from '@actions/chats'

class ChatsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    addChat = (value) => {
        this.props.add(value);
    }

    componentDidMount() {
        this.props.load('userName');
    }

    render() {
        const { chats } = this.props;
        const Chats = chats.map((el, i) => <ListItem key={ i }>
            <ListItemAvatar>
                <Avatar alt={ el.name } src={ el.img }>
                </Avatar>
            </ListItemAvatar>
            <Link to={ `/chat/${el.id}` } className="chats-link">
                <ListItemText primary={ el.name } secondary={ el.text } />
            </Link>
        </ListItem>)
        return <div className="chatsList">
            <List>
                { Chats }
            </List>
            <ContactsList add={ this.addChat } />
        </div >;
    }
};

const mapState = ({ chatsReducer }) => ({
    chats: chatsReducer.chats
});

const mapActions = dispatch => bindActionCreators({ load: loadChats, add: addChats }, dispatch);

export default connect(mapState, mapActions)(ChatsList);