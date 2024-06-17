import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { setNav } from "src/store/showNav/showNavSlice";
import { useDispatch } from "react-redux";
import styles from "src/pages/LinkLaunchPad/LinkLaunchPad.module.css";
import nextSignImg from "src/assets/next-sign.svg";
import Modal from "src/components/Modal/Modal";

const LinkLaunchPad = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [iframeSize, setIframeSize] = useState({ width: 1055, height: 755 });

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const newWidth = Math.min(Math.max(windowWidth - 40, 300), 1055); // Min width of 300px, adjust as needed
      let newHeight = (newWidth / 1055) * 755; // Maintain aspect ratio
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
    navigate("/certifications");
  };

  const handleContinueBtnClick = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const completeModal = () => {
    dispatch(setNav(true))
    navigate("/certifications")
  }

  const modalFooterContent = (
    <>
      <button
        type="button"
        className={`usa-button usa-button--outline  ${styles.footerBtnOutline}`}
        onClick={closeModal}
      >
        {t("Cancel")}
      </button>
      <button type="button" data-testid="modal1-next" className={`usa-button ${styles.footerBtn}`} onClick={completeModal}>
        {t("All Done")}
      </button>
    </>
  );

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
          <button type="button" className={`usa-button ${styles.footerBtn}`} onClick={handleContinueBtnClick}>
            {t("Continue")}
          </button>
        </div>

        {/* Launchpad iFrame */}
        <div
          className={`${styles.cornerWrapper}`}
          style={{ width: `${iframeSize.width}px`, height: `${iframeSize.height}px` }}
        >
          <div className={`${styles.tbd}`}><h1>TBD</h1></div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title=""
          onClose={closeModal}
          prevModal={closeModal}
          ImageAndAlt={{ image: nextSignImg, alt: "Next Sign" }}
          contentTitle={t("Success")}
          contentMessage={t("Your linkage was successful")}
          footerContent={modalFooterContent}
        />
      )}
    </>
  );
};

export default LinkLaunchPad;
