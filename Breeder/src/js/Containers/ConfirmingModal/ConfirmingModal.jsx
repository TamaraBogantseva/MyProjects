import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Button from '../../Components/UI/button/Button';
import styled from 'styled-components';

import './ConfirmingModal.scss'

const StyledDialog = styled(Dialog)`
& .MuiDialog-paperWidthSm {
    max-width: 380px;
    min-width: 260px;
}
        
`

function ConfirmingModal(props) {
    const { onClose, open, id, path, modalClass, handleSuccess, isLink } = props;
    
    const handleDeleteClick = async (e) => {
        try {
            await fetch(`api/v1/broods/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset="utf-8"'
                }
            })
                .then(res => {
                    if (res.ok) {
                        handleSuccess(true, true);
                    } else {
                        handleSuccess(true, false);
                    }
                })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    return (
        <StyledDialog onClose={ onClose } aria-labelledby="simple-dialog-title" open={ open }>
            <div className={ `modal-respond ${modalClass}` } >
                <div className="modal-respond__header">
                    <h3 className="modal-respond__title">Вы уверены?</h3>
                    <button className="modal-respond__close modal-respond__cross" onClick={ onClose }>
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 17L17 28M28 28L17 17L28 28Z" stroke="#1A1A1B" />
                        </svg>
                    </button>
                </div>
                {/* <img className="modal-respond__image" src="./img/background_modal.png" alt="boy with cat" width="360" height="225" /> */}
                {/* <p className="modal-respond__text">{ text }</p> */}
                <div className="btns-container">
                    <Button
                        btnClass='sec-filled-btn modal-button'
                        text='Да'
                        isLink={ isLink }
                        path={ path }
                        type='button'
                        onClick={ handleDeleteClick }
                    />
                    <Button
                        btnClass='sec-filled-btn modal-button'
                        text='Нет'
                        isLink={ isLink }
                        path={ path }
                        type='button'
                        onClick={ onClose }
                    />
                </div>

            </div>
        </StyledDialog>
    );
}

ConfirmingModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default ConfirmingModal;

