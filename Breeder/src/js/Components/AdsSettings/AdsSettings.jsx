import React from 'react'
import AdCard from '../AdCard/AdCard'
import './AdsSettings.scss'

function AdsSettings({ user, isKennel, getUser }) {

    return (
        <div className="acc-settings__profile">
            <h3 className="profile__heading">
                Мои объявления
            </h3>

            <div className="broods-container">
                { user.broods.map((brood) => {
                    return (
                        <AdCard
                            key={ `broodCard${Math.random()}` }
                            brood={ brood }
                            broodClass="userads_brood-card"
                            isKennel={ isKennel }
                            isDeletePosssible={ true }
                            getUser={ getUser }
                        />
                    )
                }) }
            </div>

        </div>
    )
}

export default AdsSettings
