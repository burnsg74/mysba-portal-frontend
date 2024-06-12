import React from "react";
import styles from "src/pages/Help/Help.module.css";
import { FrequentlyAskedQuestions } from "src/utils/frequentlyAskedQuestions";
import { useTranslation } from "react-i18next";
import LocalResources from "src/components/LocalResources/LocalResources";
import Alert from "src/components/Alert/Alert";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";


const Help = () => {
  const user: IUser = useSelector(getUser);
  console.log('user', user);
  const { t } = useTranslation();
  return (<div data-testid="page-help" className={`main-container`}>
    <div className={`${styles.container}`}>
      <LocalResources />
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
      <div style={{ width: "100%" }}>
        <Alert
          type={"info"}
          title={"Still need assistance? "}
          message={<>
            The SBA is available over phone and email to help.<br />
            <br />
            Contact us today:<br />
            <ul style={{ margin: 0 }}>
              <li>
                <a href="tel:18008275722">Tel: 1 (800) 827-5722</a><br />
              </li>
              <li>
                <a href="mailto:answerdesk@sba.gov">Email: answerdesk@sba.gov</a>
              </li>
            </ul>
          </>} />
      </div>
    </div>
  </div>);
};

export default Help;
