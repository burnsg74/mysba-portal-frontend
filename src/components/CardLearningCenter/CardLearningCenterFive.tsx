import React from "react";
import LogoImage from "src/assets/sba-logo-learning-center.svg";
import ContentImage from "src/assets/pricing-model-content.png";
import VideoImage from "src/assets/video.png";
import ArrowNextImage from "src/assets/arrow-next.svg";

import styles from "src/components/CardLearningCenter/CardLearningCenter.module.css";

// Pricing Models
const CardLearningCenterFive = () => {
    const COURSE_URL = "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business";
    const VIDEO_LIST = [
        {
            title: "Pricing Models for a Successful Business Overview",
            duration: "1 minute 50 seconds",
            link: "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business/pricing-models-for-a-successful-business-overview",
        },
        {
            title: "How Pricing Relates to Marketing",
            duration: "1 minute 0 seconds",
            link: "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business/how-pricing-relates-to-marketing",
        },
        {
            title: "Pricing and Sales",
            duration: "1 minute 37 seconds",
            link: "https://learn.sba.gov/learning-center-grow/learning-center-pricing-models-for-successful-business/pricing-and-sales",
        },
    ];

    return (
        <>
            <div className={`${styles["usa-card__container"]}`}>
                {/* Header */}
                <div className={`usa-card__header ${styles["usa-card__header"]}`}>
                    <div className={`usa-card__heading ${styles["usa-card__heading"]}`}>
                        <div className="grid-row">
                            <div className={`grid-col ${styles["header-label"]}`}>
                                Learning Center
                            </div>
                            <div className="grid-col-auto">
                                <img
                                    className={`grid-col ${styles["header-sba_logo"]}`}
                                    src={LogoImage}
                                    alt="Logo"
                                />
                                <a
                                    href="https://learn.sba.gov"
                                    target="_blank"
                                    className={`${styles["header-launch-href"]}`}
                                    rel="noopener noreferrer"
                                >
                                    <svg
                                        className="usa-icon"
                                        aria-hidden="true"
                                        focusable="false"
                                        role="img"
                                    >
                                        <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lesson Image */}
                <img src={ContentImage} className={`${styles['content-image']}`} alt="Content Image"/>

                {/* Body */}
                <div className={`${styles["usa-card__body"]}`}>
                    <div className={`${styles["title_container"]}`}>
                        <div className={`${styles["title"]}`}>Pricing Models for Successful Business</div>
                        <div className={`${styles["description"]}`}>
                            Set prices, calculate costs, assess competitors and much more.
                        </div>
                    </div>

                    {/* List of Videos */}
                    {VIDEO_LIST.map((video, index) => (
                        <React.Fragment key={index}>
                            <div className={`${styles["video-container"]}`}>
                                <a href={video.link}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className={`${styles["video-href"]}`}
                                >
                                    <div className={` ${styles["video-row"]}`}>
                                        <div className={` ${styles["video-row__image"]}`}>
                                            <img
                                                src={VideoImage}
                                                alt="Video Icon"
                                                className={`${styles["video-icon"]}`}
                                            />
                                        </div>
                                        <div>
                                            <div className={`${styles["video-title"]}`}>
                                                {video.title}
                                            </div>
                                            <div className={`${styles["video-subtitle"]}`}>
                                                Video
                                            </div>
                                        </div>
                                        <div className={`${styles["video-right"]}`}>
                                            <img
                                                src={ArrowNextImage}
                                                alt="Next Icon"
                                                className={`${styles["next-icon"]}`}
                                            />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className={`usa-card__footer ${styles["usa-card__footer"]}`}>
                    <button type="button"
                            onClick={() => window.open(COURSE_URL, "_blank")}
                            className={`usa-button usa-button--outline ${styles["view-course-btn"]}`}>
                        <div className={`${styles["view-course-text"]}`}>
                            View Course
                        </div>
                        <svg
                            className={`${styles["view-course-icon"]}`}
                            aria-hidden="true"
                            focusable="false"
                            role="img"
                        >
                            <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </>

    );
};

export default CardLearningCenterFive;
