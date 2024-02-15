import React, {useState, ChangeEvent} from 'react';
import styles from "src/pages/AccountSetup2/AccountSetup2.module.css";
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import CheckListImage from "src/assets/check-list.png";
import {setNav} from "src/store/showNav/showNavSlice";
import {useDispatch} from 'react-redux';


const AccountSetup1 = () => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const navigate = useNavigate();
    const handleContinueBtnClick = () => {
        dispatch(setNav(true));
        navigate('/dashboard/new');
    };
    const handleBackBtnClick = () => {
        navigate('/account-setup/1');
    };
    const handleSkipBtnClick = () => {
        dispatch(setNav(true));
        navigate('/dashboard');
    }
    const [state, setState] = useState({
        planningNewBusiness: false,
        launchingNewBusiness: false,
        managingExistingBusiness: false,
        marketingExistingBusiness: false,
        growingExistingBusiness: false,
        govContracting: false,
        businessMentorship: false,
        womenOwnedBusinessContent: false,
        veteranOwnedBusinessContent: false,
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    return (
        <>
            <div className={`grid-row ${styles['container-row']}`}>
                <div className={`grid-col ${styles['container']}`}>
                    <div className={`${styles['header']}`}>
                        <img src={CheckListImage} alt="Check List Icon"/>
                        <div className={`${styles['title']}`}>{t("Tell us a little about your business.")}</div>
                        <div className={`${styles['subtitle']}`}>
                            The SBA is here to help at any stage of your business. Answering these questions helps us
                            serve you content more relevant to your needs.
                        </div>
                    </div>
                    <div className={`${styles['section_label']}`}>
                        In the current stage of my business I am...
                    </div>
                    <div className={`${styles['section_message']}`}> Select all that apply</div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="planningNewBusiness"
                                checked={state.planningNewBusiness}
                                onChange={handleChange}

                            />
                            <span className={`${styles['checkbox_label']}`}>Planning a new business.</span>
                        </div>
                    </div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="launchingNewBusiness"
                                checked={state.launchingNewBusiness}
                                onChange={handleChange}
                            />
                            <span className={`${styles['checkbox_label']}`}>Launching a new business.</span>
                        </div>
                    </div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="managingExistingBusiness"
                                checked={state.managingExistingBusiness}
                                onChange={handleChange}
                            />
                            <span className={`${styles['checkbox_label']}`}>Managing an existing business.</span>
                        </div>
                    </div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="marketingExistingBusiness"
                                checked={state.marketingExistingBusiness}
                                onChange={handleChange}
                            />
                            <span className={`${styles['checkbox_label']}`}>Marketing an existing business.</span>
                        </div>
                    </div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="growingExistingBusiness"
                                checked={state.growingExistingBusiness}
                                onChange={handleChange}
                            />
                            <span className={`${styles['checkbox_label']}`}>Growing a established business.</span>
                        </div>
                    </div>
                    <div className={`${styles['section_label']}`}>
                        I am interested in...
                    </div>
                    <div className={`${styles['section_message']}`}> Select all that apply</div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="govContracting"
                                checked={state.govContracting}
                                onChange={handleChange}
                            />
                            <span className={`${styles['checkbox_label']}`}>Government contracting</span>
                            <span className={`${styles['tooltip']}`}>
                            <svg className="usa-icon" aria-hidden="true" focusable="false" role="img"> <use
                                xlinkHref="/assets/img/sprite.svg#info_outline"></use> </svg>
                                 <span className={`${styles['tooltiptext']}`}>Government contracting is a term referring to how government purchases goods and services from public businesses. </span>
                            </span>
                        </div>
                    </div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="businessMentorship"
                                checked={state.businessMentorship}
                                onChange={handleChange}
                            />
                            <span className={`${styles['checkbox_label']}`}>Business mentorship</span>
                        </div>
                    </div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="womenOwnedBusinessContent"
                                checked={state.womenOwnedBusinessContent}
                                onChange={handleChange}
                            />
                            <span className={`${styles['checkbox_label']}`}>Women-owned business content</span>
                        </div>
                    </div>
                    <div className={`usa-card__container ${styles['card__container']}`}>
                        <div className={`usa-card__body ${styles['checkbox__group']}`}>
                            <input
                                type="checkbox"
                                name="veteranOwnedBusinessContent"
                                checked={state.veteranOwnedBusinessContent}
                                onChange={handleChange}
                            />
                            <span className={`${styles['checkbox_label']}`}>Veteran-owned business content</span>
                        </div>
                    </div>
                    <div className={`${styles['button-group']}`} style={{paddingTop: '75px'}}>
                        <button type="button"
                                onClick={handleBackBtnClick}
                                className="usa-button usa-button--outline">Back
                        </button>
                        <button
                            type="button"
                            className="usa-button"
                            onClick={handleContinueBtnClick}
                        >Continue
                        </button>
                    </div>
                    <div className={`${styles['button-group']}`}>
                        <div>
                            <a
                                style={{cursor: "pointer"}}
                                onClick={handleSkipBtnClick}
                            >Skip
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountSetup1;
