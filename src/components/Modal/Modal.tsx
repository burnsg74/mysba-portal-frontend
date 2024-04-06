import React, { useEffect, useState } from "react";
import styles from "src/components/Modal/Modal.module.css";
import { useTranslation } from "react-i18next";

interface ModalProps {
  onClose: () => void;
  showModal?: boolean;
  isStepIndicator?: boolean;
  totalSteps?: number;
  completedSteps?: number;
  title: string;
  iconImage?:string
  imgAlt?:string
  contentTitle: string;
  contentMessage?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const ModalComponent = ({
  onClose,
  title,
  showModal = true,
  isStepIndicator,
  totalSteps = 0,
  completedSteps = 0,
  iconImage,
  imgAlt,
  contentTitle,
  contentMessage,
  children,
  footerContent,
}: ModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(showModal);
  const { t } = useTranslation();
  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const closeModal = () => {
    if (onClose) onClose(); // Execute the onClose callback if provided
    setIsModalOpen(false); // Close the modal
  };

  const stepsArray = Array.from({ length: totalSteps }, (_, index) => index < completedSteps);

  return (
    <>
      {isModalOpen && (
        <div className={`${styles["overlay"]}`}>
          <div className={`${styles["container"]}`}>
            <div className={`${styles["header"]}`}>
              <span className={`${styles["header__title"]}`}>{t(title)}</span>
              <span className={`${styles["header__close"]}`} onClick={closeModal} role="button">
                {" "}
                {t("Close")}
                <svg aria-hidden="true" focusable="false" role="img" width="24" height="24" style={{ fill: "#71767A" }}>
                  <use xlinkHref="/assets/img/sprite.svg#close"></use>
                </svg>
              </span>
            </div>
            {isStepIndicator && (
              <div className={`${styles.stepIndicatorContainer}`}>
                <div
                  className={`usa-step-indicator usa-step-indicator--no-labels ${styles.customStepIndicator}`}
                  aria-label="progress"
                >
                  <ol className={`usa-step-indicator__segments ${styles["usa-step-indicator__segments"]}`}>
                    {stepsArray.map((isComplete, index) => (
                      <li
                        key={index}
                        className={`usa-step-indicator__segment ${isComplete ? styles["usa-step-indicator__segment--complete"] : styles["usa-step-indicator__segment--incomplete"]}`}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            )}
            <div className={`${styles["content"]}`}>
              {iconImage && (<img src={iconImage} alt={imgAlt}  />)}
              {contentTitle && (<div className={`${styles["content-title"]}`}>{t(contentTitle)}</div>)}
              {contentMessage && (<div className={`${styles["content-message"]}`}>{t(contentMessage)}</div>)}
              {children} 
            </div>
            {footerContent && (
              <div className={`${styles["footer"]}`}>
                {footerContent}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
