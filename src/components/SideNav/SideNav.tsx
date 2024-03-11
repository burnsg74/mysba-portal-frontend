import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "src/components/SideNav/SideNav.module.css";

const SideNav = () => {
  const { t } = useTranslation();
  const NAVIGATION_LINKS = [
    {
      "name": "Dashboard",
      "url": "/dashboard",
    },
    {
      "name": "Businesses",
      "url": "/businesses",
    },
    {
      "name": "Certifications",
      "url": "/certification",
    },
    {
      "name": "Loans",
      "url": "/loans",
    },
    {
      "name": "Help",
      "url": "/help",
    },
  ];
  return (
    <>
      <nav aria-label="Side navigation" className={`${styles["container"]}`}> {NAVIGATION_LINKS.map((item, index) =>
        <Link to={item.url} key={index} aria-label={item.name} title={item.name}
              className={`grid-row ${styles["row"]} ${window.location.pathname.startsWith(item.url) ? styles["row__active"] : ""}`}>
          <div
            className={`grid-col-auto ${styles["col__bar"]} ${window.location.pathname.startsWith(item.url) ? styles["col__bar-active"] : ""}`} />
          <div
            className={`grid-col ${styles["col__text"]} ${window.location.pathname.startsWith(item.url) ? styles["col__text-active"] : ""}`}>{t(item.name)}</div>
        </Link>)} </nav>
    </>
  );
};

export default SideNav;
