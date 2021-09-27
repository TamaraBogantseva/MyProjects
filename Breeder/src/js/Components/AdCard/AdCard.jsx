import React, { useState } from 'react';
import AddAdModal from '../../Containers/AddAdContainer/AddAdContainer';
import SubmittingModal from '../../Containers/SubmittingModal/SubmittingModal';
import ConfirmingModal from '../../Containers/ConfirmingModal/ConfirmingModal';
import AdModalCard from '../AdModal/AdModalCard';

import './AdCard.scss';

function AdCard({ brood, broodClass, isKennel, isDeletePosssible, getUser }) {

    const { breed, photos, city, date_of_birth, documents } = brood;


    const handleClick = (e) => {
        if (e.target.name === 'delete') {

            e.stopImmediatePropagation();
        } else {
            return (
                <AddAdModal
                    text=""
                    btnClass={ `brood-card__btn brood-card__btn_text` }
                    title={ breed }
                    dividers={ false }
                    content={ <AdModalCard
                        brood={ brood }
                        isKennel={ isKennel }
                    /> }
                />
            )
        }
    }

    // const handleChangeFontSize = () => {
    //     console.log(breed);
    //     if (breed.length > 15 && breed.length < 30) {
    //         return '12px';
    //     } else if (breed.name.length >= 30) {
    //         return '16px';
    //     } else {
    //         return '18px';
    //     }
    // };

    // style={ { fontSize: handleChangeFontSize() }}

    // const handleDeleteClick = async (e) => {
    //     try {
    //         await fetch(`api/v1/broods/${brood.id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json; charset="utf-8"'
    //             }
    //         })
    //             .then(res => {
    //                 if (res.ok) {
    //                     setmodalOpen(true);
    //                     // setModalAnswerOpen(true);
    //                     setIsSuccess(true);
    //                 } else {
    //                     setmodalOpen(true);
    //                     // setModalAnswerOpen(true);
    //                     setIsSuccess(false);
    //                 }
    //             })
    //     } catch (error) {
    //         console.error('Ошибка:', error);
    //     }
    // }

    const handleModalConfirm = (isOpen, isSuccessful) => {
        setTimeout(() => getUser(), 3000);
        setModalAnswerOpen(isOpen);
        setIsSuccess(isSuccessful);
    }

    const [modalOpen, setmodalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [modalAnswerOpen, setModalAnswerOpen] = useState(false);


    const handleClose = () => {
        setmodalOpen(false);
        console.log('modal close');
    };

    const handleOpen = (e) => {
        setmodalOpen(true)
        console.log('modal open');
    }


    return (
        <>
            <SubmittingModal open={ modalAnswerOpen } onClose={ handleClose } title={ isSuccess ? 'Объявление удалено.' : 'Упс! Что-то пошло не так' } text={ isSuccess ? '' : 'Попробуйте еще раз' } path='/' isSubmit={ false } />
            <ConfirmingModal open={ modalOpen } onClose={ handleClose } handleSuccess={ handleModalConfirm } modalClass='modal-small' id={ brood.id } path='/' />

            <div className={ `brood-card ${broodClass}` }>
                { isDeletePosssible && <button onClick={ (e) => handleOpen() } name="delete" className="brood_delete" >
                    <i className="fas edit-icon fa-times"></i>
                </button> }

                <div className="brood-card__img-container">
                    <img className="brood-card__img" alt={ breed } src={ photos === null || photos.length === 0 ? "./img/image-placeholder.jpg" : photos[0] } />
                </div>

                <div className="brood-card__info">
                    <h5 className="brood-card__name" >{ breed }</h5>

                    <p className="brood-card__city">{ city }</p>
                    <p className="brood-card__date-of-birth">{ new Date(date_of_birth).toLocaleDateString() }</p>
                    {/* { documents ? (
                        <span className="documents-true">Питомник подтвержден</span>
                    ) : ( */}
                    <span className="kennel-approve">Питомник не подтвержден</span>
                    {/* ) } */ }

                    <AddAdModal
                        text="Подробнее"
                        btnClass={ `brood-card__btn brood-card__btn_text` }
                        title={ breed }
                        dividers={ false }
                        isMobile={ false }
                        content={ <AdModalCard
                            brood={ brood }
                        /> }
                    />
                </div>
            </div>

            <AddAdModal
                isMobile={ true }
                mobileBlock={
                    <>
                    <SubmittingModal open={ modalAnswerOpen } onClose={ handleClose } title={ isSuccess ? 'Объявление удалено.' : 'Упс! Что-то пошло не так' } text={ isSuccess ? '' : 'Попробуйте еще раз' } path='/' isSubmit={ false } />
                    <ConfirmingModal open={ modalOpen } onClose={ handleClose } handleSuccess={ handleModalConfirm } modalClass='modal-small' id={ brood.id } path='/' />

                    <div className={ `brood-card ${broodClass} brood-card-mobile` } onClick={ e => handleClick(e) } >
                        { isDeletePosssible && <button className="brood_delete" name="delete" onClick={ (e) => handleOpen() }>
                            <i className="fas edit-icon fa-times"></i>
                        </button> }

                        <div className="brood-card_mobile_img-block">
                            <div className="brood-card__img-container">
                                <img className="brood-card__img" alt={ breed } src={ photos === null || photos.length === 0 ? "./img/image-placeholder.jpg" : photos[0] } />
                            </div>

                            <div className="brood-card__info-mobile-block">
                                { documents ? (
                                    <span className="documents">С документами</span>
                                ) : (
                                    <span className="documents">Без документов</span>
                                ) }

                            </div>
                        </div>

                        <div className="brood-card__info">
                            <h5 className="brood-card__name">{ breed }</h5>

                            <p className="brood-card__city">{ city }</p>
                            <p className="brood-card__date-of-birth">{ new Date(date_of_birth).toLocaleDateString() }</p>
                        </div>
                    </div>
                    </>
                }
                btnClass={ `brood-card__btn brood-card__btn_text` }
                title={ breed }
                dividers={ false }
                content={ <AdModalCard
                    brood={ brood }
                /> }
            />


        </>
    )
}

export default AdCard;