import React, { useRef } from "react";
import styles from "src/components/Modal/Modal.module.css";
import { useTranslation } from "react-i18next";

interface ImageAndAlt
{
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
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, []);
  const closeModal = () => {
    if (onClose) onClose();
  };

  const stepsArray = Array.from({ length: totalSteps }, (_, index) => {
    if (index < completedSteps) return "complete";
    if (index === completedSteps) return "current";
    return "incomplete";
  });

  return (
    <>
      <div className={`${styles.overlay}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.header}`}>
            <span className={`${styles.headerTitle}`}>{t(title)}</span>
            <span className={`${styles.headerClose}`} onClick={closeModal} role="button" ref={closeButtonRef} tabIndex={0}>
              {" "}
              {t("Close")}
              <svg aria-hidden="true" focusable="false" role="img" width="24" height="24" style={{ fill: "#71767A" }}>
                <use xlinkHref="/assets/img/sprite.svg#close"></use>
              </svg>
            </span>
          </div>
          {totalSteps > 0 && (
            <div className={`${styles.stepIndicatorContainer}`}>
              <div
                className={`usa-step-indicator usa-step-indicator--no-labels ${styles.customStepIndicator}`}
                aria-label="progress"
              >
                <ol className={`usa-step-indicator__segments ${styles.usaStepIndicatorSegments}`}>
                  {stepsArray.map((stepStatus, index) => (
                    <li
                      key={index}
                      onClick={stepStatus === 'complete' ? prevModal : undefined}
                      role={stepStatus === 'complete' ? 'button' : undefined}
                      tabIndex={stepStatus === 'complete' ? 0 : undefined}
                      className={`usa-step-indicator__segment ${styles[`usa-step-indicator__segment--${stepStatus}`]}`}
                    />
                  ))}
                </ol>
              </div>
            </div>
          )}
          <div className={`${styles.content}`}>
            {ImageAndAlt && <img src={ImageAndAlt.image} alt={ImageAndAlt.alt} className={`${styles.imageSize}`}/>}
            {contentTitle && <div className={`${styles.contentTitle}`}>{t(contentTitle)}</div>}
            {contentMessage && <div className={`${styles.contentMessage}`}>{t(contentMessage)}</div>}
            {children}
          </div>
          {footerContent && <div className={`${styles.footer}`}>{footerContent}</div>}
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
