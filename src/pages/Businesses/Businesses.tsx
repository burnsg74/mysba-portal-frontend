import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getUser } from "src/store/user/userSlice";
import { BusinessCard } from "src/components/BusinessCard/BusinessCard";
import styles from "src/pages/Businesses/Businesses.module.css";
import bagIcon from "src/assets/bag.svg";
import BusinessAdd from "src/components/BusinessAdd/BusinessAdd";

const Businesses = () => {
  const { t } = useTranslation();
  const user: IUser = useSelector(getUser);
  const [showBusinessAdd, setShowBusinessAdd] = useState(false);

  const handleAddBusinessBtnClick = () => {
    setShowBusinessAdd(true);
  };

  const handleCloseModal = () => {
    setShowBusinessAdd(false);
  };

  return (<>
    <div data-testid="page-businesses" className={`main-container ${styles.businessesContainer}`}>
      {/*/!* Title Row *!/*/}
      {/*<div className={`${styles.titleContainer}`}>*/}
      {/*  <h1 className={`${styles.title}`}> {t("Businesses")} </h1>*/}
      {/*  /!*<button type="button" onClick={handleAddBusinessBtnClick}*!/*/}
      {/*  /!*        className={`usa-button usa-button--outline ${styles.addBusinessBtn}`}*!/*/}
      {/*  /!*disabled={true}> {t("Add a Business")} </button>*!/*/}
      {/*</div>*/}

      {/* No Businesses Message */}
      {!user.businesses?.length && (
        <div className={`${styles.noBusinessesMessageContainer}`}>
          <img src={bagIcon} alt="No Businesses" />
          <div className={`${styles.noBusinessesText}`}>
            {t("Your business will appear when a certification or loan is linked")}.
          </div>
      </div>)}

      {user.businesses && user.businesses.length > 0 && (
        <div className="grid-row">
          <div className="grid-col">
            <h1 className={styles.businessesHeader}>
              Business Details
            </h1>
          </div>
        </div>
      )}

      <div className="Businesses-content">
        {user.businesses && [...user.businesses]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((business) => (<div key={business.id} className={`grid-row ${styles.businessRow}`}>
            <div className="grid-col">
              <BusinessCard key={business.id} business={business} />
            </div>
          </div>))}
      </div>
    </div>
    {showBusinessAdd && (<BusinessAdd handleCloseModal={handleCloseModal} />)}
  </>);
};

export default Businesses;
