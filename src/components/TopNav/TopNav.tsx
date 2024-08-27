import React, { useRef,useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "src/components/TopNav/TopNav.module.css";

type TopNavProps = {
  onNavLinkClick: () => void;
  forMobile: boolean;
};

const TopNav: React.FC<TopNavProps> = ({ onNavLinkClick, forMobile = false }) => {
  const { t } = useTranslation();
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const NAVIGATION_LINKS = [
    {
      name: "Overview",
      url: "/dashboard",
      location: "left",
    },
    {
      name: "Business Details",
      url: "/businesses",
      location: "left",
    },
    {
      name: "Resources",
      url: "/help",
      location: "right",
    },
    {
      name: "Help",
      url: "/help",
      location: "right",
    },
  ];

  useEffect(() => {
    if (window.location.hash === '#main-content') {
      mainContentRef.current?.focus();
    }
  }, []);

  const handleClick = () => {
    onNavLinkClick();
  };

  return (<nav aria-label="Top navigation" className={`${styles.container}`}>
      {/*<a href="#main-content" className={`${styles.skipLink}`}>*/}
      {/*  Skip to Main Content*/}
      {/*</a>*/}
      {/*<main id="main-content" className="grid-col" ref={mainContentRef}>*/}
      {/*  <Outlet />*/}
      {/*</main>*/}
    <div className={`${styles.leftLinks}`}>
      <ul className={`${styles.linkList}`}>
        {NAVIGATION_LINKS.filter(item => item.location === "left").map(item => (
          <li key={item.name} className="usa-nav__submenu-item">
          <Link
          to={item.url}
          key={item.name}
          aria-label={t(item.name)}
          title={t(item.name)}
          onClick={() => handleClick()}
          className={`grid-row ${styles.row} ${window.location.pathname.startsWith(item.url) ? styles.rowActive : ""}`}
          data-testid={`${forMobile ? "mobile-" : "top-"}nav-link-${item.name}`}
        >
            {t(item.name)}
        </Link>
          </li>
            ))}{" "}
      </ul>
    </div>
    <div className={`${styles.rightLinks}`}>
    {NAVIGATION_LINKS.filter(item => item.location === "right").map(item => (<Link
            to={item.url}
            key={item.name}
            aria-label={t(item.name)}
            title={t(item.name)}
            onClick={() => handleClick()}
            className={`grid-row ${styles.row} ${window.location.pathname.startsWith(item.url) ? styles.rowActive : ""}`}
            data-testid={`${forMobile ? "mobile-" : "side-"}nav-link-${item.name}`}
          >
            <div
              className={`grid-col-auto ${styles.colBar} ${window.location.pathname.startsWith(item.url) ? styles.colBarActive : ""}`}
            />
            <div
              className={`grid-col ${styles.colText} ${window.location.pathname.startsWith(item.url) ? styles.colTextActive : ""}`}
            >
              {t(item.name)}
            </div>
          </Link>))}{" "}
      </div>
    </nav>);
};

export default TopNav;
