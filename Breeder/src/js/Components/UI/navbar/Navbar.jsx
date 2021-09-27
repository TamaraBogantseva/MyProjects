import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AddAdModal from '../../../Containers/AddAdContainer/AddAdContainer';
import AdForm from '../../AdForm/AdForm';
import Button from '../button/Button';
import AuthNavbarPart from './AuthNavbarPart';
import './Navbar.scss';


function Navbar({ type, isAuth, toggleAuth, isMain }) {

    const [active, setActive] = useState(false);

    return (
        <div className="navbar-container">
            <nav className="container navigation">
                    <Link className="logo_link" to="/">
                        <p className="logo_link_text"><i className="fas logo fa-paw"></i> Breeder</p>
                    </Link>
                <div className="navigation-mobile cl-effect-4">
                    <ul className={active ? 'navigation__container active' : 'navigation__container'}>
                        {isMain && <li className="navigation__list">
                                <a className="navigation__link" href="#about">О платформе</a>
                            </li>
                        }
                       
                        <li className="navigation__list">
                            <Link className="navigation__link" to="/broods">
                                Щенки
                            </Link>
                        </li>
                        <li className="navigation__list navigation__list_button">
                            <button className="navigation__link navigation__link_contacts">Контакты</button>
                            <div className="navigation__link_contacts-submenu">
                                <a href="tel:+79257000336"><i className="fas contacts-icon fa-phone"></i> +7
                                    925 700 03 36</a>
                                <a href="mailto:breederas@gmail.com"><i className="far fa-envelope contacts-icon"></i>
                                    breederas@gmail.com</a>
                            </div>
                        </li>
                        { isAuth
                            ? <li className="navigation__list auth-ui">
                                <AddAdModal 
                                    text="Добавить объявление"
                                    btnClass={`button pr-outlined-btn add-brood-card-btn`}
                                    title="Создать объявление"
                                    content={<AdForm />}
                                    dividers={true}
                                    isMobile={false}
                                />
                              </li>
                            : (<li className="navigation__list">
                                { type === undefined
                                    ? <div>
                                        <Button
                                            btnClass="btn-signup button pr-filled-btn"
                                            path="/signup"
                                            text="Регистрация"
                                            isLink={ true }
                                        />
                                        <Button
                                            btnClass="btn-login button pr-outlined-btn"
                                            path="/signin"
                                            text="Войти"
                                            isLink={ true }
                                        />
                                    </div>
                                    : type === 'login'
                                        ? <Button
                                            btnClass={ `btn-signup button btn-form pr-outlined-btn` }
                                            path="/signup"
                                            text="Регистрация"
                                            isLink={ true }
                                        />
                                        : <Button
                                            btnClass={ `btn-login button btn-form pr-outlined-btn` }
                                            path="/signin"
                                            text="Войти"
                                            isLink={ true }
                                        />
                                }
                            </li>
                            )
                        }
                    </ul>

                    <div className={active ? 'navigation__hamburger active' : 'navigation__hamburger'} onClick={() => setActive(!active)}>
                        <span className="navigation__hamburger_bar"></span>
                        <span className="navigation__hamburger_bar"></span>
                        <span className="navigation__hamburger_bar"></span>
                    </div>
                </div>
                <div className={active ? 'overlay active' : 'overlay'} id="overlay-hamburger"></div>
                { isAuth && <AuthNavbarPart isAuth={ isAuth } toggleAuth={ toggleAuth } />}
            </nav>
        </div>
    )
}

export default Navbar;
