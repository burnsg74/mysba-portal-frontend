import React, { useEffect, useRef, useState } from 'react';
import { DISTRICT_URL, PORTAL_API_URL } from 'src/utils/constants';
import { getUser, setUser } from 'src/store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import iconOfficeLg from 'src/assets/icon-office-lg.svg';
import iconOfficeSm from 'src/assets/icon-office-sm.svg';
import iconOfficeVirtual from 'src/assets/icon-office-virtual.svg';
import styles from 'src/components/LocalResources/LocalResources.module.css';

const LocalResources = () => {
  const dispatch = useDispatch();
  const user: IUser = useSelector(getUser);
  const { authState } = useOktaAuth();
  const { t } = useTranslation();
  const [searchBtnLabel, setSearchBtnLabel] = useState('Search');
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState('');
  const [district, setDistrict] = useState<IDistrict | null>(user.profile?.portal?.district ?? null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (zipcode && zipcode.toString().length === 5) {
      refreshDistrict(zipcode).then(newDistrict => {
        if (newDistrict) {
          setDistrict(newDistrict);
          updateAndSaveUserPortalProfileWithNewDistrict(newDistrict);
        } else {
          setDistrict(null);
        }
      });
    }
    hasMountedRef.current = true;
  }, []);

  useEffect(() => {
    setSearchBtnLabel('Search');
    setSearchBtnDisabled(false);
  }, [district]);

  const handleSearchClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    refreshDistrict(zipcode).then(newDistrict => {
      if (newDistrict) {
        setDistrict(newDistrict);
        updateAndSaveUserPortalProfileWithNewDistrict(newDistrict);
      } else {
        setDistrict(null);
      }
    });
  };

  const formatZipcode = (value: string | undefined): string | undefined => {
    if (value) {
      const formattedZipcode = value.replace(/\D/g, '').slice(0, 5);
      if (formattedZipcode.length === 5) {
        return formattedZipcode;
      }
    }
    return undefined;
  };
  const [zipcode, setZipcode] = useState(formatZipcode(user.profile?.portal?.district?.zipcode) ?? '10001');

  const refreshDistrict = async (zipcode: string) => {
    setSearchBtnLabel('Searching');
    setSearchBtnDisabled(true);
    setApiError(false);

    try {
      const districtData = await fetchDistrictData(zipcode);
      if (!districtData) {
        throw new Error('Error');
      }
      const detailedDistrictData = await fetchDistrictDetails(districtData.district_nid);
      if (!detailedDistrictData) {
        throw new Error('Error');
      }
      return mapDistrictData(districtData, detailedDistrictData, zipcode);
    } catch (error: any) {
      handleError(error, zipcode);
    }
  };

  const fetchDistrictData = async (zipcode: string) => {
    const response = await axios.get(`${DISTRICT_URL}/rest/zipcode_to_district/${zipcode}`);
    return response.data;
  };

  const fetchDistrictDetails = async (districtNid: string) => {
    const response = await axios.get(`${DISTRICT_URL}/rest/district_details/${districtNid}`);
    return response.data[0];
  };

  const mapDistrictData = (zipcodeDistrictData: any, apiDistrict: any, zipcode: string): IDistrict => {
    const offices = apiDistrict.field_district_offices?.map((office: any) => mapDistrictOfficeData(office)) || [];
    return {
      zipcode: zipcodeDistrictData.zipcode,
      county_code: zipcodeDistrictData.county_code,
      district_nid: zipcodeDistrictData.district_nid,
      title: apiDistrict.title,
      website: apiDistrict.website,
      field_district_map_svg: apiDistrict.field_district_map_svg,
      field_district_staff_directory: apiDistrict.field_district_staff_directory,
      field_district_business_link: apiDistrict.field_district_business_link,
      social_media_x_url: getSocialMediaXUrlFrom(apiDistrict.field_district_social_media),
      social_media_linkedin_url: getSocialMediaLinkedinUrlFrom(apiDistrict.field_district_social_media),
      field_district_offices: offices,
    };
  };

  const mapDistrictOfficeData = (office: any): IDistrictOffice => {
    return {
      title: office.title,
      typeIcon: getTypeIconFromMediaImage(office.office_type.office_type_icon?.media_image),
      appointment_only: office.office_type.id === 149 || office.office_type.id === 147,
      is_virtual_office: office.office_type.id === 148 || office.office_type.id === 270,
      address_line1: office.address?.address_line1,
      address_line2: office.address?.address_line2,
      address_city: office.address?.locality,
      address_state: office.address?.administrative_area.code,
      address_zipcode: office.address?.postal_code,
      telephone: office.telephone,
      google_map_url: getGoogleMapUrlFromAddress(office.address),
    };
  };

  const updateAndSaveUserPortalProfileWithNewDistrict = (newDistrict: IDistrict) => {
    const newPortalProfile = { ...user.profile?.portal, district: newDistrict };
    const url = `${PORTAL_API_URL}/portal/user/` + user.profile?.crm?.email?.toLowerCase();
    const accessToken = authState?.accessToken?.accessToken;

    if (!accessToken) {
      console.log('No accessToken');
      return;
    }

    axios
      .post(url, newPortalProfile, { headers: { Authorization: 'Bearer ' + accessToken } })
      .then(() => {
        dispatch(setUser({ ...user, profile: { ...user.profile, portal: newPortalProfile } }));
      })
      .catch(error => {
        console.log('ERROR', error);
      });
  };

  const handleError = (error: any, zipcode: string) => {
    const translatedMessage = error.response?.data?.message
      ? t(error.response.data.message, { 'Zip Code': zipcode })
      : t('Error fetching local resources for given zipcode.');

    setApiError(true);
    setApiErrorMessage(translatedMessage);
    setSearchBtnLabel('Search');
    setSearchBtnDisabled(false);
  };

  const getSocialMediaXUrlFrom = (field_district_social_media: any[]): string | null => {
    const xSocialMedia = field_district_social_media?.find(
      socialMedia => socialMedia.social_media_service.name === 'X'
    );
    return xSocialMedia ? `https://www.twitter.com/${xSocialMedia.social_media_account}` : null;
  };

  const getSocialMediaLinkedinUrlFrom = (field_district_social_media: any[]): string | null => {
    const linkedInSocialMedia = field_district_social_media?.find(
      socialMedia => socialMedia.social_media_service.name === 'LinkedIn'
    );
    return linkedInSocialMedia ? `https://www.linkedin.com/showcase/${linkedInSocialMedia.social_media_account}` : null;
  };

  const getTypeIconFromMediaImage = (mediaImage: string) => {
    if (mediaImage.includes('branch-office-icon')) {
      return iconOfficeSm;
    }
    if (mediaImage.includes('headset_icon.png')) {
      return iconOfficeVirtual;
    }
    return iconOfficeLg;
  };

  const getGoogleMapUrlFromAddress = (address: any): string => {
    if (!address?.address_line1) {
      return '';
    }

    const line1 = encodeURIComponent(address.address_line1);
    const locality = encodeURIComponent(address.locality);
    const administrativeArea = encodeURIComponent(address.administrative_area?.code ?? '');
    const postalCode = encodeURIComponent(address.postal_code);
    const query = `${line1}, ${locality}, ${administrativeArea} ${postalCode}`;

    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  return (
    <div className={`${styles.localResourcesContainer}`}>
      {/* Title Row */}
      <div className={`${styles.titleRow}`}>
        <div className={`${styles.title}`}>{t('Local Resources')}</div>
        <div className={` ${styles.titleZipContainer}`}>
          <div className={`${apiError ? 'usa-form-group--error' : ''}`}>
            <label htmlFor="zipCode" className={`usa-label ${styles.titleZipLabel}`}>
              {t('Zip Code')}
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
                  className={`usa-input ${apiError ? 'usa-input--error' : ''} ${styles.titleZipInput}`}
                  type="search"
                  id={'zipCode'}
                  name={'zipCode'}
                  value={zipcode}
                  placeholder={t('Enter Zip Code')}
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
                  style={{ width: '97px' }}
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
          {/* ... Remaining UI elements similar to your original code ... */}
        </div>
      )}
    </div>
  );
};
export default LocalResources;
