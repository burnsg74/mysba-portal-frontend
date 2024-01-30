import React from 'react';
import CardLearningCenter from "src/components/CardLearningCenter/CardLearningCenter";
import styles from "src/pages/Loans/Loans.module.css";
import Gears from "src/assets/loans-gears.svg";

const Loans = () => {
    return (
        <>
            <div className="grid-row">
                <div className="grid-col">
                    <div className="grid-row">
                        <div className="grid-col">
                            <img src={Gears} className={`${styles["title__img"]}`}/>
                        </div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-col">
                            <div className={`${styles["title"]}`}>Under Construction</div>
                        </div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-col">
                            <div className={`sba-blue ${styles["title__text"]}`}>Linking your loans is currently under construction.
                                Check back in our next release for loan functionality.
                                To check on your loans please visit your <a href="https://lending.sba.gov" target="_blank">loan portal</a>.
                            </div>
                        </div>
                    </div>
                    <div className="grid-row">
                        <div className="grid-col">
                            <div className={`${styles["title__btn"]}`}>
                                <button
                                    type="button"
                                    className={`usa-button ${styles['pill-button']}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.open('https://lending.sba.gov', '_blank');
                                    }}
                                >View the Loan Portal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid-col-auto">
                    <CardLearningCenter/>
                </div>
            </div>
        </>
    )
};

export default Loans;