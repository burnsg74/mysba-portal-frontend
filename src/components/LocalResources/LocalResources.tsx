import React, { useState } from "react";
import styles from "src/components/LocalResources/LocalResources.module.css";
import { useTranslation } from "react-i18next";
import linkedInLogo from "src/assets/linkedIn-logo.png";
import buildingIcon from "src/assets/building-icon.svg";
import { getUser } from "src/store/user/userSlice";
import { useSelector } from "react-redux";

const LocalResources = () => {
  const { t } = useTranslation();
  const user: IUser = useSelector(getUser);
  const mockData = {
    "zip_code": user?.businesses?.[0]?.business_address_zipcode ?? "", "district": {
      "name"     : "Seattle District",
      "map"      : "https://www.sba.gov/sites/default/files/2022-06/SBA_DOMap_WA_Seattle.svg",
      "website"  : "https://www.sba.gov/district/seattle",
      "office_directory": "info@sba.gov",
      "twitter": "https://www.sba.gov/district/seattle",
      "linkedin": "https://www.sba.gov/district/seattle",
    },
    "offices": [
      {
        "title": "Seattle - Main office",
      },
      {
        "title": "Seattle - Main office2",
      }
      ,
      {
        "title": "Seattle - Main office3",
      }
    ]

//       "name": "Seattle - Main office",
//       "appointmentOnly": true,
//       "phone": "503-326-2682",
//       "address": {
//         "street": "419 SW 11th Avenue",
//         "suite": "Suite 310",
//         "city": "Seattle",
//         "state": "WA",
//         "zip": "97205"
//       }
//     }
  };
  const [data, setData] = useState(mockData);
  console.log(data);

  return (<>
    <div className={`${styles.localResourcesContainer}`}>
      {/* Title Row */}
      <div className={`grid-row ${styles.titleRow}`}>
        <div className={`grid-col ${styles.title}`}>
          Local Resources
        </div>
        <div className={`grid-col-auto ${styles.titleZipContainer}`}>
          <label className={`${styles.titleZipLabel}`}>
            Zip Code
          </label>
          <input
            type="text"
            name={"zipCode"}
            value={data.zip_code}
            onChange={(event) => {
              setData({ ...data, zip_code: event.target.value });
            }}
            className={`${styles.titleZipInput}`}
            placeholder="Enter Zip Code"
          />
        </div>
      </div>

      {data && data.zip_code && (<>
        <div className={`grid-row ${styles.bodyDistrictCard}`}>
          <div className={`${styles.bodyDistrictCardImgContainer}`}>
            <img
              className={`${styles.bodyDistrictCardImg}`}
              src={data.district.map}
              alt="district image"
            />
          </div>
          <div className={`${styles.bodyDistrictCardDetailsContainer}`}>
            <div className={`${styles.bodyDistrictCardDetailsTitle}`}>
              <a href={data.district.website} target="_blank" rel="noopener noreferrer">
                {data.district.name}
              </a>
            </div>
            <div className={`${styles.bodyDistrictCardDetailsLinksContainer}`}>
              <div className={`grid-row ${styles.bodyDistrictCardDetailsLinksGroup}`}>
                <svg
                  className={`usa-icon ${styles.launchIcon}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <title>{t("Open in a new window")}</title>
                  <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                </svg>
                <a href={data.district.website} target="_blank"> Website </a>
                <svg
                  className={`usa-icon ${styles.launchIcon}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <title>{t("Open in email")}</title>
                  <use xlinkHref="/assets/img/sprite.svg#mail_outline"></use>
                </svg>
                <a href={"mailto:" + data.district.office_directory}>Office Directory</a>
              </div>
              <div className={`grid-rwo ${styles.bodyDistrictCardDetailsLinksGroup}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M11.9047 8.46958L19.3513 0H17.5873L11.1187 7.35251L5.956 0H0L7.80867 11.1194L0 19.9999H1.764L8.59067 12.2338L14.044 19.9999H20M2.40067 1.30158H5.11067L17.586 18.7623H14.8753"
                    fill="black" />
                  <defs>
                    <clipPath id="clip0_16703_109144">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <a href={data.district.twitter} target="_blank"> Follow us on X </a>
                <img src={linkedInLogo} alt="linkedIn logo" className={styles.linkedInLogo} />
                <a href={data.district.linkedin} target="_blank"> Follow us on LinkedIn </a>
              </div>
            </div>
            <button type="button" className={`usa-button ${styles.linkCertificationBtn}`}>
              {t("Make an Appointment")}
              <svg
                className={`usa-icon ${styles.launchIcon}`}
                aria-hidden="true"
                focusable="false"
              >
                <title>{t("Open in a new window")}</title>
                <use xlinkHref="/assets/img/sprite.svg#launch"></use>
              </svg>
            </button>
          </div>
        </div>

        <div className={`grid-row`}>
          {data.offices.map((office, index) => (
            <div key={index} className={`${styles.officeCardsContainer}`}>
              <div className={`grid-col-6 ${styles.officeCard}`}>
                <div className={`grid-row ${styles.officeCardTitle}`}>
                  <div className={`grid-col-auto ${styles.officeCardTitleText}`}>
                    <img
                      src={buildingIcon}
                      alt="office icon" />
                  </div>
                  <div className={`grid-col ${styles.officeCardDetailsContainer}`}>
                    <div className={`${styles.officeCardDetailsTitle}`}>{office.title}</div>
                    <div className={`${styles.officeCardDetailsAptOnly}`}>Appointment Only</div>
                    <div className={`${styles.officeCardDetailsPhone}`}>
                      <svg
                        className={`usa-icon ${styles.launchIcon}`}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <title>{t("Open in email")}</title>
                        <use xlinkHref="/assets/img/sprite.svg#phone"></use>
                      </svg>
                      503-326-2682
                    </div>
                    <div className={`${styles.officeCardDetailsAddress}`}>
                      <svg
                        className={`usa-icon ${styles.launchIcon}`}
                        aria-hidden="true"
                        focusable="false"
                      >
                        <title>{t("Open in email")}</title>
                        <use xlinkHref="/assets/img/sprite.svg#map"></use>
                      </svg>
                      419 SW 11th Avenue <br />
                      Suite 310 <br />
                      Seattle, WA 97205
                    </div>
                  </div>
                </div>
              </div>
            </div>))}
        </div>
        <div className={`${styles.guideContainer}`}>
          <div className={`${styles.guideTitle}`}>
            Explore your local business guide
          </div>
          <div className={`${styles.guideButton}`}>
            <button type="button" className={`usa-button ${styles.linkCertificationBtn}`}>
              {t("Local Business Guide")}
              <svg
                className={`usa-icon ${styles.launchIcon}`}
                aria-hidden="true"
                focusable="false"
              >
                <title>{t("Open in a new window")}</title>
                <use xlinkHref="/assets/img/sprite.svg#launch"></use>
              </svg>
            </button>
          </div>
        </div>
      </>)}
    </div>
  </>);
};

export default LocalResources;