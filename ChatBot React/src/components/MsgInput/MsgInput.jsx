import React, { Component } from 'react';

import './style.scss';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

export default class MsgInput extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.userSend(this.state.value);
        this.state.value = '';
    }
    render() {
        return (
            <form className="msg-user">
                <TextField className="msg-input" id="outlined-basic" variant="outlined" value={ this.state.value } onChange={ this.handleChange } />
                <Button
                    variant="contained"
                    color="primary"
                    className="msg-btn"
                    endIcon={ <Icon>send</Icon> }
                    type="submit"
                    onClick={ this.handleSubmit }
                >
                    Send
                </Button>
            </form>
        );
    }

};