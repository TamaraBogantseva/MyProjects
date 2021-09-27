import React, { useState, useEffect } from 'react';
import './AdForm.scss';
import InputField from '../UI/input/Input';
import Button from '../UI/button/Button';
import SelectInput from '../UI/input/SelectInput';
import TextArea from '../UI/textarea/TextArea'
import ImageUploading from 'react-images-uploading';
import DeleteButton from '../UI/button/DeleteButton';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const AdForm = () => {
    const initialPuppyState = {
        breed: '',
        sexMale: '',
        sexFemale: '',
        dateOfBirth: '',
        city: '',
        documents: '',
        price: '',
        isTransportable: '',
        description: '',
        photos: '',
        parentsDesc: '',
        parentsPhotos: '',
        creationDate: new Date().toLocaleDateString()
    }
    const [puppyParam, setpuppyParam] = useState(initialPuppyState);

    const [breeds, setBreeds] = useState([]);

    useEffect(() => {
        const getBreeds = async () => {
            try {
                await fetch('/api/v1/breeds')
                    .then((res) => {
                        return res.json();
                    })
                    .then((data) => {
                        let breedsArr = []
                        data.forEach(breed => {
                            breedsArr.push(breed.breed.replace(/['"]+/g, ''));
                        })
                        setBreeds(breedsArr);
                    })
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
        getBreeds();
    }, []);

    const [isSuccess, setIsSuccess] = useState(true);

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setpuppyParam({ ...puppyParam, [name]: value })
    };

    const [puppyImg, setpuppyImg] = useState([]);
    const [parentsImg, setparentsImg] = useState([]);

    const handleFiles = (imageList) => {
        // data for submit
        setpuppyImg(imageList);
        setpuppyParam({ ...puppyParam, photos: imageList.map(({ data_url }) => data_url) })
    };

    const handleParentsFiles = (imageList) => {
        // data for submit
        setparentsImg(imageList);
        setpuppyParam({ ...puppyParam, parentsPhotos: imageList.map(({ data_url }) => data_url) })
    };

    const clearState = () => {
        setpuppyParam({ ...initialPuppyState });
        setpuppyImg('');
        setparentsImg('')
    };

    const [modalOpen, setmodalOpen] = useState(false);


    const handleClose = () => {
        setmodalOpen(false);
    };

    const modalText = <span>Теперь его можно найти
        на странице <Link to='/broods'>"Объявления"</Link>.</span>


    const handleSubmit = async e => {
        e.preventDefault();
        const data = { ...puppyParam };
        if (data.documents === 'Есть') {
            data.documents = true;
        } else if (data.documents === 'Нет') {
            data.documents = false;
        }

        if (data.isTransportable === 'Да') {
            data.isTransportable = true;
        } else if (data.isTransportable === 'Нет') {
            data.isTransportable = false;
        }

        try {
            await fetch('/api/v1/broods', {
                method: 'POST',
                body: JSON.stringify({
                    breed: puppyParam.breed,
                    sexMale: puppyParam.sexMale,
                    sexFemale: puppyParam.sexFemale,
                    dateOfBirth: puppyParam.dateOfBirth,
                    city: puppyParam.city,
                    documents: data.documents,
                    price: puppyParam.price,
                    isTransportable: data.isTransportable,
                    description: puppyParam.description,
                    photos: puppyParam.photos,
                    parents: {
                        desc: puppyParam.parentsDesc,
                        photos: puppyParam.parentsPhotos
                    },
                    creationDate: puppyParam.creationDate
                }),
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            }).then((res) => {
                if (res.ok) {
                    setIsSuccess(true)
                    setmodalOpen(true)
                    clearState()
                    setTimeout(() => history.push('/'), 2000)

                } else {
                    setIsSuccess(false)
                    setmodalOpen(true)
                }
            });
        } catch (error) {

            console.error('Ошибка:', error);
        }

    }

    const ImagesPlaceholder = ({ numberOfPhotos }) => {
        let placeholders = []
        for (let i = 0; i < numberOfPhotos; i++) {
            placeholders.push('./img/image-placeholder.jpg')
        }
        return placeholders.map((image, index) => (
            <div key={ index } className="image-item">
                <img src={ image } alt="puppy" width="100" height="100" /></div>))
    }

    return (
        <>
            <SubmittingModal open={ modalOpen } onClose={ handleClose } title={ isSuccess ? 'Объявление опубликовано' : 'Упс! Что-то пошло не так' } text={ isSuccess ? modalText : 'Попробуйте еще раз' } isLink={ false } onClick={ handleClose } isSubmit={ false } modalClass='modal-small' />
            <div className="form-container">
                <form action="#" method="post" className="ad-container" onSubmit={ (e) => handleSubmit(e) }>
                    <SelectInput
                        items={ [...breeds] }
                        propValue={ puppyParam.breed }
                        onChange={ handleChange }
                        inputName={ 'breed' }
                        customClass='card-input'
                        customLabel='card-label'
                        classNameInput='long-select'
                        placeholder='Не выбрано'
                        label='Порода'
                    />
                    <div className="puppy-sex">
                        <p className='card-label'>Пол</p>
                        <SelectInput
                            label={ <i className="fas fa-mars"></i> }
                            propValue={ puppyParam.sexMale }
                            items={ ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] }
                            inputName={ 'sexMale' }
                            onChange={ handleChange }
                            placeholder='00'
                        />
                        <SelectInput
                            label={ <i className="fas fa-venus"></i> }
                            propValue={ puppyParam.sexFemale }
                            items={ ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] }
                            inputName={ 'sexFemale' }
                            onChange={ handleChange }
                            placeholder='00'
                        />
                    </div>
                    <InputField
                        label='Дата рождения'
                        type='date'
                        inputName='dateOfBirth'
                        placeholder='дд.мм.гггг'
                        customClass='card-input'
                        classNameLabel='card-label'
                        classNameInput='long-select'
                        propValue={ puppyParam.dateOfBirth }
                        onChange={ handleChange }
                    />
                    <span className='form-divider-line'></span>
                    <InputField
                        label='Цена'
                        type='text'
                        inputName='price'
                        placeholder='Введите стоимость щенка'
                        customClass='card-input'
                        classNameLabel='card-label'
                        classNameInput='long-select'
                        propValue={ puppyParam.price }
                        onChange={ handleChange }
                    />
                    <SelectInput
                        label='Наличие документов'
                        propValue={ puppyParam.documents }
                        items={ ['Есть', 'Нет'] }
                        inputName={ 'documents' }
                        onChange={ e => handleChange(e) }
                        customClass='card-input'
                        customLabel='card-label'
                        classNameInput='long-select'
                        placeholder='Не выбрано'
                    />
                    <span className='form-divider-line'></span>
                    <SelectInput
                        label='Местонахождение'
                        propValue={ puppyParam.city }
                        items={ ['Москва', 'Московская область'] }
                        inputName={ 'city' }
                        onChange={ handleChange }
                        customClass='card-input'
                        customLabel='card-label'
                        classNameInput='long-select'
                        placeholder='Не выбрано'
                    />
                    <SelectInput
                        label='Возможна отправка в другой город?'
                        propValue={ puppyParam.isTransportable }
                        items={ ['Да', 'Нет'] }
                        inputName={ 'isTransportable' }
                        onChange={ e => handleChange(e) }
                        customClass='card-input'
                        customLabel='card-label'
                        classNameInput='long-select'
                        placeholder='Не выбрано'
                    />
                    <TextArea
                        label="Описание"
                        rows={ 7 }
                        placeholder='Опишите щенков'
                        fullWidth={ false }
                        classNameLabel='card-label'
                        customClassContainer='textarea-container'
                        className='textarea-input'
                        propValue={ puppyParam.description }
                        inputName={ 'description' }
                        onChange={ handleChange }
                        maxLength={ 1000 }
                        isEditable={ false }
                    />
                    <div className='textarea-limit'><span>До 1000 символов</span><span>{ `${puppyParam.description.length} / 1000` }</span></div>

                    <ImageUploading
                        multiple
                        value={ puppyImg }
                        onChange={ handleFiles }
                        maxNumber={ 5 }
                        dataURLKey="data_url"
                    >
                        { ({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            // write your building UI
                            <div className='photos-wrapper'>
                                <p className='card-label'>Фотографии щенков</p>
                                <div className="upload-container">
                                    <div className='btn-wrpapper'>
                                        <Button
                                            isLink={ false }
                                            btnClass='sec-outlined-btn img-btn'
                                            text='Загрузить фотографии'
                                            type='button'
                                            onClick={ onImageUpload }
                                            { ...dragProps }
                                        />
                                        <span>Выберите до пяти изображений</span>
                                    </div>
                                    <div className="puppy-img-container">
                                        { imageList.length > 0
                                            ? imageList.map((image, index) => (
                                                <div key={ index } className="image-item">
                                                    <img src={ image['data_url'] } alt="puppy" width="100" height="100" />
                                                    <div className="image-item__btn-wrapper">
                                                        <Button
                                                            onClick={ () => onImageUpdate(index) }
                                                            isLink={ false }
                                                            type='button'
                                                            btnClass='hide-button'
                                                        />
                                                        <DeleteButton
                                                            onClick={ () => onImageRemove(index) }
                                                        />

                                                    </div>
                                                </div>
                                            ))
                                            : <ImagesPlaceholder numberOfPhotos={ 5 } />
                                        }
                                    </div>
                                </div>
                            </div>
                        ) }
                    </ImageUploading>

                    <span className='form-divider-line'></span>

                    <TextArea
                        label="Родители щенков"
                        rows={ 7 }
                        placeholder='Опишите родителей щенка'
                        fullWidth={ false }
                        classNameLabel='card-label'
                        customClassContainer='textarea-container'
                        className='textarea-input'
                        propValue={ puppyParam.parentsDesc }
                        inputName={ 'parentsDesc' }
                        onChange={ handleChange }
                        maxLength={ 500 }
                        isEditable={ false }
                    />
                    <div className='textarea-limit'><span>До 500 символов</span><span>{ `${puppyParam.parentsDesc.length} / 500` }</span></div>

                    <ImageUploading
                        multiple
                        value={ parentsImg }
                        onChange={ handleParentsFiles }
                        maxNumber={ 2 }
                        dataURLKey="data_url"
                    >
                        { ({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            // write your building UI
                            <div className='photos-wrapper'>
                                <p className='card-label'>Фотографии родителей</p>
                                <div className="upload-container">
                                    <div className='btn-wrpapper'>
                                        <Button
                                            isLink={ false }
                                            btnClass='sec-outlined-btn img-btn'
                                            text='Загрузить фотографии'
                                            type='button'
                                            onClick={ onImageUpload }
                                            { ...dragProps }
                                        />
                                        <span>Выберите до двух изображений</span>
                                    </div>
                                    <div className="puppy-img-container">
                                        { imageList.length > 0
                                            ? imageList.map((image, index) => (
                                                <div key={ index } className="image-item">
                                                    <img src={ image['data_url'] } alt="puppy" width="100" height="100" />
                                                    <div className="image-item__btn-wrapper">
                                                        <Button
                                                            onClick={ () => onImageUpdate(index) }
                                                            isLink={ false }
                                                            type='button'
                                                            btnClass='hide-button'
                                                        />
                                                        <DeleteButton
                                                            onClick={ () => onImageRemove(index) }
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                            : <ImagesPlaceholder numberOfPhotos={ 2 } />
                                        }
                                    </div>
                                </div>
                            </div>
                        ) }
                    </ImageUploading>

                    <Button
                        isLink={ false }
                        type='submit'
                        btnClass='pr-filled-btn add-form-submit-btn'
                        text='Опубликовать'
                    />
                </form>
            </div>
        </>
    )
}

export default AdForm;