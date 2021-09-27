import React, { useState } from 'react';
import './AdModalCard.scss';
import Button from '../UI/button/Button';
import SellerInfo from '../SellerInfo/SellerInfo';


function AdModalCard({ brood, isKennel }) {
    // const mainBroodPhoto = brood.photos === null ? './img/image-placeholder.jpg' : brood.photos[0]
    const [mainPhoto, setMainPhoto] = useState(brood.photos[0]);

    const [isSeller, setisSeller] = useState(false)

    return (
        <section className="modal-card__container">
            { !isSeller
                ? <>
                    <div className="info-block_container">

                        <div className="imgs-container">
                            <div className="images-mini__container">
                                { brood.photos.map(photo => {
                                    return (
                                        <div key={ `${brood.id}${Math.random()}` } className="img__container" onClick={ e => setMainPhoto(e.target.getAttribute('src')) }>
                                            <img className="brood__img" alt="" src={ photo } />
                                        </div>
                                    )
                                }) }
                            </div>

                            <div className="image-large_container">
                                <img className="brood__img_main" alt="" src={ mainPhoto } />
                            </div>
                        </div>

                        <div className="info-container">
                            <p className="creation-date">Опубликовано { new Date(brood.creationDate).toLocaleDateString() }</p>
                            <h2 className="kennel-name">{ }</h2>
                            {/* { brood.documents ? (
        <span className="documents-true">Питомник подтвержден</span>
    ) : ( */}
                            <span className="kennel-approve">Питомник не подтвержден</span>
                            {/* ) } */ }

                            <span className='card-divider-line'></span>

                            <p className="breed">{ brood.breed }</p>

                            <div className="sex-container">
                                <div className="sex-text">Пол</div>
                                <div className="male-count">
                                    <i className="fas male-icon fa-mars"></i>
                                    { brood.sex_male }
                                </div>
                                <div className="female-count">
                                    <i className="fas female-icon fa-venus"></i>
                                    { brood.sex_female }
                                </div>
                                <div className="code">Код</div>
                            </div>

                            <div className="date-of-birth_block">
                                <span>Дата рождения</span>
                                <span>{ new Date(brood.date_of_birth).toLocaleDateString() }</span>
                            </div>

                            <span className='card-divider-line'></span>

                            <div className="price_block">
                                <span>Цена</span>
                                <span>{ brood.price } &#8381;</span>
                            </div>

                            { brood.documents ? (
                                <span className="brood-documents" style={ { color: '#4DC880' } }>С документами</span>
                            ) : (
                                <span className="brood-documents" style={ { color: '#FD4447' } }>Без документов</span>
                            ) }

                            <span className='card-divider-line'></span>

                            <div className="city">{ brood.city }</div>

                            { brood.is_transportable ? (
                                <span className="transportable"><span style={ { color: '#4DC880' } }>Возможна</span> отправка в другой город</span>
                            ) : (
                                <span className="transportable">Отправка в другой город <span style={ { color: '#FD4447' } }>невозможна</span></span>
                            ) }

                        </div>
                    </div>

                    {brood.description.length !== 0 && <div className="about-brood_block">
                        <h3 className="about-brood_heading">О помете</h3>
                        <p className="brood-description">
                            { brood.description }
                        </p>
                    </div>}

                    <div className="parents_block">
                        <h3 className="parents_heading">О родителях щенков</h3>

                        <div className="parents_container">
                            {brood.parents.photos !== null && <div className="parents_photos">
                                { brood.parents.photos.map((photo) => {
                                    return (
                                        <div className="parent_photo_container">
                                            <img key={ `parent_photo${Math.random()}` } className="parent_photo" alt="" src={ photo } />
                                        </div>
                                    )
                                }) }
                            </div>}

                            {brood.parents.desc.length !== 0 && <p className="parents-description">
                                { brood.parents.desc }
                            </p>}
                        </div>
                    </div>
                </>
                : <SellerInfo id={ brood.person.id } /> }


            { isKennel
                ? ''
                : <Button
                    btnClass="pr-filled-btn brood-card-btn"
                    isLink={ false }
                    text={ !isSeller ? 'Питомник' : 'К объявлению' }
                    onClick={ () => setisSeller(!isSeller) }
                /> }

        </section>
    )
}

export default AdModalCard
