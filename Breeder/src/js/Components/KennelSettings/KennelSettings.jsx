import React, { useState, useEffect } from 'react'
import InputField from '../UI/input/Input'
import TooltipArrow from '../UI/popup/TooltipArrow'
import './KennelSettings.scss'
import TextArea from '../UI/textarea/TextArea';
import Button from '../UI/button/Button';
import { useHistory } from 'react-router';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
import { nameValidation, phoneValidation } from '../../utils/validation'


function KennelSettings({ user, getUser }) {

    const history = useHistory();
    const [disabled, setDisabled] = useState({
        kennel: true,
        breeds: true,
        name: true,
        phone: true,
        description: false
    });
    const [dataToUpdate, setDataToUpdate] = useState({
        kennelName: user.kennel.name,
        name: user.name,
        breeds: user.kennel.breeds,
        phone: user.phone,
        description: user.kennel.description
    })

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const updateKennelData = async () => {
        try {
            await fetch("/api/v1/user", {
                method: 'PUT',
                body: JSON.stringify({
                    userName: dataToUpdate.name,
                    userPhone: dataToUpdate.phone,
                    kennelBreeds: dataToUpdate.breeds,
                    kennelName: dataToUpdate.kennelName,
                    kennelDescription: dataToUpdate.description
                }),
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setIsSuccess(true)
                    setmodalOpen(true)
                    setTimeout(() => history.push('/profile'), 3000);
                    getUser();
                } else {
                    setIsSuccess(false)
                    setmodalOpen(true)
                }

            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
        setDisabled({
            kennel: true,
            breeds: true,
            name: true,
            phone: true,
            description: true
        });
    }

    useEffect(
        () => { },
        [errors]
    );

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setDataToUpdate({ ...dataToUpdate, [name]: value })
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

    const validate = {
        kennel_name: name => nameValidation("User Name", name),
        userName: name => nameValidation("User Name", name),
        userPhone: phoneValidation,
    };
    const isEmptyObj = (obj) => {
        for (let key in obj) {
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        updateKennelData();

        if (isEmptyObj(errors) && !isEmptyObj(touched)) {
            updateKennelData();

        } else {
            console.log('Введите корректные данные');
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
            <SubmittingModal open={ modalOpen } onClose={ handleClose } title={ isSuccess ? 'Данные успешно обновлены!' : 'Упс! Что-то пошло не так' } text={ !isSuccess && 'Попробуйте еще раз' } onClick={ handleClose } isLink={ false } modalClass='modal-small' />
            <div className="acc-settings__profile">
                <h3 className="profile__heading">
                    Информация о питомнике
                </h3>
                <form action="#" method="post" onSubmit={ e => handleSubmit(e) } className="profile-form">

                    <InputField
                        label="Название питомника"
                        type="text"
                        inputName="kennel_name"
                        id="kennel_name"
                        customClass="profile__input-block"
                        classNameLabel="profile__label profile__label_kennel"
                        classNameInput="profile__input profile__input_kennel"
                        placeholder={ user.kennel.name }
                        disabled={ disabled.kennel }
                        onClick={ () => setDisabled({ ...disabled, kennel: false }) }
                        onChange={ handleOnChange }
                        onBlur={ handleBlur }
                        err={ touched.kennel_name && errors.kennel_name }
                        isEditable={ true }
                    />

                    <div className="breeds-block">
                        <h5>Породы питомника</h5>
                        <ul className="breeds-list">
                            { user.kennel.breeds.map((breed) => {
                                return (
                                    <li className="breed">{ breed }</li>
                                )
                            }) }
                        </ul>
                        <TooltipArrow
                            btnClass="breed-tooltip"
                            tooltipClass="profile__tooltip"
                            tooltipContent="Чтобы отредактировать данные свяжитесь с нами по почте breederas@gmail.com"
                            btnContent={ <span className="breed-tooltip_text">Редактировать породы</span> }
                        />
                    </div>

                    <InputField
                        label="ФИО владельца"
                        type="text"
                        inputName="userName"
                        id="userName"
                        customClass="profile__input-block"
                        classNameLabel="profile__label profile__label_name"
                        classNameInput="profile__input profile__input_name"
                        placeholder={ user.name }
                        disabled={ disabled.name }
                        onClick={ () => setDisabled({ ...disabled, name: false }) }
                        onChange={ handleOnChange }
                        onBlur={ handleBlur }
                        isEditable={ true }
                        err={ touched.userName && errors.userName }
                    />

                    <InputField
                        label="Телефон"
                        type="text"
                        inputName="userPhone"
                        id="userPhone"
                        customClass="profile__input-block"
                        classNameLabel="profile__label profile__label_phone"
                        classNameInput="profile__input profile__input_phone"
                        placeholder={ user.phone }
                        disabled={ disabled.phone }
                        onClick={ () => setDisabled({ ...disabled, phone: false }) }
                        onChange={ handleOnChange }
                        onBlur={ handleBlur }
                        isEditable={ true }
                        err={ touched.userPhone && errors.userPhone }
                    />

                    <TextArea
                        label="Описание питомника"
                        rows={ 7 }
                        placeholder='Кратко расскажите о питомнике, историю его основания, питомцах и достижениях.'
                        fullWidth={ true }
                        classNameLabel="profile__textarea_label"
                        customClassContainer='textarea-container_kennel'
                        customClass='textarea-input_kennel'
                        // propValue={ puppyParam.parentsDescription }
                        inputName={ 'kennelDescription' }
                        // onChange={ handleChange }
                        maxLength={ 1000 }
                        isEditable={ true }
                        disabled={ disabled.description }
                        onClick={ () => { if (!disabled.description) { setDisabled({ ...disabled, description: false }) } } }
                        onChange={ (e) => setDataToUpdate({ ...dataToUpdate, description: e.target.value }) }

                    />
                    <div className='textarea-limit_kennel'><span>До 1000 символов</span><span>{ ` 0/ 1000` }</span></div>


                    <Button
                        btnClass="sec-outlined-btn profile__btn"
                        // onClick={e => handleClick(e)}
                        text="Сохранить"
                        disabled={ false }
                        isLink={ false }
                    />

                </form>
            </div>
        </>
    )
}

export default KennelSettings
