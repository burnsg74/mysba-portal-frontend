import React, { useEffect, useRef } from "react";
import styles from "src/components/Modal/Modal.module.css";
import { useTranslation } from "react-i18next";

interface ImageAndAlt {
  image: string;
  alt: string;
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
  hideCloseButton?: boolean;
}

function useFocusTrap(ref: React.RefObject<HTMLElement>, initialFocusRef: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const firstFocusableElement: HTMLElement | null = initialFocusRef.current ?? ref.current?.querySelector(focusableElements) ?? null;
    firstFocusableElement?.focus();
    let focusableContent: NodeListOf<HTMLElement>;
    if (ref.current) {
      focusableContent = ref.current.querySelectorAll(focusableElements);
    } else {
      focusableContent = document.querySelectorAll<HTMLElement>("nothing");
    }
    const lastFocusableElement: HTMLElement | null = focusableContent[focusableContent.length - 1];

    const handleFocus = (event: KeyboardEvent) => {
      const isTabPressed = event instanceof KeyboardEvent && event.key === "Tab";
      const isShiftPressed = event.shiftKey;
      const isFirstElementFocused = document.activeElement === firstFocusableElement;
      const isLastElementFocused = document.activeElement === lastFocusableElement;

      if (!isTabPressed) { return; }
      if ((isShiftPressed && isFirstElementFocused) || (!isShiftPressed && isLastElementFocused)) {
        const focusTarget = isShiftPressed ? lastFocusableElement : firstFocusableElement;
        focusTarget?.focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleFocus);
    return () => {
      document.removeEventListener("keydown", handleFocus);
    };
  }, []);
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
  hideCloseButton=false,
}: ModalProps) => {
  const { t } = useTranslation();
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useFocusTrap(contentRef, closeButtonRef);

  useEffect(() => {
    if (footerRef.current && contentRef.current) {
      contentRef.current.style.paddingBottom = `${footerRef.current.getBoundingClientRect().height + 40}px`
    }
  }, [footerContent])

  const closeModal = () => {
    if (onClose) onClose();
  };

  const stepsArray = Array.from({ length: totalSteps }, (_, index) => {
    if (index < completedSteps) return { id: `step-${index}`, status: "complete" };
    if (index === completedSteps) return { id: `step-${index}`, status: "current" };
    return { id: `step-${index}`, status: "incomplete" };
  });

  return (
      <div data-testid="modal" className={`${styles.overlay}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.header}`}>
            <span className={`${styles.headerTitle}`}>{t(title)}</span>
            {!hideCloseButton && (<button
              data-testid="close-button"
              className={`${styles.headerClose}`}
              onClick={closeModal}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  closeModal();
                }
              }}
              tabIndex={0}
              ref={closeButtonRef}
            >
              {" "}
              {t("Close")}
              <svg aria-hidden="true" focusable="false" width="24" height="24" style={{ fill: "#71767A" }}>
                <use xlinkHref="/assets/img/sprite.svg#close"></use>
              </svg>
            </button>)}
          </div>
          {totalSteps > 0 && (<div className={`${styles.stepIndicatorContainer}`}>
            <div
              className={`usa-step-indicator usa-step-indicator--no-labels ${styles.customStepIndicator}`}
              aria-label="progress"
            >
              <ol className={`usa-step-indicator__segments ${styles.usaStepIndicatorSegments}`}>
                {stepsArray.map((step) => {
                  const { status } = step;
                  const isComplete = status === "complete";
                  const statusClass = `usa-step-indicator__segment--${status}`;
                  const statusClassName = styles[statusClass];

                  return (
                    <li
                      key={step.id}
                      // role={isComplete ? "button" : undefined}
                      // tabIndex={isComplete ? 0 : undefined}
                      className={`usa-step-indicator__segment ${statusClassName}`}
                      data-testid="step-indicator"
                    >
                      <button onClick={isComplete ? prevModal : undefined}
                               onKeyDown={prevModal}
                              style={{ width: "100%" }}
                      > &nbsp;</button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>)}
          <div ref={contentRef} className={`${styles.contentContainer}`}>
            <div className={`${styles.contentHeader}`}>
              {ImageAndAlt && <img src={ImageAndAlt.image} alt={ImageAndAlt.alt} className={`${styles.imageSize}`} />}
              {contentTitle && <div className={`${styles.contentTitle}`}>{t(contentTitle)}</div>}
              {contentMessage && <div className={`${styles.contentMessage}`}>{t(contentMessage)}</div>}
            </div>
            <div className={`${styles.content}`}>
              {children}
            </div>
          </div>
          {footerContent && <div ref={footerRef} className={`${styles.footer}`}>{footerContent}</div>}
        </div>
      </div>
  );
};

export default ModalComponent;
