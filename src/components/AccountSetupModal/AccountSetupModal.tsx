import React, { useEffect, useState } from "react";
import styles from "src/components/AccountSetupModal/AccountSetupModal.module.css";
import { useTranslation } from "react-i18next";
import lightBulbImg from "src/assets/lightbulb.png";
import Header from "src/components/Header/Header"

interface AccountSetupModalProps {
  showModal?: boolean;
}

const AccountSetupModal: React.FC<AccountSetupModalProps> = ({
  showModal = false,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(showModal);
  const [isVisible, setIsVisible] = useState(window.innerWidth > 760);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 760); 
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setModalOpen(showModal);
  }, [showModal]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      setModalOpen(false);
    }
  };

  return (
    <>
      {modalOpen && (
        <>
          <div className={`${styles["overlay"]}`} />
          <div className={`${styles["container"]}`}>
            <div className={`grid-row ${styles["mobile-only"]}`}>
              <div className="grid-col">
                <Header />
              </div>
            </div>
            <div className={`${styles["header"]} ${styles["desktop-only"]}`}>
              <span
                className={`${styles["header__close"]}`}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label="Close modal"
                onClick={() => setModalOpen(false)}
              >
                {t("Close")}
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  width="24"
                  height="24"
                  style={{ fill: "#71767A" }}
                >
                  <use xlinkHref="/assets/img/sprite.svg#close"></use>
                </svg>
              </span>
            </div>
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
                onClick={() => setModalOpen(false)}
              >
                {t("All Done")}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AccountSetupModal;
