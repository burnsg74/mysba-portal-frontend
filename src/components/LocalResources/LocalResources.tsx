import React, { useState } from "react";
import styles from "src/components/LocalResources/LocalResources.module.css";
import { useTranslation } from "react-i18next";
import linkedInLogo from "src/assets/linkedIn-logo.png";
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
      "contact"  : "https://www.sba.gov/contact/contact_your_district_office?district=10",
      "office_directory": "info@sba.gov",
      "twitter": "https://www.sba.gov/district/seattle",
      "linkedin": "https://www.sba.gov/district/seattle",
      "guide": "https://www.sba.gov/district/seattle/doing-business-seattle-district"
    },
    "offices": [
      {
        "title": "Seattle - Main office",
        "image": "https://www.sba.gov/sites/default/files/styles/district_office_icon/public/2022-11/district-office-icon-2022.png.webp?itok=B9bk7nGC",
        "appointment_only": true,
        "phone": "503-326-2682",
        "address": "419 SW 11th Avenue \nSuite 310 \nSeattle, WA 97205"
      },
      {
        "title": "Spokane",
        "image": "https://www.sba.gov/sites/default/files/styles/district_office_icon/public/2022-11/branch-office-icon.png.webp?itok=vwy3ufUc",
        "appointment_only": true,
        "phone": "453-326-1231",
        "address": "132451 11th Avenue \nSuite 310 \nSpokane, WA 97191"
      }
    ]
  };
  const [data, setData] = useState(mockData);

  return (<>
    <div className={`${styles.localResourcesContainer}`}>
      {/* Title Row */}
      <div className={`${styles.titleRow}`}>
        <div className={`${styles.title}`}>
          Local Resources
        </div>
        <div className={` ${styles.titleZipContainer}`}>
          <label
            htmlFor="zipCode"
            className={`usa-label ${styles.titleZipLabel}`}>
            Zip Code
          </label>
          <input
            type="text"
            id={"zipCode"}
            name={"zipCode"}
            value={data.zip_code}
            onChange={(event) => {
              setData({ ...data, zip_code: event.target.value });
            }}
            className={`usa-input ${styles.titleZipInput}`}
            placeholder="Enter Zip Code"
          />
        </div>
      </div>

      {data && data.zip_code && (<>
        <div className={`${styles.localResourcesContentContainer}`}>
          <div className={`${styles.bodyDistrictCard}`}>
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
              <div className={`${styles.bodyDistrictCardDetailsLinksGroup}`}>
                <svg
                  className={`usa-icon ${styles.districtCardDetailsLinkIcon}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <title>{t("Open in a new window")}</title>
                  <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                </svg>
                <a href={data.district.website} target="_blank"> Website </a>
              </div>
              <div className={`${styles.bodyDistrictCardDetailsLinksGroup}`}>
                <svg
                  className={`usa-icon ${styles.districtCardDetailsLinkIcon}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <title>{t("Open in email")}</title>
                  <use xlinkHref="/assets/img/sprite.svg#mail_outline"></use>
                </svg>
                <a href={"mailto:" + data.district.office_directory}>Office Directory</a>
              </div>
              <div className={` ${styles.bodyDistrictCardDetailsLinksGroup}`}>
                <svg
                  className={`usa-icon ${styles.districtCardDetailsLinkIcon}`}
                  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
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
              </div>
              <div className={` ${styles.bodyDistrictCardDetailsLinksGroup}`}>
                <img src={linkedInLogo} alt="linkedIn logo" className={styles.linkedInLogo} />
                <a href={data.district.linkedin} target="_blank"> Follow us on LinkedIn </a>
              </div>
            </div>
            <a href="https://www.sba.gov/contact/contact_your_district_office?district=10"
               className={`${styles.districtContactLink}`}
               target="_blank"
               rel="noopener noreferrer">
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
            </a>
          </div>
        </div>
          <div  className={`${styles.officeCardsContainer}`}>
            {data.offices.map((office, index) => (<div key={index} className={`${styles.officeCard}`}>
                    <img
                      className={`${styles.officeCardsImg}`}
                      src={office.image}
                      alt="office icon" />
                <div className={`${styles.officeCardDetailsContainer}`}>
                  <div className={`${styles.officeCardDetailsTitle}`}>{office.title}</div>
                  {office.appointment_only &&
                    <div className={`usa-tag ${styles.officeCardDetailsAptOnly}`}>Appointment Only</div>}
                  <div className={`${styles.officeCardDetailsPhone}`}>
                    <svg
                      className={`usa-icon ${styles.launchIcon}`}
                      aria-hidden="true"
                      focusable="false"
                    >
                      <title>{t("Open in email")}</title>
                      <use xlinkHref="/assets/img/sprite.svg#phone"></use>
                    </svg>
                    <a href={`tel:${office.phone}`}>{office.phone}</a>
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
                    <a href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(office.address)}
                       target="_blank" rel="noopener noreferrer">
                      {office.address}
                    </a>
                  </div>
                </div>
              </div>))}
        </div>
        <div className={`${styles.guideContainer}`}>
          <div className={`${styles.guideTitle}`}>
            Explore your local business guide
          </div>
          <div>
            <a href={data.district.guide} target="_blank"
               rel="noopener noreferrer">
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
            </a>
          </div>
        </div>
        </div>
      </>)}
    </div>
  </>);
};

export default LocalResources;