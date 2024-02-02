import React from "react";
import LogoImage from "src/assets/logo.png";
import ContentImage from "src/assets/competitive-advantage.png";
import VideoImage from "src/assets/video.png";
import ArrowNextImage from "src/assets/arrow-next.svg";

import styles from "src/components/CardLearningCenter/CardLearningCenter.module.css";

// Competitive Advantage
const CardLearningCenterTwo = () => {
    const COURSE_URL = "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage";
    const VIDEO_LIST = [
        {
            title: "Competitive Advantage Overview",
            link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/competitive-advantage-overview",
        },
        {
            title: "Define Your Brand",
            link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/define-your-brand",
        },
        {
            title: "Know Your Competition",
            link: "https://learn.sba.gov/learning-center-market/learning-center-competitive-advantage/know-your-competition",
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
                        <div className={`${styles["title"]}`}>Competitive Advantage</div>
                        <div className={`${styles["description"]}`}>
                            Leverage the uniqueness of your business to develop your competitive advantage.
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

export default CardLearningCenterTwo;
