import React, { useEffect, useState } from "react";
import styles from "src/components/Modal/Modal.module.css";
import { useTranslation } from "react-i18next";

interface ModalProps {
  onClose: () => void;
  showModal?: boolean;
  isStepIndicator: boolean;
  totalSteps?: number;
  completedSteps?: number;
  title: string;
  iconImage?: string;
  imgAlt?: string;
  contentTitle?: string;
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
    if (onClose) onClose();
    setIsModalOpen(false);
  };

  const stepsArray = Array.from({ length: totalSteps }, (_, index) => {
    if (index < completedSteps) return "complete";
    if (index === completedSteps) return "current";
    return "incomplete";
  });

  return (
    <>
      {isModalOpen && (
        <div className={`${styles.overlay}`}>
          <div className={`${styles.container}`}>
            <div className={`${styles.header}`}>
              <span className={`${styles.headerTitle}`}>{t(title)}</span>
              <span className={`${styles.headerClose}`} onClick={closeModal} role="button">
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
                  <ol className={`usa-step-indicator__segments ${styles.usaStepIndicatorSegments}`}>
                    {stepsArray.map((stepStatus, index) => (
                      <li
                        key={index}
                        className={`usa-step-indicator__segment ${styles[`usa-step-indicator__segment--${stepStatus}`]}`}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            )}
            <div className={`${styles.content}`}>
              {iconImage && <img src={iconImage} alt={imgAlt} />}
              {contentTitle && <div className={`${styles.contentTitle}`}>{t(contentTitle)}</div>}
              {contentMessage && <div className={`${styles.contentMessage}`}>{t(contentMessage)}</div>}
              {children}
            </div>
            {footerContent && <div className={`${styles.footer}`}>{footerContent}</div>}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
