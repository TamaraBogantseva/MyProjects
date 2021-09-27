import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

import { blue } from '@material-ui/core/colors';


const emails = ['Han Solo', 'Yoda', 'Boba Fett'];
//documentation https://material-ui.com/ru/styles/api/#makestyles-styles-options-hook
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
    testClass: {
        fontSize: '10em'
    }
});

function SimpleDialog(props) {

    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        props.addChat(value);
        onClose(value);
    };

    return (
        <Dialog onClose={ handleClose } aria-labelledby="simple-dialog-title" open={ open } >
            <DialogTitle id="simple-dialog-title">Write to...</DialogTitle>
            <List>
                { emails.map((email) => (
                    <ListItem button onClick={ () => handleListItemClick(email) } key={ email }>
                        <ListItemAvatar>
                            <Avatar className={ classes.avatar }>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={ email } />
                    </ListItem>
                )) }
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) {

    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <IconButton aria-label="add" color="primary" onClick={ handleClickOpen }>
                <AddCircleOutlineRoundedIcon />
            </IconButton>
            <SimpleDialog selectedValue={ selectedValue } open={ open } onClose={ handleClose } addChat={ props.add } />
        </div>
    );
};