import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from 'src/components/Header/Header';
import styles from 'src/components/Layout/Layout.module.css';
import { getShowNav } from 'src/store/showNav/showNavSlice';
import TopNav from 'src/components/TopNav/TopNav';

const Layout = () => {
  const showNav: boolean = useSelector(getShowNav);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const mainContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className="grid-row" id="header__container" ref={headerRef}>
        <div className={`grid-col`}>
          <Header />
        </div>
      </div>
      {showNav && <TopNav />}
      <div className={`grid-row ${styles.contentRow}`}>
        <main id="main-content" className="grid-col" ref={mainContentRef}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
