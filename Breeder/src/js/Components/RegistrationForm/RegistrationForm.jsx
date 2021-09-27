import React, { useState, useEffect } from 'react';
import './RegistrationForm.scss';

import InputField from '../UI/input/Input'
import PasswordInput from '../UI/input/PasswordInput';
import Button from '../UI/button/Button'
import MultiplySelectInput from '../UI/input/MultiplySelectInput';
import { useHistory } from 'react-router';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';

import { nameValidation, emailValidation, phoneValidation, passwordValidation } from '../../utils/validation'

function RegistrationForm() {
    const [newUser, setNewUser] = useState({
        kennelName: '',
        userName: '',
        phone: '',
        email: '',
        password: '',
        passwordConfirm: '',
        pdagreement: null,
    });

    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        const getBreeds = async () => {
            try {
                await fetch('/api/v1/breeds')
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        setBreeds(data.map(item => item.breed));
                    })
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        getBreeds();
    }, []);

    const [breedName, setbreedName] = useState([]);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isError, setIsError] = useState(false);
    const [hasEmptyFields, setHasEmptyFields] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);


    const history = useHistory();

    useEffect(() => { }, [newUser])

    useEffect(
        () => { },
        [errors]
    );

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setNewUser({ ...newUser, [name]: value })
        setTouched({
            ...touched,
            [name]: true
        });
    };


    const handleBlur = evt => {
        const { name, value } = evt.target;

        // remove whatever error was there previously
        const { [name]: removedError, ...rest } = errors;

        // check for a new error
        const error = validate[name](value);

        // // validate the field if the value has been touched
        setErrors({
            ...rest,
            ...(error && { [name]: touched[name] && error })
        });
    };

    const handleCheckBox = (e) => {
        let isChecked = e.target.checked;
        setNewUser({ ...newUser, pdagreement: isChecked })
    }

    const validate = {
        kennelName: name => nameValidation("User Name", name),
        userName: name => nameValidation("User Name", name),
        email: emailValidation,
        phone: phoneValidation,
        password: passwordValidation
    };

    const isEmptyObj = (obj) => {
        for (let key in obj) {
            return false;
        }
        return true;
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();


        if (isEmptyObj(errors) && !isEmptyObj(touched) && newUser.pdagreement) {
            if (newUser.password === newUser.passwordConfirm) {
                sendRegistrationData(newUser);
            } else {
                setIsError(true)
            }

        } else {
            setHasEmptyFields(true)
        }
    }

    const [modalOpen, setmodalOpen] = useState(false);

    const handleClose = () => {
        setmodalOpen(false);
    };

    const sendRegistrationData = () => {

        fetch("/api/v1/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset="utf-8"'
            },
            body: JSON.stringify({
                kennelName: newUser.kennelName,
                userName: newUser.userName,
                userPhone: newUser.phone,
                userPassword: newUser.password,
                userEmail: newUser.email,
                breeds: breedName
            })
        })
            .then(response => {
                if (response.ok) {
                    setmodalOpen(true)
                    setTimeout(() => history.push('/signin'), 3000)

                } else {
                    setmodalOpen(true)
                    setIsSuccess(false)
                    setHasEmptyFields(false)
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <>

            <SubmittingModal open={ modalOpen } onClose={ handleClose } title={ isSuccess ? 'Регистрация прошла успешно' : 'Упс! Что-то пошло не так' } text={ isSuccess ? 'Теперь вы можете войти в свой аккаунт' : 'Попробуйте еще раз' } path='/signin' isSubmit={ true } modalClass='modal-big' />

            <div className="registration-block">
                <div className="registration-container">
                    <h2 className="registration__header">Регистрация</h2>
                    <form action="#" method="post" id="registration-form" autoComplete='off' >
                        <InputField
                            label='Название питомника '
                            type='text'
                            inputName='kennelName'
                            placeholder='Введите название'
                            value={ newUser.kennelName }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.kennelName && errors.kennelName }
                            isEditable={ false }

                        />
                        <MultiplySelectInput
                            inputName='breeds'
                            value={ breedName }
                            onChange={ (event, newValue) => {
                                setbreedName(newValue);
                            } }
                            customClass='registration-breeds'
                            classNameInput='input-multiply'
                            breeds={ breeds }
                            label='Породы в питомнике'
                            placeholder='Выберите породу '
                        />
                        <InputField
                            label='Ф.И.О. владельца'
                            type='text'
                            inputName='userName'
                            placeholder='Иванов Иван Иванович'
                            value={ newUser.userName }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.userName && errors.userName }
                            autoComplete="name"
                            isEditable={ false }
                        />
                        <InputField
                            label='Телефон'
                            type='text'
                            inputName='phone'
                            placeholder='+7 (___) ___ - __ - __'
                            value={ newUser.phone }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.phone && errors.phone }
                            autoComplete="tel"
                            isEditable={ false }
                        />
                        <InputField
                            label='Регистрационная почта'
                            type='email'
                            inputName='email'
                            placeholder='example@example.ru'
                            value={ newUser.email }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.email && errors.email }
                            isEditable={ false }
                        />
                        <PasswordInput
                            label='Придумайте пароль'
                            inputName='password'
                            placeholder='•••••••••'
                            value={ newUser.password }
                            onChange={ handleOnChange }
                            onBlur={ handleBlur }
                            err={ touched.password && errors.password }
                            autoComplete="new-password"
                        />
                        <PasswordInput
                            label='Придумайте пароль'
                            inputName='passwordConfirm'
                            placeholder='•••••••••'
                            value={ newUser.passwordConfirm }
                            onChange={ handleOnChange }
                            autoComplete="new-password"

                        />

                        { isError
                            ? <p className='err-msg'>Гав! Пароли не совпадают</p>
                            : ''
                        }
                    </form>
                    <div className="personal-data">
                        <input type="checkbox" name="pd-agreement" id="agreement" className="feedback-form__agreement-checkbox"
                            required onChange={ handleCheckBox } checked={ newUser.pdagreement } ></input>
                        <label htmlFor="agreement" className="feedback-form__agreement">даю свое согласие на обработку моих персональных данных и подтверждаю, что ознакомлен(а) с <a href='./documents/Политика конфиденциальности Breeder.pdf' className='pd-agreement-link' download> пользовательским соглашением </a></label>
                    </div>
                    { hasEmptyFields
                        ? <p className='err-msg'>Заполните, пожалуйста, все поля</p>
                        : ''
                    }
                    <Button
                        text='Зарегистрироваться'
                        isLink={ false }
                        btnClass='btn-registration pr-filled-btn'
                        onClick={ handleSubmitClick }
                    />
                </div>
            </div>
        </>
    )
}

export default RegistrationForm;