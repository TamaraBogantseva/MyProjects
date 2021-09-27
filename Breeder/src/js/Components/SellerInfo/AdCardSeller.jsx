import React, { useCallback } from 'react';
import AddAdModal from '../../Containers/AddAdContainer/AddAdContainer';
import AdModalCard from '../AdModal/AdModalCard';


import '../AdCard/AdCard.scss';
import '../../Containers/AdsContainer/AdsContainer.scss'

function AdCardSellerInfo({ brood, broodClass, isKennel }) {

    const { breed, photos, city, date_of_birth, documents } = brood;


    const handleClick = () => {
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


    return (
        <>
            <div className={ `brood-card ${broodClass}` }>

                <div className="brood-card__img-container">
                    <img className="brood-card__img" alt={ breed } src={ photos.length === 0 || photos === null ? "./img/image-placeholder.jpg" : photos[0] } />
                </div>

                <div className="brood-card__info">
                    <h5 className="brood-card__name" >{ breed }</h5>

                    <p className="brood-card__city">{ city }</p>
                    <p className="brood-card__date-of-birth">{ new Date(date_of_birth).toLocaleDateString() }</p>

                </div>
            </div>

            <AddAdModal
                isMobile={ true }
                mobileBlock={
                    <div className={ `brood-card ${broodClass} brood-card-mobile` } onClick={ handleClick } >

                        <div className="brood-card_mobile_img-block">
                            <div className="brood-card__img-container">
                                <img className="brood-card__img" alt={ breed } src={ photos.length === 0 || photos === null ? "./img/image-placeholder.jpg" : photos[0] } />
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
                }
                btnClass={ `brood-card__btn brood-card__btn_text` }
                title={ breed }
                dividers={ false }
                content={ <div className="brood-card__img-container" style={{margin: '0 auto'}}>
                                <img style={{borderRadius: 10}} className="brood-card__img" alt={ breed } src={ photos.length === 0 ? "./img/image-placeholder.jpg" : photos[0] } />
                            </div> }
            />


        </>
    )
}

export default AdCardSellerInfo;