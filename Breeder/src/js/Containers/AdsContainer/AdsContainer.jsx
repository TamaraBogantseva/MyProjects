import React, { useEffect, useState } from 'react'
import AdCard from '../../Components/AdCard/AdCard';
import './AdsContainer.scss';
import '../../Components/AdCard/AdCard.scss';


function AdsContainer() {

    const [broods, setBroods] = useState({
        broods: []
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const getBroods = async () => {
            try {
                await fetch("/api/v1/broods")
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        setBroods(data);
                        setLoaded(true);
                    })
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getBroods();
    }, [])

    return (
        <section className="broods__container">
            { loaded &&
                broods.map(brood => {
                    return <AdCard key={ brood.id } brood={ brood } broodClass="alladspage_brood-card" />
                }) }
        </section>
    )
}

export default AdsContainer