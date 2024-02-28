import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import Header from "src/components/Header/Header";
import SideNav from "src/components/SideNav/SideNav";
import styles from "src/components/Layout/Layout.module.css";
import { getShowNav } from "src/store/showNav/showNavSlice";
import {learningCenterCoursesByPath} from "src/utils/learningCenterCourses";
import LearningCenterCard from "src/components/LearningCenterCard/LearningCenterCard";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const showNav: boolean = useSelector(getShowNav);
  const location = useLocation();
  const [scrollAreaClass, setScrollAreaClass] = useState<any>('');
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    setScrollAreaClass(window.location.pathname === "/dashboard" ? `${styles["resource-location__scroll-area"]}` : '');
    setCourses(learningCenterCoursesByPath[location.pathname]??[])
  }, [location]);

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
        {showNav  && (courses.length > 0) && (
          <div className={`grid-col-auto ${styles["resources-for-you-right"]}`}>
            <div className={scrollAreaClass}>
              <div className={`${styles["resource-location__title"]}`}>
                Resources for you
              </div>
              <div className={`${styles["resource-location__cards"]}`}>
                {courses.map((course, index) => (
                  <LearningCenterCard key={index} learningCenter={course} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {showNav && (courses.length > 0) && (
        <div className={`grid-col-row ${styles["resources-for-you-bottom"]}`}>
          <div className="grid-col">
            <div  className={`${styles["resource-location__title-bottom-container"]}`}>
            <div className={`${styles["resource-location__title-bottom"]}`}>
              Resources for you
            </div>
            </div>
            <div className={`${styles["resource-location__cards"]}`}>
              {courses.map((course, index) => (
                <LearningCenterCard key={index} learningCenter={course} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
