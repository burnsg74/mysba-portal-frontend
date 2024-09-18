import React from "react";
import LogoImage from "src/assets/logo-sm.svg";
import VideoImage from "src/assets/video.png";
import InfographicImage from "src/assets/infographic.png";
import ArrowNextImage from "src/assets/arrow-next.svg";
import styles from "src/components/LearningCenterCard/LearningCenterCard.module.css";
import { useTranslation } from "react-i18next";

const LearningCenterCard: React.FC<ILearningCenterCardProps> = ({
                                                                  learningCenter,
                                                                }) => {
  const { t } = useTranslation();
  return (<div className={`${styles.usaCardContainer}`}>
      {/* Header */}
      <div className={`usa-card__header ${styles.usaCardHeader}`}>
        <div className={`usa-card__heading ${styles.usaCardHeading}`}>
          <div className="grid-row">
            <div className={`grid-col ${styles.headerLabel}`}>
              {t("Learning Center")}
            </div>
            <div className="grid-col-auto">
              <img
                className={`grid-col ${styles.headerSbaLogo}`}
                src={LogoImage}
                alt="SBA Logo"
              />
              <a
                href="https://learn.sba.gov"
                target="_blank"
                className={`${styles.headerLaunchHref}`}
                rel="noopener noreferrer"
                aria-label={t("Open in a new window")}
                title={t("Open in a new window")}
              >
                <svg
                  className={`usa-icon ${styles.launchIcon}`}

                  focusable="false"
                >
                  <title>{t("Open in a new window")}</title>
                  <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Image */}
      <img
        src={learningCenter.image}
        className={`${styles.contentImage}`}
        alt="Content"
      />

      {/* Body */}
      <div className={`${styles.titleContainer}`}>
        <div className={`${styles.title}`}>{learningCenter.title}</div>
        <div className={`${styles.description}`}>
          {learningCenter.description}
        </div>
      </div>
      {/* List of items in library */}
      {learningCenter.library.map((item) => (<React.Fragment key={item.id}>
          <div className={`${styles.videoContainer}`}>
            <button
              onClick={() => window.open(item.link, "_blank")}
              className={`${styles.videoHref}`}
              aria-label={`Go to ${item.title}`}
            >
              <div className={` ${styles.videoRow}`}>
                <div className={` ${styles.videoRowImage}`}>
                  <img
                    src={item.type === "infographic" ? InfographicImage : VideoImage}
                    alt={item.type === "infographic" ? "Infographic" : "Video"}
                    className={`${styles.videoIcon}`}
                  />
                </div>
                <div>
                  <div className={`${styles.videoTitle}`}>{item.title}</div>
                  <div className={`${styles.videoSubtitle}`}>
                    {item.description}
                  </div>
                </div>
                <div className={`${styles.videoRight}`}>
                  <img
                    src={ArrowNextImage}
                    alt="Go to Next"
                    className={`${styles.nextIcon}`}
                  />
                </div>
              </div>
            </button>
          </div>
        </React.Fragment>))}
      <div className={`usa-card__footer ${styles.usaCardFooter}`}>
        <button
          type="button"
          onClick={() => window.open(learningCenter.link, "_blank")}
          className={`usa-button usa-button--outline ${styles.viewCourseBtn}`}
        >
          <div className={`${styles.viewCourseText}`}>
            {t("View Course")}
          </div>
          <svg
            className={`${styles.viewCourseIcon}`}

            focusable="false"
          >
            <use xlinkHref="/assets/img/sprite.svg#launch"></use>
          </svg>
        </button>
      </div>
    </div>);
};

export default LearningCenterCard;
