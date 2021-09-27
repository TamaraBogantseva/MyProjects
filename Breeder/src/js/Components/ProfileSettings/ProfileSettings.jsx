import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import './ProfileSettings.scss'
import { makeStyles } from '@material-ui/core/styles';
import InputField from '../../Components/UI/input/Input';
import Button from '../../Components/UI/button/Button';
import PasswordInput from '../UI/input/PasswordInput';
import { useHistory } from 'react-router';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(13),
        height: theme.spacing(13),
    },
}));

function ProfileSettings({ user, getUser }) {
    const classes = useStyles();
    const history = useHistory();

    const [emailDisabled, setEmailDisabled] = useState(true);
    const [passwordDisabled, setPasswordDisabled] = useState(true);

    const [userAvatar, setUserAvatar] = useState('');
    const [emailToUpdate, setEmailToUpdate] = useState({
        email: '',
        password: ''
    });
    const [passwordToUpdate, setPasswordToUpdate] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: false
    });

    const updateEmail = async () => {
        try {
            await fetch("/api/v1/user", {
                method: 'PUT',
                body: JSON.stringify({
                    userEmail: emailToUpdate.email,
                    userPassword: emailToUpdate.password,
                }),
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setIsSuccess(true)
                    setmodalOpen(true)
                    setTimeout(() => history.push('/profile'), 3000);
                    setEmailDisabled(true);
                    getUser();
                } else {
                    setIsSuccess(false)
                    setmodalOpen(true)
                }
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
        setEmailToUpdate({
            email: '',
            password: ''
        });
    }

    const updatePassword = async () => {
        try {
            await fetch("/api/v1/user", {
                method: 'PUT',
                body: JSON.stringify({
                    userPassword: passwordToUpdate.oldPassword,
                    newPassword: passwordToUpdate.newPassword,
                }),
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setIsSuccess(true)
                    setmodalOpen(true)
                    setTimeout(() => history.push('/profile'), 3000)
                    setPasswordDisabled(true);
                    getUser();
                } else {
                    setIsSuccess(false)
                    setmodalOpen(true)
                }

            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
        setPasswordToUpdate({
            oldPassword: '',
            newPassword: '',
            confirmPassword: false
        });
    }

    const updateKennelPhoto = async (file) => {
        try {
            await fetch("/api/v1/user", {
                method: 'PUT',
                body: JSON.stringify({
                    kennelPhoto: file,
                }),
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setIsSuccess(true)
                    setmodalOpen(true)
                    setTimeout(() => history.push('/profile'), 3000)
                    getUser();
                } else {
                    setIsSuccess(false)
                    setmodalOpen(true)
                }

            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    const handleDelete = async () => {
        try {
            await fetch('api/v1/user', {
                method: 'PUT',
                body: JSON.stringify({
                    kennelPhoto: ""
                }),
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            })
                .then(res => {
                    if (res.ok) {
                        setUserAvatar('');
                        getUser();
                    }
                })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleAvatarClick = (e) => {
        let photo = e.target.files[0];
        getBase64(photo).then(
            data => {
                updateKennelPhoto(data);
                setUserAvatar([data]);
            }
        );
    }

    const [emailMatch, setEmailMatch] = useState(false);

    const checkEmail = e => {
        if (e.target.value !== user.email) {
            setEmailMatch(false);
        } else if (e.target.value === user.email) {
            setEmailMatch(true);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (emailDisabled === false) {
            if (emailMatch) {
                updateEmail();
            } else {
                setmodalOpen(true);
                setIsSuccess(false);
            }
        }
        if (passwordDisabled === false) {
            if (passwordToUpdate.confirmPassword) {
                updatePassword();
            } else {
                setmodalOpen(true);
                setIsSuccess(false);
            }
        }

    }

    const [modalOpen, setmodalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    const handleClickOpen = () => {
        setmodalOpen(true);
    };

    const handleClose = () => {
        setmodalOpen(false);
    };


    return (
        <>
            <SubmittingModal open={ modalOpen } onClose={ handleClose } title={ isSuccess ? 'Данные успешно обновлены!' : 'Упс! Что-то пошло не так' } text={ !isSuccess && 'Попробуйте еще раз' } isLink={ false } onClick={ handleClose } modalClass='modal-small' />
            <div className="acc-settings__profile">
                <h3 className="profile__heading">
                    Настройки профиля
                </h3>
                <form action="#" method="post" onSubmit={ e => handleSubmit(e) } className="profile-form">
                    <div className="profile__avatar-container">
                        <button className="profile__avatar_delete" onClick={ e => handleDelete(e) }>
                            <i className="fas edit-icon fa-times"></i>
                        </button>
                        <input id="avatar" type="file" className="profile__avatar_input" onChange={ e => handleAvatarClick(e) } />
                        <label htmlFor="avatar" className="profile__avatar_label">
                            <Avatar
                                className={ `profile__avatar ${classes.large}` }
                                src={ user.kennel.photo }
                            />
                        </label>
                    </div>

                    {
                        emailDisabled
                            ? <InputField
                                label="Email"
                                type="text"
                                inputName="email"
                                id="email"
                                customClass="profile__email"
                                classNameLabel="profile__email_label"
                                classNameInput="profile__email_input"
                                placeholder={ user.email }
                                disabled={ emailDisabled }
                                isEditable={ true }
                                onClick={ () => setEmailDisabled(!emailDisabled) }
                            />
                            : <div className="edit-block">

                                <InputField
                                    label="Старая почта"
                                    type="text"
                                    inputName="oldEmail"
                                    id="oldEmail"
                                    customClass="profile__email"
                                    classNameLabel="profile__email_label"
                                    classNameInput="profile__email_input"
                                    placeholder=''
                                    isEditable={ false }
                                    onChange={ e => checkEmail(e) }
                                />

                                <InputField
                                    label="Новая почта"
                                    type="text"
                                    inputName="newEmail"
                                    id="newEmail"
                                    customClass="profile__email"
                                    classNameLabel="profile__email_label"
                                    classNameInput="profile__email_input"
                                    placeholder=''
                                    isEditable={ false }
                                    onChange={ e => setEmailToUpdate({ ...emailToUpdate, email: e.target.value }) }
                                />
                                <PasswordInput
                                    label='Пароль'
                                    inputName='password'
                                    placeholder=''
                                    onChange={ e => setEmailToUpdate({ ...emailToUpdate, password: e.target.value }) }
                                />
                            </div>
                    }


                    {
                        passwordDisabled
                            ? <InputField
                                label="Пароль"
                                type="password"
                                inputName="password"
                                id="password"
                                customClass="profile__password"
                                classNameLabel="profile__password_label"
                                classNameInput="profile__password_input"
                                placeholder="•••••••••"
                                disabled={ passwordDisabled }
                                isEditable={ true }
                                onClick={ () => setPasswordDisabled(!passwordDisabled) }
                            />
                            : <div className="edit-block">

                                <PasswordInput
                                    label='Старый пароль*'
                                    inputName='oldPassword'
                                    placeholder=''
                                    onChange={ e => setPasswordToUpdate({ ...passwordToUpdate, oldPassword: e.target.value }) }
                                />

                                <PasswordInput
                                    label='Новый пароль*'
                                    inputName='newPassword'
                                    placeholder=''
                                    onChange={ e => setPasswordToUpdate({ ...passwordToUpdate, newPassword: e.target.value }) }
                                />
                                <PasswordInput
                                    label='Подтвердите пароль*'
                                    inputName='newPassword'
                                    placeholder=''
                                    onChange={ e => {
                                        if (passwordToUpdate.newPassword === e.target.value) {
                                            setPasswordToUpdate({ ...passwordToUpdate, confirmPassword: true });
                                        }
                                    } }
                                />
                            </div>
                    }


                    <Button
                        btnClass="sec-outlined-btn profile__btn"
                        text="Сохранить"
                        disabled={ emailDisabled || passwordDisabled ? false : true }
                        isLink={ false }
                    />

                </form>
            </div>
        </>
    )
}

export default ProfileSettings
