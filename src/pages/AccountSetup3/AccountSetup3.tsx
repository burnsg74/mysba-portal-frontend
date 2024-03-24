import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { setNav } from "src/store/showNav/showNavSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "src/store/user/userSlice";
import lightBulbImg from "src/assets/lightbulb.png";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "src/pages/AccountSetup3/AccountSetup3.module.css";

const AccountSetup3 = () => {
  const dispatch = useDispatch();
  const location = useLocation()
  const { t } = useTranslation();
  const user: IUser = useSelector(getUser);
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
    return
  }, []);

  return (
    <>
      <div className={`${styles["container"]}`}>
        <div className={`${styles["content"]}`}>
          <img src={lightBulbImg} alt="Light Bulb" />
          <div className={`${styles["content__title"]}`}>
            {t("Your account is all set up.")}
          </div>
          <div className={`${styles["content__message"]}`}>
            {t(
              "Thank you for participating in this beta release. If you find a glitch, get lost in something you find confusing, or have general ideas please provide feedback through digitalresearch@SBA.gov."
            )}
          </div>
        </div>
        <div className={`${styles["footer"]}`}>
          <button
            type="button"
            className={`usa-button ${styles["footer-btn"]}`}
            onClick={() => {
              window.removeEventListener("resize", handleResize);
              dispatch(setNav(true));
              navigate("/dashboard");
            }}
          >
            {t("All Done")}
          </button>
        </div>
      </div>
    </>
  );
};

export default AccountSetup3;
