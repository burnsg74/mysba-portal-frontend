import React from "react";
import styles from "src/pages/Help/Help.module.css";
import CardLearningCenterFour from "src/components/CardLearningCenter/CardLearningCenterFour";

const Help = () => {
  return (
    <>
      <div className="grid-row">
        <div className={`grid-col ${styles["container"]}`}>
          <div className={styles.title}>Frequently Asked Questions</div>
          <div className="usa-accordion">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls="a1"
              >
                How can I provide feedback on this portal test environment?
              </button>
            </h4>
            <div id="a1" className="usa-accordion__content usa-prose" hidden>
              <div className={styles.textContent}>
                <span>
                  You will be able to provide feedback on this test environment
                  and your respective experience via review sessions the SBA
                  will schedule with you and other test users. You are welcome
                  to share additional thoughts by emailing{" "}
                </span>
                <span className={styles.textLink}>digitalresearch@sba.gov</span>
                <span> as well</span>
              </div>
            </div>
          </div>
          <div className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls="a2"
              >
                How do I get help on features in this portal?
              </button>
            </h4>
            <div id="a2" className="usa-accordion__content usa-prose" hidden>
              <div className={styles.accordionContent}>
                <span className={styles.textContent}>
                  This is a test environment and we are building out the help
                  features. For assistance, email{" "}
                </span>
                <span className={styles.textLink}>digitalresearch@sba.gov</span>
                <span>
                  {" "}
                  and you will receive a reply within two business days.
                </span>
              </div>
            </div>
          </div>
          <div className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls="a3"
              >
                How do I change my username?
              </button>
            </h4>
            <div id="a3" className="usa-accordion__content usa-prose" hidden>
              <div className={styles.textContent}>
                <span>
                  The ability to change your username will be available in
                  future versions with directions available here. If you need
                  more information, email{" "}
                </span>
                <span className={styles.textLink}>digitalresearch@sba.gov</span>
                <span>
                  {" "}
                  and you will receive a reply within two business days.
                </span>
              </div>
            </div>
          </div>
          <div className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls="a4"
              >
                How do I change or get a new password?
              </button>
            </h4>
            <div id="a4" className="usa-accordion__content usa-prose" hidden>
              <div className={styles.textContent}>
                <span>
                  The ability to change your password or get a new one will be
                  available in future versions with directions available here.
                  If you need more information, email{" "}
                </span>
                <span className={styles.textLink}>digitalresearch@sba.gov</span>
                <span>
                  {" "}
                  and you will receive a reply within two business days.
                </span>
              </div>
            </div>
          </div>
          <div className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls="a5"
              >
                Is my information saved somewhere?
              </button>
            </h4>
            <div id="a5" className="usa-accordion__content usa-prose" hidden>
              <div className={styles.textContent}>
                <span>
                  No information is saved in this test environment. Details
                  about how your information will be saved will be available
                  here in future versions. If you no longer want to be part of
                  this test, email{" "}
                </span>
                <span className={styles.textLink}>digitalresearch@sba.gov</span>
                <span>
                  {" "}
                  and you will receive a reply within two business days.
                </span>
              </div>
            </div>
          </div>
          <div className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls="a6"
              >
                How do I delete my account?
              </button>
            </h4>
            <div id="a6" className="usa-accordion__content usa-prose" hidden>
              <div className={styles.textContent}>
                <span>
                  The ability to delete your account will be available in future
                  versions with directions available here. If you no longer want
                  to be part of this test, email{" "}
                </span>
                <span className={styles.textLink}>digitalresearch@sba.gov</span>
                <span>
                  {" "}
                  and you will receive a reply within two business days.
                </span>
              </div>
            </div>
          </div>
          <div className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls="a7"
              >
                What happens to my information if I delete my account?
              </button>
            </h4>
            <div id="a7" className="usa-accordion__content usa-prose" hidden>
              <div className={styles.textContent}>
                <span>
                  No information is saved in this test environment. Details
                  about what happens to your information after an account is
                  deleted will be available here in future versions If you no
                  longer want to be part of this test, email{" "}
                </span>
                <span className={styles.textLink}>digitalresearch@sba.gov</span>
                <span>
                  {" "}
                  and you will receive a reply within two business days.
                </span>
              </div>
            </div>
          </div>
          <div className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className="usa-accordion__button"
                aria-controls="a8"
              >
                How do I change my username?
              </button>
            </h4>
            <div id="a8" className="usa-accordion__content usa-prose" hidden>
              <div className={styles.textContent}>
                <span>
                  The ability to change your username will be available in
                  future versions with directions available here. If you need
                  more information, email{" "}
                </span>
                <span className={styles.textLink}>digitalresearch@sba.gov</span>
                <span>
                  {" "}
                  and you will receive a reply within two business days.
                </span>
              </div>
            </div>
          </div>
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
                The SBA is available over email to help at
                digitalresearch@SBA.gov.
              </p>
            </div>
          </div>
        </div>
        <div className={`grid-col-auto ${styles["resource-location"]}`}>
          <h3 className={`usa-prose ${styles["resource-location__title"]}`}>
            Resources for you
          </h3>
          <div className={`${styles["resource-location__scroll-area"]}`}>
            <div className={`${styles["resource-location__cards"]}`}>
              <CardLearningCenterFour />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
