import React, { useEffect, useRef } from 'react';
import styles from 'src/components/Modal/Modal.module.css';
import { useTranslation } from 'react-i18next';
import ReactFocusLock from 'react-focus-lock';
import { Alert } from 'src/components/Alert/Alert';

interface ImageAndAlt {
  image: string;
  alt: string;
}

interface ModalProps {
  onClose: () => void;
  prevModal?: (stepData: {}, step?: number) => void;
  totalSteps?: number;
  completedSteps?: number;
  title: string;
  ImageAndAlt?: ImageAndAlt;
  contentTitle?: string;
  contentMessage?: string;
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
  hideCloseButton?: boolean;
  errorMessage?: string;
}

const ModalComponent = ({
  onClose,
  prevModal = (stepData: {}, step?: number) => {},
  title = '',
  totalSteps = 0,
  completedSteps = 0,
  ImageAndAlt,
  contentTitle,
  contentMessage,
  children,
  footerContent,
  hideCloseButton = false,
  errorMessage,
}: ModalProps) => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (footerRef.current && contentRef.current) {
      contentRef.current.style.paddingBottom = `${footerRef.current.getBoundingClientRect().height + 40}px`;
    }
  }, [footerContent]);

  const closeModal = () => {
    if (onClose) onClose();
  };

  const stepsArray = Array.from({ length: totalSteps }, (_, index) => {
    if (index < completedSteps) return { id: `step-${index}`, status: 'complete', stepNum: index };
    if (index === completedSteps) return { id: `step-${index}`, status: 'current', stepNum: index };
    return { id: `step-${index}`, status: 'incomplete', stepNum: index };
  });

  return (
    <div data-testid="modal" className={`${styles.overlay}`}>
      <ReactFocusLock>
        <div className={`${styles.container}`}>
          <div className={`${styles.header}`}>
            <span className={`${styles.headerTitle}`}>{t(title)}</span>
            {!hideCloseButton && (
              <button
                data-testid="close-button"
                className={`${styles.headerClose}`}
                onClick={closeModal}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    closeModal();
                  }
                }}
                tabIndex={0}
                ref={closeButtonRef}
              >
                {' '}
                {t('Close')}
                <svg focusable="false" width="24" height="24" style={{ fill: '#71767A' }}>
                  <use xlinkHref="/assets/img/sprite.svg#close"></use>
                </svg>
              </button>
            )}
          </div>
          {totalSteps > 0 && (
            <div className={`${styles.stepIndicatorContainer}`}>
              <div
                className={`usa-step-indicator usa-step-indicator--no-labels ${styles.customStepIndicator}`}
                aria-label="progress"
              >
                <ol className={`usa-step-indicator__segments ${styles.usaStepIndicatorSegments}`}>
                  {stepsArray.map(step => {
                    const { status } = step;
                    const isComplete = status === 'complete';
                    const statusClass = `usa-step-indicator__segment--${status}`;
                    const statusClassName = styles[statusClass];

                    return (
                      <li key={step.id} className={`usa-step-indicator__segment ${statusClassName}`}>
                        {isComplete && (
                          <button
                            data-testid="step-indicator"
                            className={styles.stepIndicatorButton}
                            onClick={() => prevModal({}, step.stepNum + 1)}
                          >
                            &nbsp;
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
              {errorMessage && (
                <div className={`${styles.alertContainer}`}>
                  <Alert message={errorMessage} type={'error'} />
                </div>
              )}
            </div>
          )}
          <div ref={contentRef} className={`${styles.contentContainer}`}>
            <div className={`${styles.contentHeader}`}>
              {ImageAndAlt && <img src={ImageAndAlt.image} alt={ImageAndAlt.alt} className={`${styles.imageSize}`} />}
              {contentTitle && <div className={`${styles.contentTitle}`}>{t(contentTitle)}</div>}
              {contentMessage && <div className={`${styles.contentMessage}`}>{t(contentMessage)}</div>}
            </div>
            <div className={`${styles.content}`}>{children}</div>
          </div>
          {footerContent && (
            <div ref={footerRef} className={`${styles.footer}`}>
              {footerContent}
            </div>
          )}
        </div>
      </ReactFocusLock>
    </div>
  );
};

export default ModalComponent;
