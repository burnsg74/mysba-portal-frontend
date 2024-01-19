import React from 'react';
import Header from 'src/components/Header/Header';
import SideNav from 'src/components/SideNav/SideNav';
import 'src/components/Layout/Layout.css';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children })  => {
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
                    {children}
                </main>
            </div>
        </>
    )
};

export default Layout;