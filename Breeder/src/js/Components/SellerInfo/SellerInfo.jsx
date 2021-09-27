import React, { useState, useEffect } from 'react';

import AdCardSellerInfo from './AdCardSeller';

import './SellerInfo.scss'

const SellerInfo = ({ id }) => {

    const [sellerInfo, setSellerInfo] = useState(null);
    const [sellerPhoto, setSellerPhoto] = useState("./img/image-placeholder.jpeg");
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetch(`api/v1/kennels/${id}`)
            .then(response => {
                return (
                    response.json()
                )
            })
            .then(data => {
                setSellerInfo(data)
                if (!data.kennel.photo) {
                    setSellerPhoto('./img/image-placeholder.jpeg')
                } else {
                    setSellerPhoto(data.kennel.photo);
                }
            })
            .catch(err => setHasError(true))
    }, []);

    return (
        <div className='seller-info-container'>
            { sellerInfo && <div>
                <h2 className='seller-info-title'>{ sellerInfo.kennel.name }</h2>
                <div className="seller-infoblock">
                    <div className="seller-img-container">
                        <img src={ sellerPhoto } alt="seller avatar" className="seller-avatar" />
                    </div>
                    <div className="sellers-about">
                        <h3 className='seller-info-subtitle'>Породы в питомнике</h3>
                        <ul className="params-list">
                            { sellerInfo.kennel.breeds.map((item, i) => {
                                return (
                                    <li key={ i }>{ item.replace(/['"]+/g, '') }</li>
                                )
                            }) }
                        </ul>
                    </div>
                    <div className="sellers-about">
                        <h3 className='seller-info-subtitle'>Владелец</h3>
                        <ul className="params-list">
                            <li>{ sellerInfo.kennel.name }</li>
                            <li>{ sellerInfo.kennel.phone }</li>
                            <li>{ sellerInfo.kennel.email }</li>
                        </ul>
                    </div>
                </div>
                {sellerInfo.kennel.description.length !== 0 &&<div className="description-block">
                    <h3 className='seller-info-subtitle'>Описание питомника</h3>
                    <p className="seller-description">
                        { sellerInfo.kennel.description }
                    </p>
                </div>}
                <div className="seller-ads-block">
                    <h3 className='seller-info-subtitle'>Объявления питомника</h3>
                    <div className="broods-container">
                        { sellerInfo.broods.map((broodCard, i) => {
                            return (
                                <AdCardSellerInfo
                                    brood={ broodCard }
                                    key={ i }
                                    broodClass="alladspage_brood-card"

                                />
                            )
                        }) }
                    </div>
                </div>

            </div> }

        </div>
    )
}

export default SellerInfo;