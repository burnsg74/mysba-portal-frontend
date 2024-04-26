import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "src/components/SideNav/SideNav.module.css";

type SideNavProps = {
  onNavLinkClick: () => void;
  forMobile: boolean;
};

const SideNav: React.FC<SideNavProps> = ({ onNavLinkClick, forMobile=false }) => {
  const { t } = useTranslation();
  const NAVIGATION_LINKS = [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Businesses",
      url: "/businesses",
    },
    {
      name: "Certifications",
      url: "/certification",
    },
    {
      name: "Loans",
      url: "/loans",
    },
    {
      name: "Help",
      url: "/help",
    },
  ];

  const handleClick = () => {
    onNavLinkClick();
  };


  return (
    <>
      <nav aria-label="Side navigation" className={`${styles.container}`}>
        <a href="#main-content" className={`${styles.skipLink}`}>
          Skip to Main Content
        </a>
        {NAVIGATION_LINKS.map((item) => (
          <Link
            to={item.url}
            key={item.name}
            aria-label={item.name}
            title={item.name}
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
          </Link>
        ))}{" "}
      </nav>
    </>
  );
};

export default SideNav;
