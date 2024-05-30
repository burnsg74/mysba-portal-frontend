import React from "react";
import styles from "src/pages/Help/Help.module.css";
import { FrequentlyAskedQuestions } from "src/utils/frequentlyAskedQuestions";
import { useTranslation } from "react-i18next";
import LocalResources from "src/components/LocalResources/LocalResources";

const Help = () => {
  const { t } = useTranslation();
  return (<div className={`${styles.container}`}>
    <LocalResources />
    <h1 className={styles.title}>{t("Frequently Asked Questions")}</h1>
    <div>

      {FrequentlyAskedQuestions.map((faq) => (<div key={faq.id} className="usa-accordion usa-accordion--bordered">
          <h4 className="usa-accordion__heading">
            <button
              type="button"
              className="usa-accordion__button"
              aria-expanded="false"
              aria-controls={`a${faq.id}`}
            >
              {t(faq.question)}
            </button>
          </h4>
          <div
            id={`a${faq.id}`}
            className="usa-accordion__content usa-prose"
            hidden
          >
            <div className={styles.textContent}>
              <p
                dangerouslySetInnerHTML={{
                  __html: t(faq.answer).replace(/digitalresearch@SBA.gov/g, "<a href=\"mailto:digitalresearch@SBA.gov\">digitalresearch@SBA.gov</a>"),
                }}
              />
            </div>
          </div>
        </div>))}
    </div>
      <div
        className={`usa-alert usa-alert--info ${styles.alertCustomContainer}`}
      >
        <div className={styles.iconContainer}>
          <svg
            className={`usa-icon ${styles.alertIcon}`}
            aria-hidden="true"
            focusable="false"
          >
            <use xlinkHref="/assets/img/sprite.svg#info"></use>
          </svg>
        </div>
        <div className={styles.customTextContainer}>
          <h3 className="usa-alert__heading">{t("Still need assistance?")}</h3>
          <p className="usa-alert__text">
            {t("The SBA is available over email to help at")} {" "}
            <a href="mailto:digitalresearch@SBA.gov">
              digitalresearch@SBA.gov
            </a>.</p>
        </div>
      </div>
    </div>);
};

export default Help;
