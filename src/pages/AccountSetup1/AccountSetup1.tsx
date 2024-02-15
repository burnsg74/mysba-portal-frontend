import React, { useEffect } from "react";
import styles from "src/pages/AccountSetup1/AccountSetup1.module.css";
import {useTranslation} from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "src/store/user/userSlice";
import CardCertification from "src/components/CardCertification/CardCertification";
import {useNavigate} from 'react-router-dom';
import CardBusiness from "src/components/CardBusiness/CardBusiness";
import OpenSignImage from "src/assets/open-sign.png";


const AccountSetup1 = () => {
    const {t} = useTranslation();
    const user: IUser = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const updatedUser = {...user, profile: {...user.profile, portal: {id: Math.floor(Math.random()*10000)}}}; // generate random number
        dispatch(setUser(JSON.parse(JSON.stringify(updatedUser))));
    }, []);

    const handleContinueBtnClick = () => {
        navigate('/account-setup/2');
    };

    return (
        <>
            <div className={`grid-row ${styles['container-row']}`}>
                <div className={`grid-col ${styles['container']}`}>
                    <div className={`${styles['header']}`}>
                        <img src={OpenSignImage} alt="Open Sign" className={styles['open-sign']}/>
                        <div className={`${styles['title']}`}>{t("Here's what we found about you")}</div>
                        <div className={`${styles['subtitle']}`}>
                            This information has been linked via your existing certification.
                            To make changes please edit this in your <a rel="noreferrer" href="https://veterans.certify.sba.gov/" target="_blank">VetCert portal</a>.
                        </div>
                    </div>
                    <div className={`${styles['label']}`}>{t('Your Business')} </div>
                    {user.businesses && user.businesses.map((business, index) => (
                        <React.Fragment key={index}>
                            <CardBusiness business={business} showDetails={false}/>
                        </React.Fragment>
                    ))}
                    <div className={`${styles['label']}`}>{t('Your Business Certifications')} </div>
                    <div className="grid-row">
                        <div className="grid-col">
                            {user.certifications && user.certifications.map((certification, index) => (
                                <React.Fragment key={index}>
                                    <CardCertification certification={certification} showDetails={false}/>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles['checkbox__group']}`}><input  className={`${styles['checkbox']}`} type="checkbox"/><span className={`${styles['checkbox__label']}`}> Notify me about updates regarding my SBA account and upcoming events</span>

                    </div>
                    <div className={`${styles['footer']}`}>
                        <button type="button"
                                className={`usa-button ${styles['button__continue']}`}
                                onClick={handleContinueBtnClick}
                        >Continue
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountSetup1;
