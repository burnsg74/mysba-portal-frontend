import React from 'react';
import {Link} from "react-router-dom";
import {useOktaAuth} from '@okta/okta-react';
import SBAlogo from 'src/assets/logo.png';
import './Header.css';

const Header = () => {
    const {oktaAuth} = useOktaAuth();

    const logout = async () => {
        await oktaAuth.signOut();
    };
    return (
        <>
            <header className="usa-header usa-header--basic">
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <img className="usa-logo" src={SBAlogo} alt="Logo"/>
                        <button type="button" className="usa-menu-btn">Menu</button>
                    </div>
                    <nav role="navigation" className="usa-nav">
                        <div className="usa-nav__inner">
                            <ul className="usa-nav__primary usa-accordion">
                                <li className="usa-nav__primary-item">
                                    <button className="usa-accordion__button usa-nav__link" aria-expanded="false"
                                            aria-controls="basic-nav-section-one"><span>Profile</span></button>
                                    <div id="basic-nav-section-one" className="usa-nav__submenu" hidden>
                                        <ul className="usa-nav__submenu-list">
                                            <li className="usa-nav__submenu-item">
                                                <Link to='/profile'>Profile</Link>
                                            </li>
                                            <li className="usa-nav__submenu-item">
                                                <a onClick={logout}>Logout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};
export default Header;