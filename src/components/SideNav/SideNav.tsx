import React from 'react';
import {Link} from "react-router-dom";
import './SideNav.css'
const SideNav = () => {
    const NAVIGATION_LINKS = [
        {
            "name": "Dashboard",
            "url": "/dashboard"
        },
        {
            "name": "Businesses",
            "url": "/businesses"
        },
        {
            "name": "Certifications",
            "url": "/certifications"
        },
        {
            "name": "Loans",
            "url": "/loans"
        },
        {
            "name": "Help",
            "url": "/help"
        }
    ];
    return (
        <>
            <nav className="" aria-label="Side navigation">
                <ul className="usa-sidenav">
                    {NAVIGATION_LINKS.map((item, index) =>
                        <li key={index}
                            className={`usa-sidenav__item ${item.url === window.location.pathname ? 'usa-current' : ''}`}>
                            <Link to={item.url}  className="side-nav-link" >{item.name}</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
};

export default SideNav;
