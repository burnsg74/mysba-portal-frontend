import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setNav, setShowProfile } from "src/store/showNav/showNavSlice";
import { useDispatch } from "react-redux";
import styles from "src/pages/Landing/LandingPage.module.css";
import CityScapeImage from "src/assets/cityscape.png";
import CloudImage from "src/assets/clouds.svg"
const LandingPage = () => {
    const { oktaAuth, authState } = useOktaAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const login = () => {
        oktaAuth.signInWithRedirect();
    };

    const signUp = () => {
        console.log("Sign Up Clicked!"); // Dummy function for logging purposes
    };

    useEffect(() => {
        if (authState?.isAuthenticated) {
            navigate("/dashboard");
        }
    }, [authState, navigate]);

    useEffect(() => {
        dispatch(setNav(false))
        dispatch(setShowProfile(false))
    }, []);

    return (
        <>
            <div className={`${styles.mainContainer}`}>
                <img className={`${styles.cloudImage}`} src={CloudImage} alt={t("Decorative Cloud")} />
                <div className={`banner ${styles.banner}`}>
                
                    <div className={`${styles.welcomeMessage}`}>
                        Welcome to <span className={`${styles.bold}`}>MySBA</span>
                    </div>
                    <div className={`${styles.mysbaMessage}`}>{t("Loans, certifications, and resources tailored to your business all in one place.")}</div>
                    <div className={`${styles.buttonGroup}`}>
                        <button
                            type="button"
                            className={`usa-button usa-button--outline  ${styles.signupBtn}`}
                            onClick={signUp}
                        >
                            {t("Sign Up")}
                        </button>
                        <button
                            type="button"
                            data-testid="modal1-next"
                            className={`usa-button ${styles.loginBtn}`}
                            onClick={login}
                        >
                            {t("Log In")}
                        </button>
                    </div>
                </div>
                <img className={`${styles.cityscape}`} src={CityScapeImage} alt={t("Decorative Cityscape")} /> 
            </div>
        </>
    );
};

export default LandingPage;
