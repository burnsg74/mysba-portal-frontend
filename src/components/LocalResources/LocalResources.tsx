import React, { useEffect, useState } from "react";
import styles from "src/components/LocalResources/LocalResources.module.css";
import { useTranslation } from "react-i18next";
import { getUser } from "src/store/user/userSlice";
import { useSelector } from "react-redux";
import iconOfficeLg from "src/assets/icon-office-lg.svg";
import iconOfficeSm from "src/assets/icon-office-sm.svg";
import iconOfficeVirtaul from "src/assets/icon-office-virtual.svg";
import logoLinkedIn from "src/assets/logo-linkedIn.svg";
import axios from "axios";
import { BASE_API_URL } from "src/utils/constants";

const LocalResources = () => {
  const { t } = useTranslation();
  const user: IUser = useSelector(getUser);
  console.log("user", user);
  const [district, setDistrict] = useState(user.district ?? null);
  const [zipcode, setZipcode] = useState(user?.businesses?.[0]?.business_address_zipcode ?? "10278");

  useEffect(() => {
    console.log("LR Zip useEffect:", zipcode);
    const fetchDistrict = async () => {
      let response = await axios.get(`${BASE_API_URL}/localresources/${zipcode}`);
      console.log("Response", response);
      if (response.data[0]) {
        let newData = { ...response.data[0] };
        newData.field_district_offices = newData.field_district_offices.map((office: {
          office_type: { id: any; };
          appointment_only: boolean;
          geo_location: {
            replace: (arg0: string, arg1: string) => {
              (): any;
              new(): any;
              replace: {
                (arg0: string, arg1: string): {
                  (): any;
                  new(): any;
                  split: { (arg0: string): [any, any]; new(): any; };
                };
                new(): any;
              };
            };
          };
        }) => {
          let appointment_only = false;
          if (office.office_type.id === 149 || office.office_type.id === 147) {
            appointment_only = true;
          }
          let icon;
          if (office.office_type.office_type_icon.media_image.includes('district_office_icon')) {
            icon = iconOfficeLg;
          } else if (office.office_type.office_type_icon.media_image.includes('branch-office-icon')) {
            icon = iconOfficeSm;
          } else {
            icon = iconOfficeVirtaul;
          }
         let googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address.address_line1 + ", " + office.address.locality + ", " + office.address.administrative_area.code + " " + office.address.postal_code)}`;
          return { ...office, typeIcon: icon, googleMapUrl: googleMapUrl, appointment_only: appointment_only};
        });
        console.log("setDistrict newData", newData);
        setDistrict(newData);
      }
    };
    if (zipcode.length === 5) {
      console.log("LR Zip useEffect:", zipcode);
      fetchDistrict();
    }
  }, [zipcode]);

  let socialMediaXUrl = null;
  let socialMediaLinkedinUrl = null;

  district?.field_district_social_media.forEach((socialMedia) => {
    console.log(socialMedia.social_media_service.name, socialMedia.social_media_account);
    if (socialMedia.social_media_service.name === "X") {
      socialMediaXUrl = "https://x.com/" + socialMedia.social_media_account;
    } else if (socialMedia.social_media_service.name === "LinkedIn") {
      socialMediaLinkedinUrl = "https://www.linkedin.com/showcase/" + socialMedia.social_media_account;
    }
  });

  console.log("district2", district);

  return (<div className={`${styles.localResourcesContainer}`}>
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
          value={zipcode}
          onChange={(event) => {
            setZipcode(event.target.value);
          }}
          className={`usa-input ${styles.titleZipInput}`}
          placeholder="Enter Zip Code"
        />
      </div>
    </div>

    {district !== null && <div className={`${styles.localResourcesContentContainer}`}>
      <div className={`${styles.bodyDistrictCard}`}>
        <div className={`${styles.bodyDistrictCardImgContainer}`}>
          <img
            className={`${styles.bodyDistrictCardImg}`}
            src={district.field_district_map_svg}
            alt="district"
          />
        </div>
        <div className={`${styles.bodyDistrictCardDetailsContainer}`}>
          <div className={`${styles.bodyDistrictCardDetailsTitle}`}>
            <a href={district.website} target="_blank" rel="noopener noreferrer">
              {district.page_title}
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
              <a href={district.website} target="_blank"> Website </a>
            </div>
            <div className={`${styles.bodyDistrictCardDetailsLinksGroup}`}>

              {district.field_district_staff_directory && <>
                <svg
                  className={`usa-icon ${styles.districtCardDetailsLinkIcon}`}
                  aria-hidden="true"
                  focusable="false"
                >
                  <title>{t("Open in email")}</title>
                  <use xlinkHref="/assets/img/sprite.svg#mail_outline"></use>
                </svg>
                <a href={district.field_district_staff_directory} target="_blank">Office Directory</a>
              </>}
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
              {socialMediaXUrl && <a href={socialMediaXUrl} target="_blank"> Follow us on X </a>}
            </div>
            <div className={` ${styles.bodyDistrictCardDetailsLinksGroup}`}>
              <img src={logoLinkedIn} alt="linkedIn logo" className={styles.linkedInLogo} />
              {socialMediaLinkedinUrl && <a href={socialMediaLinkedinUrl} target="_blank"> Follow us on LinkedIn </a>}
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
      <div className={`${styles.officeCardsContainer}`}>
        {district.field_district_offices.map((office) => (<div key={office.title} className={`${styles.officeCard}`}>
          <img
            className={`${styles.officeCardsImg}`}
            src={office.typeIcon}
            alt="office" />
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
              <a href={`tel:${office.telephone}`}>{office.telephone}</a>
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
              <a href={office.googleMapUrl}
                 target="_blank" rel="noopener noreferrer">
                {office.address.address_line1}<br />
                {office.address.address_line2 !== "" && (<>
                    {office.address.address_line2}<br />
                  </>)}
                {office.address.locality}, {office.address.administrative_area.code} {office.address.postal_code} <br />
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
          <a href={district.field_district_business_link} target="_blank" rel="noopener noreferrer">
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
    </div>}
  </div>);
};

export default LocalResources;