import React from "react";
import styles from "src/pages/Help/Help.module.css";
import { FrequentlyAskedQuestions } from "src/utils/frequentlyAskedQuestions";

const Help = () => {
  return (
    <>
      <div className={`main-container`}>
        <div className={styles.title}>Frequently Asked Questions</div>
        {FrequentlyAskedQuestions.map((faq, index) => (
          <div key={index} className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-expanded="false"
                aria-controls={`a${index}`}
              >
                {faq.question}
              </button>
            </h4>
            <div
              id={`a${index}`}
              className="usa-accordion__content usa-prose"
              hidden
            >
              <div className={styles.textContent}>
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
        <div
          className={`usa-alert usa-alert--info ${styles.alertCustomContainer}`}
        >
          <div className={styles.iconContainer}>
            <svg
              className={`usa-icon ${styles["alert__icon"]}`}
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use xlinkHref="/assets/img/sprite.svg#info"></use>
            </svg>
          </div>
          <div className={styles.customTextContainer}>
            <h3 className="usa-alert__heading">Still need assistance?</h3>
            <p className="usa-alert__text">
              The SBA is available over email to help at{" "}
              <a href="mailto:digitalresearch@sba.gov">
                digitalresearch@SBA.gov
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
