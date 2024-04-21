import React, { useState, useEffect } from "react";
import { getUser } from "src/store/user/userSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setNav } from "src/store/showNav/showNavSlice";
import { useDispatch, useSelector } from "react-redux";
import Iframe from "src/components/iFrame/iFrame";
import styles from "src/pages/LinkLaunchPad/LinkLaunchPad.module.css";

const LinkLaunchPad = () => {
  const user: IUser = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [iframeSize, setIframeSize] = useState({ width: 1164, height: 755 });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newWidth = Math.min(Math.max(windowWidth - 40, 300), 1164); // Min width of 300px, adjust as needed
      let newHeight = (newWidth / 1164) * 755; // Maintain aspect ratio
      if (newHeight < 664) {
        newHeight = 664; // Sets height to minimum if calculated height is less than 664
      }
      setIframeSize({ width: newWidth, height: newHeight });
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBackBtnClick = () => {
    dispatch(setNav(true));
    navigate("/certification");
  };

  return (
    <>
      <div className={` ${styles.mainContainer}`}>
        {/* Launchpad Header */}
        <div className={`banner ${styles.contentHeader}`}>
          <button
            type="button"
            className={`usa-button usa-button--outline ${styles.btnOutline}`}
            onClick={handleBackBtnClick}
          >
            {t("Back")}
          </button>
          <div className={`${styles.textContainer}`}>
            <div className={`${styles.title}`}>{t("Let's link your certification")}</div>
            <div className={`${styles.message}`}>
              {t(
                "You are connecting an existing account to your new MySBA account. Log in below to finish connecting this account."
              )}
            </div>
          </div>
          <button type="button" disabled={true} className={`usa-button ${styles.btnDisabled}`}>
            {t("Continue")}
          </button>
        </div>

        {/* Launchpad iFrame */}
        <div
          className={`${styles.cornerWrapper}`}
          style={{ width: `${iframeSize.width}px`, height: `${iframeSize.height}px` }}
        >
          <Iframe
            url="http://localhost:5173/certification-apply/1"
            width={`${iframeSize.width}px`}
            height={`${iframeSize.height}px`}
            id=""
            className=""
            display="block"
            position="relative"
            sandbox={["allow-scripts", "allow-same-origin"]}
            frameBorder={0}
          />
        </div>
      </div>
    </>
  );
};

export default LinkLaunchPad;
