import React, { ChangeEvent, useState } from "react";
import styles from "src/pages/AccountSetup2/AccountSetup2.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CheckListImage from "src/assets/check-list.png";
import { setNav } from "src/store/showNav/showNavSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUser, setUser } from "src/store/user/userSlice";

interface IUser {
  profile?: object;
}

interface IState {
  planningNewBusiness: boolean;
  launchingNewBusiness: boolean;
  managingExistingBusiness: boolean;
  marketingExistingBusiness: boolean;
  growingExistingBusiness: boolean;
  govContracting: boolean;
  businessMentorship: boolean;
  womenOwnedBusinessContent: boolean;
  veteranOwnedBusinessContent: boolean;
}

const AccountSetup1 = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user: IUser = useSelector(getUser);

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
    dispatch(setNav(true));

    interface UserProfile {
      portal: object; // Replace object with your actual type for portal
    }

    console.log('user', user);
    let portalProfile = {};
    if (!user.profile) {
      console.error('user profile is missing');
    } else {
      // @ts-ignore
      portalProfile = {
        ...(user.profile as UserProfile).portal,
        ...state
      };
    }
    console.log('portalProfile', portalProfile);

    axios.post('https://gsyoehtdjf.execute-api.us-east-1.amazonaws.com/dev/portal/user', portalProfile)
      .then((response) => {
        let newUser = {
          ...user,
          profile: {
            ...user.profile,
            portal: portalProfile
          }
        };
        dispatch(setUser(newUser));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/dashboard/new");
  };
  const handleBackBtnClick = () => {
    navigate("/account-setup/1");
  };
  const handleSkipBtnClick = () => {
    dispatch(setNav(true));
    navigate("/dashboard");
  };


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <div className={`grid-row ${styles["container-row"]}`}>
        <div className={`grid-col ${styles["container"]}`}>
          <div className={`${styles["header"]}`}>
            <img src={CheckListImage} alt="Check List Icon" />
            <div className={`${styles["title"]}`}>
              {t("Tell us a little about your business.")}
            </div>
            <div className={`${styles["subtitle"]}`}>
              {t(
                "The SBA is here to help at any stage of your business. Answering these questions helps us serve you content more relevant to your needs."
              )}
            </div>
          </div>
          <div className={`${styles["section_label"]}`}>
            {t("In the current stage of my business I am")}...
          </div>
          <div className={`${styles["section_message"]}`}>
            {" "}
            {t("Select all that apply")}
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="planningNewBusiness"
                checked={state.planningNewBusiness}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Planning a new business.")}
              </span>
            </div>
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="launchingNewBusiness"
                checked={state.launchingNewBusiness}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Launching a new business.")}
              </span>
            </div>
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="managingExistingBusiness"
                checked={state.managingExistingBusiness}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Managing an existing business.")}
              </span>
            </div>
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="marketingExistingBusiness"
                checked={state.marketingExistingBusiness}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Marketing an existing business.")}
              </span>
            </div>
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="growingExistingBusiness"
                checked={state.growingExistingBusiness}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Growing a established business.")}
              </span>
            </div>
          </div>
          <div className={`${styles["section_label"]}`}>
            {t("I am interested in")}...
          </div>
          <div className={`${styles["section_message"]}`}>
            {" "}
            {t("Select all that apply")}
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="govContracting"
                checked={state.govContracting}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Government contracting")}
              </span>
              <span className={`${styles["tooltip"]}`}>
                <svg
                  className="usa-icon"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  {" "}
                  <use xlinkHref="/assets/img/sprite.svg#info_outline"></use>{" "}
                </svg>
                <span className={`${styles["tooltiptext"]}`}>
                  {t(
                    "Government contracting is a term referring to how government purchases goods and services from public businesses."
                  )}{" "}
                </span>
              </span>
            </div>
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="businessMentorship"
                checked={state.businessMentorship}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Business mentorship")}
              </span>
            </div>
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="womenOwnedBusinessContent"
                checked={state.womenOwnedBusinessContent}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Women-owned business content")}
              </span>
            </div>
          </div>
          <div className={`usa-card__container ${styles["card__container"]}`}>
            <div className={`usa-card__body ${styles["checkbox__group"]}`}>
              <input
                type="checkbox"
                name="veteranOwnedBusinessContent"
                checked={state.veteranOwnedBusinessContent}
                onChange={handleChange}
              />
              <span className={`${styles["checkbox_label"]}`}>
                {t("Veteran-owned business content")}
              </span>
            </div>
          </div>
          <div
            className={`${styles["button-group"]}`}
            style={{ paddingTop: "75px" }}
          >
            <button
              type="button"
              onClick={handleBackBtnClick}
              className="usa-button usa-button--outline"
            >
              {t("Back")}
            </button>
            <button
              type="button"
              className="usa-button"
              onClick={handleContinueBtnClick}
            >
              {t("Continue")}
            </button>
          </div>
          <button
            type="button"
            onClick={handleSkipBtnClick}
            className={styles["skip-button"]}
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
    </>
  );
};

export default AccountSetup1;
