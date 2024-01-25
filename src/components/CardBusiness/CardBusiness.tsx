import React, {useState} from 'react';
import styles from "src/components/CardBusiness/CardBusiness.module.css";
import {Link} from "react-router-dom";
import Field from "src/components/Field/Field";
import {useSelector} from "react-redux";
import {getUser} from "src/store/user/userSlice";
import {useTranslation} from "react-i18next";

const CardBusiness: React.FC<ICardBusinessProps> = ({business, showDetails = true}) => {
    const user: IUser = useSelector(getUser);
    const [toggleDetails, setToggleDetails] = useState(false);
    const {t} = useTranslation();
    const handleToggleDetails = () => {
        setToggleDetails(!toggleDetails);
    };
    return (<>
            <div className="usa-card__container">
                <div className={`usa-card__header ${styles['card__header']}`}>
                    <div className={`grid-row ${styles['card__text']}`}>
                        <div className={`grid-col-auto ${styles['store_icon']}`}>
                            <svg
                                height="40"
                                width="40"
                                aria-hidden="true"
                                focusable="false"
                                role="img">
                                <use
                                    xlinkHref="/assets/img/sprite.svg#store"></use>
                            </svg>
                        </div>
                        <div className="grid-col">
                            <h2 className="usa-card__heading sba-blue text-middle">{business.name} </h2>
                        </div>
                        {showDetails &&
                            <div className={`grid-col-auto ${styles['toggle__icon']}`}
                                 onClick={handleToggleDetails}>
                                {toggleDetails ? (
                                    <svg width="40" height="40" aria-hidden="true" focusable="false"
                                         role="img">
                                        <use xlinkHref="/assets/img/sprite.svg#expand_less"></use>
                                    </svg>
                                ) : (
                                    <svg width="40" height="40" aria-hidden="true" focusable="false"
                                         role="img">
                                        <use xlinkHref="/assets/img/sprite.svg#expand_more"></use>
                                    </svg>
                                )}
                            </div>
                        }
                    </div>
                </div>
                <div className="usa-card__body">
                    {showDetails ? (
                        <>
                            <div className={`grid-row`}>
                                <div className="grid-col">
                                    <div className={`${styles['subtitle']}`}>
                                        Business Information
                                    </div>
                                </div>
                            </div>
                            <Field label="EIN" value={business.ein}/>
                            <Field label="UEI" value={business.uei}/>
                            <Field label="Type" value={business.type}/>
                            <Field label="Mailing Address" value={business.mailing_address}/>
                            <Field label="Business Address" value={business.business_address}/>
                            <Field label="Phone Number" value={business.phone_number}/>
                            <Field label="Fax" value={business.fax}/>
                        </>
                    ) : (
                        <div className={`grid-row`}>
                            <div className="grid-col text-center">{business.type}</div>
                            <div className="grid-col text-center">UEI: {business.uei}</div>
                            <div className="grid-col text-center">EIN: {business.ein}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CardBusiness;