import React, { useEffect, useState } from "react";
import styles from "src/components/LocalResources/LocalResources.module.css";
import { useTranslation } from "react-i18next";
import { getUser, setUser } from "src/store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import iconOfficeLg from "src/assets/icon-office-lg.svg";
import iconOfficeSm from "src/assets/icon-office-sm.svg";
import iconOfficeVirtual from "src/assets/icon-office-virtual.svg";
import logoLinkedIn from "src/assets/logo-linkedIn.png";
import axios from "axios";
import { BASE_API_URL } from "src/utils/constants";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";

const LocalResources = () => {
  const { t } = useTranslation();
  const user: IUser = useSelector(getUser);
  const [district, setDistrict] = useState<District | null>(user.profile?.portal?.district ?? null);
  const [zipcode, setZipcode] = useState(user.profile?.portal.district.zipcode ?? user?.businesses?.[0]?.business_address_zipcode ?? "10001");
  const dispatch = useDispatch();
  const { authState } = useOktaAuth();

  useEffect(() => {
    let accessToken =authState?.accessToken?.accessToken;
    if (!accessToken) {
      return;
    }
    refreshDistrict(zipcode)
  }, []);

  useEffect(() => {
    let accessToken = authState?.accessToken?.accessToken;
    if (accessToken && zipcode && zipcode.toString().length === 5) {
      refreshDistrict(zipcode);
    }
  }, [zipcode]);

  function refreshDistrict(zipcode: string) {
    axios.get(`${BASE_API_URL}/localresources/${zipcode}`).then((response) => {
      if (!response.data[0]) {
        return;
      }
      const apiDistrict = response.data[0];

      let newDistrict: District = {
        zipcode: zipcode,
        title: apiDistrict.title,
        website: apiDistrict.website,
        field_district_map_svg: apiDistrict.field_district_map_svg,
        field_district_staff_directory: apiDistrict.field_district_staff_directory,
        field_district_business_link: apiDistrict.field_district_business_link,
        social_media_x_url: getSocialMediaXUrlFrom(apiDistrict.field_district_social_media),
        social_media_linkedin_url: getSocialMediaLinkedinUrlFrom(apiDistrict.field_district_social_media),
        field_district_offices: apiDistrict.field_district_offices.map((office:any) => {
          let newOffice: DistrictOffice = {
            title: office.title,
            typeIcon: getTypeIconFromMediaImage(office.office_type.office_type_icon?.media_image),
            appointment_only: (office.office_type.id === 149 || office.office_type.id === 147),
            is_virtual_office: getIsVirtualFromMediaImage(office.office_type.office_type_icon?.media_image),
            address_line1: office.address.address_line1,
            address_line2: office.address.address_line2,
            address_city: office.address.locality,
            address_state: office.address.administrative_area.code,
            address_zipcode: office.address.postal_code,
            telephone: office.telephone,
            google_map_url: getGoogleMapUrlFromAddress(office.address),
          }
          return newOffice;
        }),
      };
      setDistrict(newDistrict);
      updateAndSaveUserPortalProfileWithNewDistrict(newDistrict)

    }).catch(error => {
      console.log(error);
      window.location.href = "/error";
    });
  }

  function getSocialMediaXUrlFrom(field_district_social_media: any[]) {
    const xSocialMedia = field_district_social_media?.find((socialMedia) => {
      return socialMedia.social_media_service.name === "X";
    });

    return xSocialMedia ? `https://www.linkedin.com/showcase/${xSocialMedia.social_media_account}` : null;
  }

  function getSocialMediaLinkedinUrlFrom(field_district_social_media: any[]) {
    const linkedInSocialMedia = field_district_social_media?.find((socialMedia) =>
      socialMedia.social_media_service.name === "LinkedIn"
    );
    return linkedInSocialMedia ? `https://www.linkedin.com/showcase/${linkedInSocialMedia.social_media_account}` : null;
  }

  function getTypeIconFromMediaImage(mediaImage: string) {

    if (mediaImage.includes('branch-office-icon')) {
      return iconOfficeSm;
    }

    if (mediaImage.includes('headset_icon.png')) {
      return iconOfficeVirtual;
    }

    return iconOfficeLg;
  }

  function getIsVirtualFromMediaImage(mediaImage: string) {
    return mediaImage.includes('headset_icon.png');
  }

  function getGoogleMapUrlFromAddress(address: any) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.address_line1 + ", " + address.locality + ", " + address.administrative_area.code + " " + address.postal_code)}`;
  }

  function updateAndSaveUserPortalProfileWithNewDistrict(newDistrict: District) {
    const newPortalProfile = { ...user.profile?.portal,district: newDistrict };
    const url = `${BASE_API_URL}/portal/user/` + user.profile?.crm?.email;
    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      console.log('No accessToken');
      return;
    }
    axios.post(url, newPortalProfile, { headers: { Authorization: "Bearer " + accessToken } }).then(() => {
      dispatch(setUser({ ...user, profile: { ...user.profile, portal: newPortalProfile } }));
    }).catch(error => {
      console.log(error);
    });
  }

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
            const enteredZipcode = event.target.value;
            if (/^\d{0,5}$/.test(enteredZipcode)) {
              setZipcode(enteredZipcode);
            }
          }}
          className={`usa-input ${styles.titleZipInput}`}
          placeholder="Enter Zip Code"
          maxLength={5}
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
              {district.title}
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
            {district.social_media_x_url && <div className={` ${styles.bodyDistrictCardDetailsLinksGroup}`}>
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
              <a href={district.social_media_x_url} target="_blank"> Follow us on X </a>
            </div>}
            {district.social_media_linkedin_url && <div className={` ${styles.bodyDistrictCardDetailsLinksGroup}`}>
              <img src={logoLinkedIn} alt="linkedIn logo" className={styles.linkedInLogo} />
              <a href={district.social_media_linkedin_url} target="_blank"> Follow us on LinkedIn </a>
            </div>}
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
            {!office.is_virtual_office && (
            <div className={`${styles.officeCardDetailsAddress}`}>
              <svg
                className={`usa-icon ${styles.launchIcon}`}
                aria-hidden="true"
                focusable="false"
              >
                <title>{t("Open")}</title>
                <use xlinkHref="/assets/img/sprite.svg#map"></use>
              </svg>
              <a href={office.google_map_url}
                 target="_blank" rel="noopener noreferrer">
                {office.address_line1}<br />
                {office.address_line2 !== "" && (<>
                    {office.address_line2}<br />
                  </>)}
                {office.address_city}, {office.address_state} {office.address_zipcode} <br />
              </a>
            </div>
            )}
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