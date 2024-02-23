import React from "react";
import { useSelector } from "react-redux";
import Header from "src/components/Header/Header";
import SideNav from "src/components/SideNav/SideNav";
import styles from "src/components/Layout/Layout.module.css";
import { getShowNav } from "src/store/showNav/showNavSlice";
import ResourcesForYou from "src/components/ResourcesForYou/ResourcesForYou";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const showNav: boolean = useSelector(getShowNav);

  const scrollAreaClass =
    window.location.pathname === "/dashboard" ? `${styles["resource-location__scroll-area"]}` : "";

  console.log("scrollAreaClass", window.location.pathname , scrollAreaClass);

  return (
    <>
      <div className="grid-row">
        <div className="grid-col">
          <Header />
        </div>
      </div>
      <div className="grid-row">
        {showNav && (
          <div className={`grid-col-auto ${styles["side-nav"]}`}>
            <SideNav />
          </div>
        )}
        <main className="grid-col">
          {children}
        </main>
        {showNav && (
          <div className={`grid-col-auto ${styles["resources-for-you-right"]}`}>
            <div className={scrollAreaClass}>
            <ResourcesForYou />
            </div>
          </div>
        )}
      </div>
      {showNav && (
        <div className={`grid-col-row ${styles["resources-for-you-bottom"]}`}>
          <div className="grid-col">
            <ResourcesForYou />
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
