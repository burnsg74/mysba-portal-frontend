import React from "react";
import styles from "src/pages/Loans/Loans.module.css";
import Gears from "src/assets/loans-gears.svg";

const Loans = () => {
  return (
    <>
      <div className={`main-container`}>
        <div className="grid-row">
          <div className="grid-col">
            <img src={Gears} className={`${styles["title__img"]}`}  alt="Title Image"/>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col">
            <div className={`${styles["title"]}`}>Under Construction</div>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col">
            <div className={`sba-blue ${styles["title__text"]}`}>
              Linking your loans is currently under construction. Check back in
              our next release for loan functionality. To check on your loans
              please visit your{" "}
              <a href="https://lending.sba.gov" target="_blank">
                loan portal
              </a>
              .
            </div>
          </div>
        </div>
        <div className="grid-row">
          <div className="grid-col">
            <div className={`${styles["title__btn"]}`}>
              <button
                type="button"
                className={`usa-button ${styles["pill-button"]}`}
                onClick={e => {
                  e.preventDefault();
                  window.open("https://lending.sba.gov", "_blank");
                }}
              >
                View the Loan Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loans;
