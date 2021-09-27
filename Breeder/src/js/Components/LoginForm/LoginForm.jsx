import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import './LoginForm.scss';

import PasswordInput from '../UI/input/PasswordInput';
import InputField from '../UI/input/Input';
import Button from '../UI/button/Button';

import { AuthContext } from "../../auth-context";
import { useHistory } from 'react-router';

const LoginForm = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const [user, setUser] = useState({
        userEmail: '',
        userPassword: '',
    });
    const [forbidden, setForbidden] = useState(false)

    const history = useHistory();

    useEffect(() => { }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setUser({ ...user, [name]: value })
    };
    const handleLogin = (e) => {

        e.preventDefault()
        fetch("/api/v1/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset="utf-8"'
            },
            body: JSON.stringify({ ...user })
        })
            .then(response => {
                if (response.ok) {
                    setIsAuth(true)
                    history.push('/')
                } else if (response.status === 403) {
                    setForbidden(true)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="login-form__container">
            <form action="#" method="get" className="login-form__form">
                <div className="login-form__inner-container">
                    <h2 className="login-form__title">Войти на сайт</h2>
                    <InputField
                        inputName="userEmail"
                        label='Введите почту'
                        type='email'
                        placeholder='example@example.ru'
                        isRequired={ true }
                        value={ user.userEmail }
                        onChange={ handleOnChange }
                        isEditable={false}
                    />
                    <PasswordInput
                        label='Введите пароль'
                        inputName='userPassword'
                        placeholder='•••••••••'
                        isRequired={ true }
                        value={ user.userPassword }
                        onChange={ handleOnChange }
                        autoComplete="current-password"
                    />
                    <div className="stay-logged">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Запомнить меня</label>
                    </div>
                    <Button
                        btnClass='btn-registration pr-filled-btn'
                        text='Войти'
                        isLink={ false }
                        type='submit'
                        onClick={ handleLogin }
                    />

                </div>
                { forbidden
                    ? <p className='err-msg err-msg-login'>Такой пользователь не найден. Проверьте email и пароль</p>
                    : ''
                }
            </form>
        </div>
    )
}

export default LoginForm;