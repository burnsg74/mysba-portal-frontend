import React from "react";
import styles from "src/pages/Help/Help.module.css";
import { FrequentlyAskedQuestions } from "src/utils/frequentlyAskedQuestions";
import { useTranslation } from "react-i18next";
import {Alert} from "src/components/Alert/Alert";

const Help: React.FC = () => {
  const { t } = useTranslation();

  return (<div data-testid="page-help" className={`main-container ${styles.mainContainer}`}>
      <div className={`${styles.container}`}>
        <h1 className={styles.title}>{t("Frequently Asked Questions")}</h1>
        <div className={`${styles.faqContainer}`}>
          {FrequentlyAskedQuestions.map((faq) => (<div key={faq.id} className="usa-accordion usa-accordion--bordered">
            <h4 className="usa-accordion__heading">
              <button
                type="button"
                className={`usa-accordion__button ${styles.faqButton}`}
                aria-expanded="false"
                aria-controls={`a${faq.id}`}
              >
                {t(faq.question)}
              </button>
            </h4>
            <div
              id={`a${faq.id}`}
              className={`usa-accordion__content usa-prose ${styles.faqContent}`}
              hidden
            >
              <div className={styles.textContent}>
                <div className={styles.textContent} dangerouslySetInnerHTML={{ __html: t(faq.answer) }} />
              </div>
            </div>
          </div>))}
        </div>
        <div style={{ width: "100%", marginBottom: "40px" }}>
          <Alert
            type="info"
            title={t("Need assistance with MySBA?")}
            message={<>
              {t("Help is available via phone and email. Contact us today:")}<br />
              <ul style={{ margin: 0 }}>
                <li>
                  <a href="tel:8664434170">Tel: 866-443-4170</a><br />
                </li>
                <li>
                  <a href="mailto:mysba.account@sba.gov">{t("Email")}: mysba.account@sba.gov</a>
                </li>
              </ul>
              <br />
              {t("If you are seeking SBA assistance, click on resources above and enter your zip code to find your local SBA office contact information.")}
            </>}
          />
        </div>
      </div>
    </div>);
};

export default Help;