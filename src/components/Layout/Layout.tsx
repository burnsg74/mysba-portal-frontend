import React from 'react';
import Header from 'src/components/Header/Header';
import SideNav from 'src/components/SideNav/SideNav';
import {Outlet} from "react-router-dom";
import 'src/components/Layout/Layout.css';

const Layout = () => {
    return (
        <>
            <div className="grid-row">
                <div className="grid-col">
                    <Header/>
                </div>
            </div>
            <div className="grid-row">
                <div className="grid-col-auto side-nav">
                    <SideNav/>
                </div>
                <main className="grid-col main-content">
                    <Outlet/>
                </main>
            </div>
        </>
    )
};

export default Layout;