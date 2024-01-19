import React from 'react';
import {useSelector} from "react-redux";
import {getUser} from "src/store/user/userSlice";
import {Link} from "react-router-dom";
import CardLearningCenter from "src/components/CardLearningCenter/CardLearningCenter";
import styles from "src/pages/Businesses/Businesses.module.css";


const Businesses = () => {
    const user: IUser = useSelector(getUser);
    return (
        <div className="grid-row">
            <div className={`grid-col ${styles['container']}`}>
                <h1 className={`${styles['title']}`}>Your Business</h1>
                <div className="Businesses-content">
                    {user.businesses && user.businesses.map((business, index) => (
                        <React.Fragment key={index}>
                            <div className="usa-card__container">
                                <div className={`usa-card__header ${styles['card__header']}`}>
                                    <div className="grid-row">
                                        <div className="grid-col-auto">
                                            <svg className="usa-icon text-middle pe-10" aria-hidden="true"
                                                 focusable="false"
                                                 role="img">
                                                <use
                                                    xlinkHref="/node_modules/@uswds/uswds/dist/img/sprite.svg#store"></use>
                                            </svg>
                                        </div>
                                        <div className="grid-col">
                                            <h2 className="usa-card__heading sba-blue text-middle">{business.name} </h2>
                                        </div>
                                        <div className="grid-col-auto">
                                        <button type="button" className="usa-button">Details</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="usa-card__body">
                                    <div className="grid-row sba-blue">
                                        <div className="grid-col text-center">{business.type}</div>
                                        <div className="grid-col text-center">UEI: {business.uei}</div>
                                        <div className="grid-col text-center">EIN: {business.ein}</div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="grid-col-auto">
                <CardLearningCenter/>
            </div>
        </div>
    )
        ;
};

export default Businesses;