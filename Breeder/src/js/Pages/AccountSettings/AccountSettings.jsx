import React,  {useState, useEffect} from 'react'
import SettingsSidebar from '../../Components/SettingsSidebar/SettingsSidebar'
import Footer from '../../Containers/Footer/Footer'
import SettingsContainer from '../../Containers/SettingsContainer/SettingsContainer'
import '../../../scss/App.scss'
import './AccountSettings.scss'
import Header from '../../Containers/Header/Header'

function AccountSettings({isAuth, isMain}) {

    const [block, setBlock] = useState('profile');
    const [userInfo, setUserInfo] = useState({
        broods: [
          {
            city: 'Не выбрано',
            date_of_birth: '',
            description: 'Опишите щенков',
            documents: 'Не выбрано',
            is_transportable: 'Не выбрано',
            parents: {
                desc: "Опишите родителей щенков",
                photos: null
            },
            photos: null,
            price: 'Введите стоимость щенка',
            sex_female: 0,
            sex_male: 0
        }
    ],
    email: 'Email',
    kennel: {
        description: 'Кратко расскажите о питомнике, историю его основания, питомцах и достижениях.',
        email: 'Email',
        name: '',
        phone: '',
        photo: ''
    },
    name: '',
    phone: '',
});

    const getUser = (async () => {
        try {
            await fetch("/api/v1/user")
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setUserInfo(data);
                })
        } catch (error) {
            console.error('Error:', error);
        }
    })

    useEffect(() => {
        
        getUser();
    }, []);

    const updateUserInfo = (name, value) => {
        setUserInfo({...userInfo, [name]: value});
    }

    const toggleBlock = (value) => {
        setBlock(value);
    }

    return (
        <>
            <Header isMain={isMain} isAuth={isAuth} />
            <main className="main container acc-settings_container">
                <h1 className="acc-settings__heading">Личный кабинет</h1>
                <div className="acc-settings_wrapper">
                    <SettingsSidebar toggleBlock={toggleBlock} />
                    <SettingsContainer getUser={getUser} updateUserInfo={updateUserInfo} user={userInfo} block={block} />
                </div>
            </main>
        </>
    )
}

export default AccountSettings
