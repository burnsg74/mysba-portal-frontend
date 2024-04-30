import React from "react";
import styles from "src/components/Modal/Modal.module.css";
import { useTranslation } from "react-i18next";

interface ImageAndAlt {
  image: string,
  alt: string,
}

interface ModalProps {
  onClose: () => void;
  prevModal?: () => void;
  totalSteps?: number;
  completedSteps?: number;
  title: string;
  ImageAndAlt?: ImageAndAlt;
  contentTitle?: string;
  contentMessage?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const ModalComponent = ({
                          onClose,
                          prevModal,
                          title = "",
                          totalSteps = 0,
                          completedSteps = 0,
                          ImageAndAlt,
                          contentTitle,
                          contentMessage,
                          children,
                          footerContent,
                        }: ModalProps) => {
  const { t } = useTranslation();

  const closeModal = () => {
    if (onClose) onClose();
  };

  const stepsArray = Array.from({ length: totalSteps }, (_, index) => {
    if (index < completedSteps) return "complete";
    if (index === completedSteps) return "current";
    return "incomplete";
  });

  return (<div className={`${styles.overlay}`}>
    <div className={`${styles.container}`}>
      <div className={`${styles.header}`}>
        <span className={`${styles.headerTitle}`}>{t(title)}</span>
        <button className={`${styles.headerClose}`} onClick={closeModal} tabIndex={0}>
          {" "}
          {t("Close")}
          <svg aria-hidden="true" focusable="false" width="24" height="24" style={{ fill: "#71767A" }}>
            <use xlinkHref="/assets/img/sprite.svg#close"></use>
          </svg>
        </button>
      </div>
      {totalSteps > 0 && (<div className={`${styles.stepIndicatorContainer}`}>
        <div
          className={`usa-step-indicator usa-step-indicator--no-labels ${styles.customStepIndicator}`}
          aria-label="progress"
        >
          <ol className={`usa-step-indicator__segments ${styles.usaStepIndicatorSegments}`}>
            {stepsArray.map((stepStatus, index) => {
              const segmentStyle = styles[`usa-step-indicator__segment--${stepStatus}`];
              return (<li
                key={`${stepStatus}-${index}`}
                onClick={stepStatus === "complete" ? prevModal : undefined}
                onKeyDown={stepStatus === "complete" ? prevModal : undefined}
                tabIndex={stepStatus === "complete" ? 0 : undefined}
                className={`usa-step-indicator__segment ${segmentStyle}`}
                data-testid="step-indicator"
              ></li>);
            })}
          </ol>
        </div>
      </div>)}
      <div className={`${styles.content}`}>
        {ImageAndAlt && <img src={ImageAndAlt.image} alt={ImageAndAlt.alt} className={`${styles.imageSize}`} />}
        {contentTitle && <div className={`${styles.contentTitle}`}>{t(contentTitle)}</div>}
        {contentMessage && <div className={`${styles.contentMessage}`}>{t(contentMessage)}</div>}
        {children}
      </div>
      {footerContent && <div className={`${styles.footer}`}>{footerContent}</div>}
    </div>
  </div>);
};

export default ModalComponent;
