import React from "react";
import LogoImage from "src/assets/sba-logo-learning-center.svg";
import ContentImage from "src/assets/legal-learning-content.png";
import VideoImage from "src/assets/video.png";
import ArrowNextImage from "src/assets/arrow-next.svg";

import styles from "src/components/CardLearningCenter/CardLearningCenter.module.css";

const CardLearningCenterTwo = () => {
  const videos = [
    {
      title: "Legal Requirements Overview",
      duration: "1 minute 35 seconds",
      link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/legal-requirements-overview",
    },
    {
      title: "Determining Your Requirements",
      duration: "0 minutes 21 seconds",
      link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/determining-your-requirements",
    },
    {
      title: "Registering And Licensing",
      duration: "1 minute 9 seconds",
      link: "https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements/registering-and-licensing",
    },
  ];

  return (
    <div className={`${styles["container"]}`}>
      <div className={`${styles["title"]}`}>Resources for you</div>
      <hr />
      <div className="usa-card__container">
        <div className="usa-card__header">
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
        <img
          src={ContentImage}
          className={`${styles["content-image"]}`}
          alt="Content Image"
        />

        <div className="usa-card__body">
          <div className={`${styles["title"]}`}>Competitive Advantage</div>
          <div className={`${styles["description"]}`}>
            Leverage the uniqueness of your business to develop your competitive advantage.
          </div>
          <hr />
          {videos.map((video, index) => (
            <React.Fragment key={index}>
              <div className={`${styles["video-container"]}`}>
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles["video-href"]}`}
                >
                  <div className={`grid-row ${styles["video-row"]}`}>
                    <div className="grid-col-auto">
                      <img
                        src={VideoImage}
                        alt="Video Icon"
                        className={`${styles["video-icon"]}`}
                      />
                    </div>
                    <div className="grid-col">
                      <span className={`${styles["video-title"]}`}>
                        {video.title}
                        <br />
                      </span>
                      <span className={`${styles["video-subtitle"]}`}>
                        Video ({video.duration})
                      </span>
                    </div>
                    <div className="grid-col-auto">
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
        <div className="usa-card__footer text-center">
          <a
            href="https://learn.sba.gov/learning-center-plan/learning-center-learning-requirements"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" className="usa-button usa-button--outline">
              View Course
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardLearningCenterTwo;