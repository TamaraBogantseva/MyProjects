import React from 'react';
import './Footer.scss';

function Footer() {
    return (
        <footer className="footer" id="contacts">
            <div className="footer__container container">
                <div className="footer__logo">
                    <h2 className="footer__title"><i className="fas logo fa-paw"></i>Breeder</h2>
                </div>
                <div className="footer__contacts">
                    <div className="footer__contacts"><a href="tel:+79257000336">+7
                        925 700 03 36</a></div>
                    <div><a href="mailto:breederas@gmail.com">
                        breederas@gmail.com</a></div>
                </div>
                <div className="footer__legal">
                    <p className="footer__legal_copyright">&copy; 2021 Все права защищены </p>
                    <p className="footer__legal_info">Сайт breederas.ru является информационным ресурсом</p>
                    <a href='./documents/Политика конфиденциальности Breeder.pdf' className='pd-agreement-link footer__legal_pd-link' download> Согласие на обработку персональных данных </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
