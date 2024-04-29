import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import { useDispatch } from "react-redux";
import lightBulbImg from "src/assets/light-bulb.svg";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "src/pages/AccountSetup3/AccountSetup3.module.css";

const AccountSetup3 = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  function isLargeWindow() {
    return window.innerWidth >= 768;
  }

  const handleResize = () => {

    if (isLargeWindow() && location.pathname !== "/dashboard") {
      window.removeEventListener("resize", handleResize);
      navigate("/dashboard/new");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  return (<div className={`${styles.container}`}>
    <div className={`${styles.content}`}>
      <img src={lightBulbImg} alt="Light Bulb" />
      <div className={`${styles.contentTitle}`}>
        {t("Your account is all set up.")}
      </div>
      <div className={`${styles.contentMessage}`}>
        {t("Thank you for participating in this beta release. If you find a glitch, get lost in something you find confusing, or have general ideas please provide feedback through digitalresearch@SBA.gov.")}
      </div>
    </div>
    <div className={`${styles.footer}`}>
      <button
        type="button"
        className={`usa-button ${styles.footerBtn}`}
        onClick={() => {
          window.removeEventListener("resize", handleResize);
          dispatch(setNav(true));
          dispatch(setShowProfile(true));
          navigate("/dashboard");
        }}
      >
        {t("All Done")}
      </button>
    </div>
  </div>);
};

export default AccountSetup3;
