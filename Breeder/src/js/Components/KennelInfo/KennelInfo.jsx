import React from 'react';
import { useState, useEffect } from 'react';

import AdCard from '../AdCard/AdCard'

import './KennelInfo.scss'

const KennelInfo = () => {
    const [kennelInfo, setkennelInfo] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [kennelPhoto, setKennelPhoto] = useState("./img/image-placeholder.jpg");


    useEffect(() => {
        fetch('api/v1/user')
            .then(response => {
                return (
                    response.json()
                )
            })
            .then(data => {
                setkennelInfo(data)
                if( !data.kennel.photo ) {
                    setKennelPhoto('./img/image-placeholder.jpeg')
                } else {
                    setKennelPhoto(data.kennel.photo);
                }
            })
            .catch(err => setHasError(true))
    }, []);

    return (
        <div className='kennel-info-container container'>
            { kennelInfo && <div>
                <h2 className='kennel-info-title'>{ kennelInfo.kennel.name }</h2>
                <div className="kennel-infoblock">
                  <div className="kennel-img-container">
                    <img src={ kennelPhoto } alt="kennel avatar" className="kennel-avatar" />
                  </div>
                    <div className="kennels-about">
                        <h3 className='kennel-info-subtitle'>Породы в питомнике</h3>
                        <ul className="params-list">
                            { kennelInfo.kennel.breeds.map((item, i) => {
                                return (
                                    <li key={ i }>{ item.replace(/['"]+/g, '') }</li>
                                )
                            }) }
                        </ul>
                    </div>
                    <div className="kennels-about">
                        <h3 className='kennel-info-subtitle'>Владелец</h3>
                        <ul className="params-list">
                            <li>{ kennelInfo.name }</li>
                            <li>{ kennelInfo.phone }</li>
                            <li>{ kennelInfo.email }</li>
                        </ul>
                    </div>
                </div>
                {kennelInfo.kennel.description.length !== 0 && <div className="description-block">
                    <h3 className='kennel-info-subtitle'>Описание питомника</h3>
                    <p className="kennel-description">
                        { kennelInfo.kennel.description }
                    </p>
                </div>
                }
                <div className="kennel-ads-block">
                    <h3 className='kennel-info-subtitle'>Объявления питомника</h3>
                    <div className="broods-container">
                        { kennelInfo.broods.map((broodCard, i) => {
                            return (
                                <AdCard
                                    brood={ broodCard }
                                    key={ i }
                                    broodClass="kennel_brood-card"

                                />
                            )
                        }) }
                    </div>
                </div>

            </div> }

        </div>
    )
}

export default KennelInfo;