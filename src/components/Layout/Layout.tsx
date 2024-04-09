import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "src/components/Header/Header";
import SideNav from "src/components/SideNav/SideNav";
import styles from "src/components/Layout/Layout.module.css";
import { getShowNav } from "src/store/showNav/showNavSlice";
import { learningCenterCoursesByPath } from "src/utils/learningCenterCourses";
import LearningCenterCard from "src/components/LearningCenterCard/LearningCenterCard";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const showNav: boolean = useSelector(getShowNav);
  const location = useLocation();
  const [scrollAreaClass, setScrollAreaClass] = useState<any>("");
  const [courses, setCourses] = useState<any[]>([]);
  const { t } = useTranslation();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const [mainContentHeight, setMainContentHeight] = useState("100vh");

  useEffect(() => {
    setCourses(learningCenterCoursesByPath[location.pathname] ?? []);

    if (location.pathname === "/dashboard") {
      setScrollAreaClass(window.location.pathname === "/dashboard" ? `${styles["resource-location__scroll-area"]}` : "");
      let headerElement = headerRef.current;
      let mainContentElement = mainContentRef.current;
      if (mainContentElement && headerElement) {
        let headerHeight = headerElement.offsetHeight;
        if (mainContentElement.offsetHeight + headerHeight > window.innerHeight) {
          setMainContentHeight(`${mainContentElement.offsetHeight}px`);
        } else {
          setMainContentHeight(`${window.innerHeight - headerHeight}px`)
        }
      }
    }
  }, [location]);

  function handleNavLinkClick() {
    // Layout Ignores this
  }

  return (<>
      <div className="grid-row" id="header__container" ref={headerRef}>
        <div className="grid-col">
          <Header />
        </div>
      </div>
      <div className="grid-row">
        {showNav && (<div className={`grid-col-auto ${styles["side-nav"]}`}>
            <SideNav onNavLinkClick={handleNavLinkClick} />
          </div>)}
        <main id="main-content" className="grid-col" ref={mainContentRef}>
          <Outlet />
        </main>
        {showNav && (courses.length > 0) && (<div className={`grid-col-auto ${styles["resources-for-you-right"]}`}>
            <div className={scrollAreaClass} style={{ height: `${mainContentHeight}` }}>
              <h1 className={`${styles["resource-location__title"]}`}>
                {t("Resources for you")}
              </h1>
              <div className={`${styles["resource-location__cards"]}`}>
                {courses.map((course, index) => (<LearningCenterCard key={index} learningCenter={course} />))}
              </div>
            </div>
          </div>)}
      </div>
      {showNav && (courses.length > 0) && (<div className={`grid-col-row ${styles["resources-for-you-bottom"]}`}>
          <div className="grid-col">
            <div className={`${styles["resource-location__title-bottom-container"]}`}>
              <h1 className={`${styles["resource-location__title-bottom"]}`}>
                {t("Resources for you")}
              </h1>
            </div>
            <div className={`${styles["resource-location__cards"]}`}>
              {courses.map((course, index) => (<LearningCenterCard key={index} learningCenter={course} />))}
            </div>
          </div>
        </div>)}
    </>);
};

export default Layout;
