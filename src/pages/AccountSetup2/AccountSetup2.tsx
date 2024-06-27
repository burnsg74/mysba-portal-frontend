import React, { ChangeEvent, useState } from "react";
import styles from "src/pages/AccountSetup2/AccountSetup2.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CheckListImage from "src/assets/check-list.svg";
import { useDispatch, useSelector } from "react-redux";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import axios from "axios";
import { getUser, setUser } from "src/store/user/userSlice";
import { AccessToken } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import { PORTAL_API_URL } from "src/utils/constants";

const AccountSetup2 = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user: IUser = useSelector(getUser);
  const { authState } = useOktaAuth();

  const [state, setState] = useState({
    planningNewBusiness: false,
    launchingNewBusiness: false,
    managingExistingBusiness: false,
    marketingExistingBusiness: false,
    growingExistingBusiness: false,
    govContracting: false,
    businessMentorship: false,
    womenOwnedBusinessContent: false,
    veteranOwnedBusinessContent: false,
  });

  const handleContinueBtnClick = () => {
    let portalProfile = {};
    if (!user.profile) {
      console.error("user profile is missing");
    } else {
      portalProfile = { ...user.profile.portal, ...state };
    }

    const url = `${PORTAL_API_URL}/portal/user/` + user.profile?.crm?.email;
    let accessToken: string | AccessToken | null | undefined;
    if (authState && "accessToken" in authState) {
      accessToken = authState.accessToken?.accessToken;
    } else {
      accessToken = undefined;
    }
    axios.post(url, portalProfile, { headers: { Authorization: "Bearer " + accessToken } }).then(() => {
      let newUser = { ...user, profile: { ...user.profile, portal: portalProfile } };
      dispatch(setUser(newUser));
    }).catch(error => {
      console.log(error);
    });
    navigate("/dashboard/new");
  };
  const handleBackBtnClick = () => {
    navigate("/account-setup/1");
  };
  const handleSkipBtnClick = () => {
    dispatch(setNav(true));
    dispatch(setShowProfile(true));
    navigate("/dashboard");
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (<div data-testid="accountSetup2" className={`grid-row ${styles.containerRow}`}>
    <div className={`grid-col ${styles.container}`}>
      <div className={`${styles.header}`}>
        <img src={CheckListImage} alt="Check List Icon" />
        <div className={`${styles.title}`}>
          {t("Tell us a little about your business.")}
        </div>
      </div>
      <div className={`${styles.subtitle}`}>
        {t("The SBA is here to help at any stage of your business. Answering these questions helps us serve you content more relevant to your needs.")}
      </div>
      <div className={`${styles.content}`}>
        <div className={`${styles.sectionLabel}`}>
          {t("In the current stage of my business I am")}...
        </div>
        <div className={`${styles.sectionMessage}`}>
          {" "}
          {t("Select all that apply")}
        </div>
        <fieldset className="usa-fieldset">
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="plan-new-business"
              type="checkbox"
              name="planningNewBusiness"
              checked={state.planningNewBusiness}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="plan-new-business"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Planning a new business.")}
                  </span>
            </label>
          </div>
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="launch-new-business"
              type="checkbox"
              name="launchingNewBusiness"
              checked={state.launchingNewBusiness}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="launch-new-business"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Launching a new business.")}
                  </span>
            </label>
          </div>
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="manage-existing-business"
              type="checkbox"
              name="managingExistingBusiness"
              checked={state.managingExistingBusiness}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="manage-existing-business"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Managing an existing business.")}
                  </span>
            </label>
          </div>
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="market-existing-business"
              type="checkbox"
              name="marketingExistingBusiness"
              checked={state.marketingExistingBusiness}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="market-existing-business"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Marketing an existing business.")}
                  </span>
            </label>
          </div>
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="grow-existing-business"
              type="checkbox"
              name="growingExistingBusiness"
              checked={state.growingExistingBusiness}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="grow-existing-business"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Growing a established business.")}
                  </span>
            </label>
          </div>
        </fieldset>
        <div className={`${styles.sectionLabelLast}`}>
          {t("I am interested in")}...
        </div>
        <div className={`${styles.sectionMessage}`}>
          {" "}
          {t("Select all that apply")}
        </div>
        <fieldset className="usa-fieldset">
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="government-contracting"
              type="checkbox"
              name="govContracting"
              checked={state.govContracting}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="government-contracting"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Government contracting")}
                  </span>
              <span className={`${styles.toolTip}`}>
                    <svg
                      className={`usa-icon ${styles.infoIcon}`}
                      aria-hidden="true"
                      focusable="false"
                    >
                      {" "}
                      <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>
                      {" "}
                    </svg>
                    <span className={`${styles.toolTipText}`}>
                      {t("Government contracting is a term referring to how government purchases goods and services from public businesses.")}{" "}
                    </span>
                  </span>
            </label>
          </div>
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="business-mentorship"
              type="checkbox"
              name="businessMentorship"
              checked={state.businessMentorship}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="business-mentorship"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Business mentorship")}
                  </span>
            </label>
          </div>
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="women-owned-business"
              type="checkbox"
              name="womenOwnedBusinessContent"
              checked={state.womenOwnedBusinessContent}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="women-owned-business"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Women-owned business content")}
                  </span>
            </label>
          </div>
          <div
            className={`grid-row usa-checkbox ${styles.checkboxRow}`}
          >
            <input
              className="usa-checkbox__input usa-checkbox__input--tile"
              id="veteran-owned-business"
              type="checkbox"
              name="veteranOwnedBusinessContent"
              checked={state.veteranOwnedBusinessContent}
              onChange={handleChange}
            />
            <label
              className={`usa-checkbox__label ${styles.usaCheckboxLabel}`}
              htmlFor="veteran-owned-business"
            >
                  <span className={`${styles.labelText}`}>
                    {t("Veteran-owned business content")}
                  </span>
            </label>
          </div>
        </fieldset>
      </div>
      <div className={`${styles.buttonGroup}`}>
        <div className={`${styles.buttonRow}`}>

          {
            user.businesses && user.businesses.length > 0 ? (
              <button
                type="button"
                onClick={handleBackBtnClick}
                className={`usa-button usa-button--outline ${styles.usaButton}`}
              >
                {t("Back")}
              </button>
            ) : null
          }
          <button
            type="button"
            className={`usa-button ${styles.usaButton}`}
            onClick={handleContinueBtnClick}
          >
            {t("Continue")}
          </button>
        </div>
        <div className={`grid-row ${styles.skipButtonRow}`}>
          <button
            type="button"
            onClick={handleSkipBtnClick}
            className={styles.skipButton}
            onKeyDown={event => {
              if (event.key === "Enter" || event.key === " ") {
                handleSkipBtnClick();
              }
            }}
          >
            {t("Skip")}
          </button>
        </div>
      </div>
    </div>
  </div>);
};

export default AccountSetup2;
