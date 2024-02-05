import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getUser} from "src/store/user/userSlice";
import CardLearningCenter from "src/components/CardLearningCenter/CardLearningCenter";
import styles from "src/pages/Certifications/Certifications.module.css";
import CertApplyModal1 from "src/components/CertApplyModal1/CertApplyModal1";
import CertApplyModal2 from "src/components/CertApplyModal2/CertApplyModal2";
import CardLearningCenterTwo from "src/components/CardLearningCenter/CardLeaningCenterTwo";
import CardCertification from "src/components/CardCertification/CardCertification";

type OptionType = 'WOSB' | '8A' | 'HubZone' | 'VetCert';

const Certifications = () => {
    const user: IUser = useSelector(getUser);
    const [showModal, setShowModal] = useState(0);
    const [selectedOption, setSelectedOption] = useState<OptionType | undefined>();

    const handleCertApplyModal1Close = () => {
        setShowModal(0);
    };
    const handleCertApplyModal1Next = (selectedOption: OptionType) => {
        setShowModal(2);
        if (selectedOption) setSelectedOption(selectedOption);
    };
    const handleCertApplyModal2Close = () => {
        setShowModal(0);
    };
    const handleCertApplyModal2Prev = () => {
        setShowModal(1);
    };
    return (
        <>
            <div className="grid-row">
                <div className={`grid-col ${styles['container']}`}>
                    {/* Alert */}
                    <div className={`${styles["alert__container"]}`}>
                        <svg className={`usa-icon ${styles["alert__icon"]}`} aria-hidden="true"
                             focusable="false"
                             role="img">
                            <use xlinkHref="/assets/img/sprite.svg#warning"></use>
                        </svg>
                        <div className={`${styles["alert__message"]}`}> Your Woman-Owned Small Business
                            certification must be renewed by 12/15/2023
                        </div>
                    </div>
                    <div className={`grid-row ${styles['title__row']}`}>
                        <div  className={`grid-col grid-col-wrap ${styles['title']}`}>
                                Certifications
                        </div>
                        <div className="grid-col-auto grid-col-wrap">
                            <button type="button"
                                    className={`usa-button usa-button--outline ${styles["apply-for-a-certification__btn"]}`}
                                    onClick={() => setShowModal(1)}
                            >Apply for a Certification
                            </button>
                        </div>
                        <div className="grid-col-auto grid-col-wrap">
                            <button
                                type="button"
                                className={`usa-button usa-button--secondary ${styles["link-a-certification__btn"]}`}
                                disabled={true}
                            >
                                Link a Certification
                            </button>
                        </div>
                    </div>
                    <div className="Certifications-content">
                        {/* certifications  */}
                        <div className="grid-row">
                            <div className="grid-col">
                                {user.certifications && user.certifications.map((certification, index) => (
                                    <React.Fragment key={index}>
                                        <CardCertification certification={certification}/>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Resources */}
                <div className={`grid-col-auto ${styles["resource-location-right"]}`}>
                    <div className={`${styles["resource-location__title"]}`}>Resources for you</div>
                    <div className={`${styles["resource-location__scroll-area"]}`}>
                        <div className={`${styles["resource-location__cards"]}`}>
                            <CardLearningCenter/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`grid-row ${styles["resource-location-bottom"]}`}>
                <div className={`${styles["resource-location__title"]}`}>Resources for you</div>
                <div className={`${styles["resource-location__scroll-area"]}`}>
                    <div className={`${styles["resource-location__cards"]}`}>
                        <CardLearningCenter/>
                    </div>
                </div>
            </div>
            {showModal === 1 ? <CertApplyModal1 onClose={handleCertApplyModal1Close}
                                                onNext={(selectedOption) => handleCertApplyModal1Next(selectedOption)}/> : null}
            {showModal === 2 && selectedOption !== undefined
                ? <CertApplyModal2 onClose={handleCertApplyModal2Close} onPrev={handleCertApplyModal2Prev}
                                   selectedOption={selectedOption}/>
                : null}
        </>
    );
};

export default Certifications;