import React, { useEffect, useRef, useState } from "react";
import { AccessToken } from "@okta/okta-auth-js";
import { DISTRICT_URL, PORTAL_API_URL } from "src/utils/constants";
import { getUser, setUser } from "src/store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useOktaAuth } from "@okta/okta-react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import iconOfficeLg from "src/assets/icon-office-lg.svg";
import iconOfficeSm from "src/assets/icon-office-sm.svg";
import iconOfficeVirtual from "src/assets/icon-office-virtual.svg";
import logoLinkedIn from "src/assets/logo-linkedIn.png";
import styles from "src/components/LocalResources/LocalResources.module.css";

const LocalResources = () => {
  const dispatch = useDispatch();
  const user: IUser = useSelector(getUser);
  const { authState } = useOktaAuth();
  const { t } = useTranslation();
  const [searchBtnLabel, setSearchBtnLabel] = useState("Search");
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [district, setDistrict] = useState<District | null>(user.profile?.portal?.district ?? null);

  // Zipcode can only be a 5-digit number
  const formatZipcode = (value: string | undefined): string | undefined => {
    if (value) {
      const formattedZipcode = value.replace(/\D/g, "").slice(0, 5);
      if (formattedZipcode.length === 5) {
        return formattedZipcode;
      }
    }
    return undefined;
  };

  const [zipcode, setZipcode] = useState(
    formatZipcode(user.profile?.portal?.district?.zipcode) ??
      formatZipcode(user?.businesses?.[0]?.business_address_zipcode) ??
      "10001"
  );

  const hasMountedRef = useRef(false);
  useEffect(() => {
    let accessToken = authState?.accessToken?.accessToken;
    if (accessToken && zipcode && zipcode.toString().length === 5) {
      refreshDistrict(zipcode);
    }
    hasMountedRef.current = true;
  }, []);

  // useEffect(() => {
  //   if (zipcode && zipcode.toString().length === 5) {
  //     // setSearchBtnLabel("Searching");
  //     // setSearchBtnDisabled(true);
  //     refreshDistrict(zipcode);
  //     setSearchBtnDisabled(false);
  //     setSearchBtnLabel("Search");
  //   }
  // }, [zipcode]);

  const handleSearchClick = () => {
    setZipcode(zipcode);
    refreshDistrict(zipcode);
  };

  function refreshDistrict(zipcode: string) {
    setSearchBtnLabel("Searching");
    setSearchBtnDisabled(true);
    setApiError(false);
    axios
      .get(`${DISTRICT_URL}/rest/zipcode_to_district/${zipcode}`)
      .then(response1 => {
        setSearchBtnLabel("Search");
        if (!response1.data) {
          setApiErrorMessage("Error");
          setApiError(true);
          return;
        }

        const zipcodeDistrictData = response1.data;
        axios
          .get(`${DISTRICT_URL}/rest/district_details/${zipcodeDistrictData["district_nid"]}`)
          .then(response2 => {
            try {
              if (!response2.data) {
                setApiErrorMessage("Error");
                setApiError(true);
                return;
              }

              // We also have office locations that are virtual. Those have office type ID numbers of 148 and 270.
              const apiDistrict = response2.data[0];

              // district.district_nid
              let newDistrict: District = {
                zipcode                       : zipcodeDistrictData.zipcode,
                county_code                   : zipcodeDistrictData.county_code,
                district_nid                  : zipcodeDistrictData.district_nid,
                title                         : apiDistrict.title,
                website                       : apiDistrict.website,
                field_district_map_svg        : apiDistrict.field_district_map_svg,
                field_district_staff_directory: apiDistrict.field_district_staff_directory,
                field_district_business_link  : apiDistrict.field_district_business_link,
                social_media_x_url            : getSocialMediaXUrlFrom(apiDistrict.field_district_social_media),
                social_media_linkedin_url     : getSocialMediaLinkedinUrlFrom(apiDistrict.field_district_social_media),
                field_district_offices        : apiDistrict.field_district_offices?.map((office: any) => {
                  let newOffice: DistrictOffice = {
                    title            : office.title,
                    typeIcon         : getTypeIconFromMediaImage(office.office_type.office_type_icon?.media_image),
                    appointment_only : office.office_type.id === 149 || office.office_type.id === 147, // is_virtual_office: getIsVirtualFromMediaImage(office.office_type.office_type_icon?.media_image),
                    is_virtual_office: office.office_type.id === 148 || office.office_type.id === 270,
                    address_line1    : office.address?.address_line1,
                    address_line2    : office.address?.address_line2,
                    address_city     : office.address?.locality,
                    address_state    : office.address?.administrative_area.code,
                    address_zipcode  : office.address?.postal_code,
                    telephone        : office.telephone,
                    google_map_url   : getGoogleMapUrlFromAddress(office.address),
                  };
                  return newOffice;
                }) || [],
              };
              setDistrict(newDistrict);
              updateAndSaveUserPortalProfileWithNewDistrict(newDistrict);
            } catch (error) {
              setApiErrorMessage(t("Error fetching local resources for given zipcode" + "."));
              setApiError(true);
            }
          })
          .catch(error => {
            const translatedMessage = t(error.response.data.message, { "Zip Code": zipcode });
            setApiErrorMessage(translatedMessage);
            setApiError(true);
          });
      })
      .catch(() => {
        setSearchBtnLabel("Search");
        // An error occurred: Record with ZIP Code '90909' was not found
        // "Record with ZIP Code '{{Zip Code}}' was not found": "No se encontró el registro con el código postal {{'Zip Code'}}",
        const translatedMessage = t("Record with ZIP Code '{{Zip Code}}' was not found", { "Zip Code": zipcode });
        setApiErrorMessage(translatedMessage);
        setApiError(true);
      }).finally(() => {
      setSearchBtnLabel("Search");
      setSearchBtnDisabled(false);
    });
  }

  function getSocialMediaXUrlFrom(field_district_social_media: any[]) {
    const xSocialMedia = field_district_social_media?.find(socialMedia => {
      return socialMedia.social_media_service.name === "X";
    });
    return xSocialMedia ? `https://www.twitter.com/${xSocialMedia.social_media_account}` : null;
  }

  function getSocialMediaLinkedinUrlFrom(field_district_social_media: any[]) {
    const linkedInSocialMedia = field_district_social_media?.find(
      socialMedia => socialMedia.social_media_service.name === "LinkedIn"
    );
    return linkedInSocialMedia ? `https://www.linkedin.com/showcase/${linkedInSocialMedia.social_media_account}` : null;
  }

  function getTypeIconFromMediaImage(mediaImage: string) {
    if (mediaImage.includes("branch-office-icon")) {
      return iconOfficeSm;
    }

    if (mediaImage.includes("headset_icon.png")) {
      return iconOfficeVirtual;
    }

    return iconOfficeLg;
  }

  function getGoogleMapUrlFromAddress(address: any) {
    if (!address || !address.address_line1) {
      return "";
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.address_line1 + ", " + address.locality + ", " + address.administrative_area.code + " " + address.postal_code)}`;
  }

  function updateAndSaveUserPortalProfileWithNewDistrict(newDistrict: District) {
    const newPortalProfile = { ...user.profile?.portal, district: newDistrict };
    const url = `${PORTAL_API_URL}/portal/user/` + user.profile?.crm?.email?.toLowerCase();
    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      console.log("No accessToken");
      return;
    }
    axios
      .post(url, newPortalProfile, { headers: { Authorization: "Bearer " + accessToken } })
      .then(() => {
        dispatch(setUser({ ...user, profile: { ...user.profile, portal: newPortalProfile } }));
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  }

  return (
    <div className={`${styles.localResourcesContainer}`}>
      {/* Title Row */}
      <div className={`${styles.titleRow}`}>
        <div className={`${styles.title}`}>{t("Local Resources")}</div>
        <div className={` ${styles.titleZipContainer}`}>
          <div className={`${apiError ? "usa-form-group--error" : ""}`}>
            <label htmlFor="zipCode" className={`usa-label ${styles.titleZipLabel}`}>
              {t("Zip Code")}
            </label>
            {apiError ? (
              <span className="usa-error-message text-no-wrap" id="input-error-message" role="alert">
                {apiErrorMessage}
              </span>
            ) : null}

            <section aria-label="Search component">
              <form className="usa-search usa-search--small" role="search">
                <label className="usa-sr-only" htmlFor="search-field">
                  Search
                </label>
                <input
                  className={`usa-input ${apiError ? "usa-input--error" : ""} ${styles.titleZipInput}`}
                  type="search"
                  id={"zipCode"}
                  name={"zipCode"}
                  value={zipcode}
                  placeholder={t("Enter Zip Code")}
                  maxLength={5}
                  onChange={event => {
                    const enteredZipcode = event.target.value;
                    if (/^\d{0,5}$/.test(enteredZipcode)) {
                      setZipcode(enteredZipcode);
                    }
                  }}
                />
                <button
                  className={`usa-button`}
                  style={{ width: "97px"}}
                  type="submit"
                  onClick={handleSearchClick}
                  disabled={searchBtnDisabled}
                >
                  {searchBtnLabel}
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>

      {district !== null && (
        <div className={`${styles.localResourcesContentContainer}`}>
          <div className={`${styles.bodyDistrictCard}`}>
            <div className={`${styles.bodyDistrictCardImgContainer}`}>
              <img className={`${styles.bodyDistrictCardImg}`} src={district.field_district_map_svg} alt="district" />
            </div>
            <div className={`${styles.bodyDistrictCardDetailsContainer}`}>
              <div className={`${styles.bodyDistrictCardDetailsTitle}`}>
                <a href={district.website} target="_blank" rel="noopener noreferrer">
                  {district.title}
                </a>
              </div>
              <div className={`${styles.bodyDistrictCardDetailsLinksContainer}`}>
                <div className={`${styles.bodyDistrictCardDetailsLinksGroup}`}>
                  <svg className={`usa-icon ${styles.districtCardDetailsLinkIcon}`} focusable="false">
                    <title>{t("Open in a new window")}</title>
                    <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                  </svg>
                  <a href={district.website} target="_blank">
                    {t("Website")}
                  </a>
                </div>
                <div className={`${styles.bodyDistrictCardDetailsLinksGroup}`}>
                  {district.field_district_staff_directory && (
                    <>
                      <svg className={`usa-icon ${styles.districtCardDetailsLinkIcon}`} focusable="false">
                        <title>{t("Open in email")}</title>
                        <use xlinkHref="/assets/img/sprite.svg#mail_outline"></use>
                      </svg>
                      <a href={district.field_district_staff_directory} target="_blank">
                        {t("Office Directory")}
                      </a>
                    </>
                  )}
                </div>
                {district.social_media_x_url && (
                  <div className={` ${styles.bodyDistrictCardDetailsLinksGroup}`}>
                    <svg
                      className={`usa-icon ${styles.districtCardDetailsLinkIcon}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M11.9047 8.46958L19.3513 0H17.5873L11.1187 7.35251L5.956 0H0L7.80867 11.1194L0 19.9999H1.764L8.59067 12.2338L14.044 19.9999H20M2.40067 1.30158H5.11067L17.586 18.7623H14.8753"
                        fill="black"
                      />
                      <defs>
                        <clipPath id="clip0_16703_109144">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <a href={district.social_media_x_url} target="_blank">
                      {t("Follow us on") + " X"}
                    </a>
                  </div>
                )}
                {district.social_media_linkedin_url && (
                  <div className={` ${styles.bodyDistrictCardDetailsLinksGroup}`}>
                    <img src={logoLinkedIn} alt="linkedIn logo" className={styles.linkedInLogo} />
                    <a href={district.social_media_linkedin_url} target="_blank">
                      {t("Follow us on") + " LinkedIn"}
                    </a>
                  </div>
                )}
              </div>
              <button
                type="button"
                className={`usa-button`}
                onClick={event => {
                  event.preventDefault();
                  window.open(
                    `https://www.sba.gov/contact/contact_your_district_office?district=${district.district_nid}`,
                    "_blank"
                  );
                }}
              >
                {t("Make an Appointment")}
                <svg className={`usa-icon ${styles.launchIcon}`} focusable="false">
                  <title>{t("Open in a new window")}</title>
                  <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                </svg>
              </button>
            </div>
          </div>
          <div className={`${styles.officeCardsContainer}`}>
            {district.field_district_offices.map(office => (
              <div key={office.title} className={`${styles.officeCard}`}>
                <img className={`${styles.officeCardsImg}`} src={office.typeIcon} alt="office" />
                <div className={`${styles.officeCardDetailsContainer}`}>
                  <div className={`${styles.officeCardDetailsTitle}`}>{office.title}</div>
                  {office.appointment_only && (
                    <div className={`usa-tag ${styles.officeCardDetailsAptOnly}`}>{t("Appointment Only")}</div>
                  )}
                  <div className={`${styles.officeCardDetailsPhone}`}>
                    <svg className={`usa-icon ${styles.launchIcon}`} focusable="false">
                      <title>{t("Open in email")}</title>
                      <use xlinkHref="/assets/img/sprite.svg#phone"></use>
                    </svg>
                    <a href={`tel:${office.telephone}`}>{office.telephone}</a>
                  </div>
                  {!office.is_virtual_office && (
                    <div className={`${styles.officeCardDetailsAddress}`}>
                      <svg className={`usa-icon ${styles.launchIcon}`} focusable="false">
                        <title>{t("Open")}</title>
                        <use xlinkHref="/assets/img/sprite.svg#map"></use>
                      </svg>
                      <a href={office.google_map_url} target="_blank" rel="noopener noreferrer">
                        {office.address_line1}
                        <br />
                        {office.address_line2 !== "" && (
                          <>
                            {office.address_line2}
                            <br />
                          </>
                        )}
                        {office.address_city}, {office.address_state} {office.address_zipcode} <br />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={`${styles.guideContainer}`}>
            <div className={`${styles.guideTitle}`}>{t("Explore your local business guide")}</div>
            <div>
              <button
                type="button"
                className={`usa-button`}
                onClick={event => {
                  event.preventDefault();
                  window.open(district.field_district_business_link, "_blank");
                }}
              >
                {t("Local Business Guide")}
                <svg className={`usa-icon ${styles.launchIcon}`} focusable="false">
                  <title>{t("Open in a new window")}</title>
                  <use xlinkHref="/assets/img/sprite.svg#launch"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalResources;
