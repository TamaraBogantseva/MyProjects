import React, { useState, useContext, useEffect } from 'react';
import './AuthNavbarPart.scss';
import { Avatar, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../auth-context";
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    colorDefault: {
        backgroundColor: 'transparent'
    }
});

function AuthNavbarPart() {

    const [kennelPhoto, setKennelPhoto] = useState('');

    const getKennelPhoto = (async () => {
        try {
            await fetch("/api/v1/user")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setKennelPhoto(data.kennel.photo);
                })
        } catch (error) {
            console.error('Error:', error);
        }
    })

    useEffect(() => {
        
        getKennelPhoto();
    }, []);

    const classes = useStyles();
    const { isAuth, setIsAuth } = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = useState(null);

    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        fetch("http://localhost:5000/api/v1/logout", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset="utf-8"'
            },
            body: JSON.stringify({})
        })
            .then(response => {
                setIsAuth(false)
                history.push('/')
            })
    }

    return (
        <>
            <Avatar
                classes={ {
                    colorDefault: classes.colorDefault
                } }
                variant="circular"
                className="avatar-header"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={ handleClick }
                src={kennelPhoto}
            >
                <img alt="avatar" src="./img/avatar-fallback.svg" />
            </Avatar>
            <Menu
                id="simple-menu"
                className="menu-popup"
                anchorEl={ anchorEl }
                keepMounted
                open={ Boolean(anchorEl) }
                onClose={ handleClose }
            >
                <MenuItem onClick={ handleClose } className="menu-popup-item">
                    <Link
                        to="/profile">
                        Профиль
                    </Link>
                </MenuItem>
                <MenuItem onClick={ handleClose } className="menu-popup-item">
                    <Link
                        to="/kennel">
                        Питомник
                    </Link>
                </MenuItem>
                <MenuItem onClick={ handleLogout } className="menu-popup-item">
                    <Link
                        to="/">
                        Выйти
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}

export default AuthNavbarPart;
