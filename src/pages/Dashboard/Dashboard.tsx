import React from 'react';
import {useSelector} from "react-redux";
import {getUser} from "src/store/user/userSlice";
import CityScapeImage from "src/assets/dashboard-cityscape.png";
import {Link} from "react-router-dom";
import CardLearningCenter from "src/components/CardLearningCenter/CardLearningCenter";
import CardCertification from "src/components/CardCertification/CardCertification";
import styles from "src/pages/Dashboard/Dashboard.module.css";

const Dashboard = () => {
    const user: IUser = useSelector(getUser);

    return (
        <div className="grid-row">
            <div className="grid-col">
                <div className="banner">
                    <div className={`${styles["welcome-message"]}`}>
                        {user.profile && <span> Hi, <span className="username"> {user.profile.first_name}</span></span>}
                    </div>
                    <div className={`${styles["mysba-message"]}`}>
                        Welcome to your <br/>
                        MySBA Dashboard
                    </div>
                    <span className={`${styles["sun"]}`}/>
                    <img
                        className={`${styles["cityscape"]}`}
                        src={CityScapeImage}
                        alt="dashboard cityscape image"
                    />
                </div>
                <div className={`usa-alert usa-alert--warning ${styles["dashboard-alert"]}`}>
                    <div className="usa-alert__body">
                        <span className="usa-alert__text">
                            Your Veteran-Owned Small Business must be renewed by 12/15/2023
                        </span>
                    </div>
                </div>
                <div className={`${styles["dashboard-content"]}`}>
                    {user.businesses && user.businesses.map((business, index) => (
                        <React.Fragment key={index}>
                            <h1>
                                <svg className="usa-icon text-middle business__icon" aria-hidden="true"
                                     focusable="false"
                                     role="img">
                                    <use xlinkHref="/node_modules/@uswds/uswds/dist/img/sprite.svg#store"></use>
                                </svg>
                                {business.name}</h1>
                            <div className={`grid-row ${styles["cert-header__row"]}`}>
                                <div className="grid-col">
                                    <div  className={`${styles["certifications"]}`}>
                                        Certifications
                                    </div>
                                </div>
                                <div className={`grid-col ${styles["certifications-header__link"]}`}>
                                    <Link to='/certifications' className={`float-right ${styles["certifications-header__link"]}`}>View</Link>
                                </div>
                            </div>
                            <div className="grid-row">
                                <div className="grid-col">
                                    {user.certifications && user.certifications.map((certification, index) => (
                                        <React.Fragment key={index}>
                                            <CardCertification certification={certification}/>
                                        </React.Fragment>
                                    ))}
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
};

export default Dashboard;