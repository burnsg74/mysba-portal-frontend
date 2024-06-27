import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "src/store/user/userSlice";
import styles from "src/pages/BusinessDetail/BusinessDetail.module.css";
import Field from "src/components/Field/Field";
import { useTranslation } from "react-i18next";
import BusinessCardIcon from "src/assets/business-card-icon.svg";

const BusinessDetail = () => {
  const navigate = useNavigate();
  const user: IUser = useSelector(getUser);
  const { id } = useParams();
  const { t } = useTranslation();
  const index = calculateIndexFromId(id as string);

  function calculateIndexFromId(id: string): number | null {
    let index = Number(id);

    if (isNaN(index)) {
      return null;
    }

    return index - 1;
  }

  if (index === null) {
    navigate("/error");
    return null;
  }

  const business = user.businesses?.filter((business: IBusiness) => business.id === id)[0];
  if (!business) {
    navigate("/error");
    return null;
  }

  const mailing_address = (<>{business?.mailing_address_street}<br/>
    {business?.mailing_address_city}, {business?.mailing_address_state} {business?.mailing_address_zipcode}</>);

  const business_address = (<>{business?.business_address_street}<br/>
    {business?.business_address_city}, {business?.business_address_state} {business?.business_address_zipcode}</>);

  return (<div data-testid="page-business-details" className={`${styles.container}`}>
    <div className={"grid-row"}>
      <div className={"grid-col"}>
        <button
          type="button"
          className="usa-button usa-button--outline"
          onClick={() => {
            navigate(-1);
          }}
        >
          {t("Back")}
        </button>
      </div>
    </div>
    <div className={`grid-row ${styles.headerRow}`}>
      <div className={`grid-col-auto ${styles.headerIcon}`}>
        <img className={`${styles.headerIcon}`} src={BusinessCardIcon} alt={"Business Card Icon"} />
      </div>
      <div className={`grid-col`}>
        <h2 className={`${styles.headerName}`}>{business.name} </h2>
      </div>
    </div>
    <div className={`grid-row`}>
      <div className="grid-col">
        <h4 className={`${styles.subheader}`}>{t("Business Information")}</h4>
      </div>
    </div>
    {business.user_id && <Field label="User ID" value={business.user_id} />}

    <div className={`${styles.subheader}`}>{t("Contact Information")}</div>
    {business.mailing_address_street && <Field label="Mailing Address" value={mailing_address} />}
    {business.business_address_street && <Field label="Business Address" value={business_address} />}
    {business.business_phone_number && <Field label="Phone Number" value={business.business_phone_number} />}
    {business.fax && <Field label="Fax Number" value={business.fax} />}
    {business.email && <Field label="Email" value={business.email} />}
    {business.legal_entity && <>
      <div className={`${styles.subheader}`}>{t("Structure")}</div>
      <Field label="Type" value={business.legal_entity} />
    </>}
  </div>);
};

export default BusinessDetail;
