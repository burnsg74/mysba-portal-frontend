import React from "react";
import LogoImage from "src/assets/logo-sm.svg";
import VideoImage from "src/assets/video.png";
import InfographicImage from "src/assets/infographic.png";
import ArrowNextImage from "src/assets/arrow-next.svg";
import styles from "src/components/LearningCenterCard/LearningCenterCard.module.css";
import { useTranslation } from "react-i18next";

interface LearningCenter {
  title: string;
  description: string;
  image: string;
  link: string;
  library: {
    type: string;
    title: string;
    description: string;
    link: string;
  }[];
}

interface LearningCenterCardProps {
  learningCenter: LearningCenter;
}

const LearningCenterCard: React.FC<LearningCenterCardProps> = ({
  learningCenter,
}) => {
  const { t } = useTranslation();
  return (
    <div className={`${styles["usa-card__container"]}`}>
      {/* Header */}
      <div className={`usa-card__header ${styles["usa-card__header"]}`}>
        <div className={`usa-card__heading ${styles["usa-card__heading"]}`}>
          <div className="grid-row">
            <div className={`grid-col ${styles["header-label"]}`}>
              {t("Learning Center")}
            </div>
            <div className="grid-col-auto">
              <img
                className={`grid-col ${styles["header-sba_logo"]}`}
                src={LogoImage}
                alt="SBA Logo"
              />
              <a
                href="https://learn.sba.gov"
                target="_blank"
                className={`${styles["header-launch-href"]}`}
                rel="noopener noreferrer"
                aria-label={t("Open in a new window")}
                title={t("Open in a new window")}
              >
                <svg
                  className={`usa-icon ${styles.launchIcon}`}
                  aria-hidden="true"
                  focusable="false"
                  role="img"
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
        className={`${styles["content-image"]}`}
        alt="Content"
      />

      {/* Body */}
      <div className={`${styles["title_container"]}`}>
        <div className={`${styles["title"]}`}>{learningCenter.title}</div>
        <div className={`${styles["description"]}`}>
          {learningCenter.description}
        </div>
      </div>
      {/* List of items in library */}
      {learningCenter.library.map((item, index) => (
        <React.Fragment key={index}>
          <div className={`${styles["video-container"]}`}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles["video-href"]}`}
              aria-label={`Go to ${item.title}`}
            >
              <div className={` ${styles["video-row"]}`}>
                <div className={` ${styles["video-row__image"]}`}>
                  <img
                    src={
                      item.type === "infographic"
                        ? InfographicImage
                        : VideoImage
                    }
                    alt={item.type === "infographic" ? "Infographic" : "Video"}
                    className={`${styles["video-icon"]}`}
                  />
                </div>
                <div>
                  <div className={`${styles["video-title"]}`}>{item.title}</div>
                  <div className={`${styles["video-subtitle"]}`}>
                    {item.description}
                  </div>
                </div>
                <div className={`${styles["video-right"]}`}>
                  <img
                    src={ArrowNextImage}
                    alt="Go to Next"
                    className={`${styles["next-icon"]}`}
                  />
                </div>
              </div>
            </a>
          </div>
        </React.Fragment>
      ))}
      <div className={`usa-card__footer ${styles["usa-card__footer"]}`}>
        <button
          type="button"
          onClick={() => window.open(learningCenter.link, "_blank")}
          className={`usa-button usa-button--outline ${styles["view-course-btn"]}`}
        >
          <div className={`${styles["view-course-text"]}`}>
            {t("View Course")}
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
  );
};

export default LearningCenterCard;
